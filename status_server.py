"""
status_server.py
- Local: python status_server.py
- Railway: define env vars SSH_PRIVATE_KEY, SSH_HOST (opt), SSH_USER (opt)
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import os, json, time, subprocess, tempfile
from pathlib import Path
from datetime import datetime, timezone, timedelta

PORT        = int(os.environ.get('PORT', 8080))
LOCAL_MODE  = os.environ.get('LOCAL_MODE', '0') == '1'   # 1 = rodando no próprio servidor
SSH_HOST    = os.environ.get('SSH_HOST',  '20.94.160.24')
SSH_USER    = os.environ.get('SSH_USER',  'vinicius-argo')
SCRIPT      = '/home/vinicius-argo/generate_map_status.py'
CACHE_FILE  = '/home/vinicius-argo/mapserver/status_cache.json'
CACHE_MAX_AGE = 360   # segundos
BASE_DIR    = Path(__file__).parent

# ── Chave SSH: env var (Railway) ou arquivo local
_SSH_KEY_ENV  = os.environ.get('SSH_PRIVATE_KEY', '')
_SSH_KEY_FILE = os.environ.get('SSH_KEY_FILE',
                os.path.expanduser(r'~\Downloads\vini.pem'))
_key_tmp = None
if _SSH_KEY_ENV:
    _key_tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.pem', delete=False)
    key_content = _SSH_KEY_ENV.replace('\\n', '\n')
    _key_tmp.write(key_content)
    _key_tmp.flush()
    try: os.chmod(_key_tmp.name, 0o600)
    except: pass
    _SSH_KEY_FILE = _key_tmp.name

MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css',
    '.json': 'application/json',
    '.ico':  'image/x-icon',
}

# ── SSH helpers ──────────────────────────────────────────────────────────────

def ssh(cmd, timeout=45):
    r = subprocess.run(
        ['ssh', '-i', _SSH_KEY_FILE,
         '-o', 'StrictHostKeyChecking=no',
         '-o', 'ConnectTimeout=12',
         '-o', 'ServerAliveInterval=10',
         f'{SSH_USER}@{SSH_HOST}', cmd],
        capture_output=True, text=True, timeout=timeout
    )
    if r.returncode != 0:
        raise Exception(r.stderr.strip() or f'SSH falhou (exit {r.returncode})')
    return r.stdout.strip()

def fetch_status():
    if LOCAL_MODE:
        return fetch_status_local()
    return fetch_status_ssh()

def fetch_status_local():
    # Rodando no próprio servidor — chama o script diretamente
    cache = Path(CACHE_FILE)
    if cache.exists() and (time.time() - cache.stat().st_mtime) < CACHE_MAX_AGE:
        raw    = cache.read_text(encoding='utf-8')
        source = f'cache local ({int(time.time()-cache.stat().st_mtime)}s atrás)'
    else:
        r = subprocess.run(['python3', SCRIPT], capture_output=True, text=True, timeout=50)
        if r.returncode != 0:
            raise Exception(r.stderr.strip() or 'Script falhou')
        raw    = r.stdout.strip()
        source = 'script ao vivo'
    data = json.loads(raw)
    data['_source'] = source
    return data

def fetch_status_ssh():
    # Rodando remotamente — conecta via SSH
    try:
        age_str = ssh(
            f'python3 -c "import os,time; f=\\"{CACHE_FILE}\\"; '
            f'print(int(time.time()-os.path.getmtime(f))) if os.path.exists(f) else print(9999)"',
            timeout=15
        )
        cache_age = int(age_str)
    except Exception:
        cache_age = 9999

    if cache_age < CACHE_MAX_AGE:
        raw    = ssh(f'cat {CACHE_FILE}', timeout=15)
        source = f'cache ({cache_age}s atrás)'
    else:
        raw    = ssh(f'python3 {SCRIPT}', timeout=50)
        source = 'script ao vivo'

    data = json.loads(raw)
    data['_source'] = source
    return data

def build_status_js(data):
    def q(v):
        if v is None: return 'null'
        return '"' + str(v).replace('\\', '\\\\').replace('"', '\\"') + '"'
    lines = ['// Auto-gerado', 'const PIPELINE_STATUS = {']
    for pid, p in data['pipelines'].items():
        history  = json.dumps(p.get('history',  []), ensure_ascii=False)
        last_log = json.dumps(p.get('last_log', []), ensure_ascii=False)
        lines.append(
            f'  "{pid}": {{ "status": {q(p.get("status"))}, "last_run": {q(p.get("last_run"))}, '
            f'"duration": {q(p.get("duration"))}, "inserts": {q(p.get("inserts"))}, '
            f'"error": {q(p.get("error"))}, "history": {history}, "last_log": {last_log} }},'
        )
    lines.append('};')
    lines.append('const DISK_STATUS = '   + json.dumps(data.get('disk',   []), ensure_ascii=False) + ';')
    lines.append('const SERVER_STATUS = ' + json.dumps(data.get('server', {}), ensure_ascii=False) + ';')
    brt = datetime.now(timezone(timedelta(hours=-3)))
    lines.append(f'const STATUS_UPDATED_AT = "{brt.strftime("%d/%m/%Y %H:%M")} BRT";')
    return '\n'.join(lines) + '\n'

# ── HTTP Handler ─────────────────────────────────────────────────────────────

class Handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/refresh':
            self._handle_refresh()
        else:
            self._serve_static()

    def _handle_refresh(self):
        t0 = time.time()
        try:
            data    = fetch_status()
            js      = build_status_js(data)
            status_path = BASE_DIR / 'status.js'
            status_path.write_text(js, encoding='utf-8')
            elapsed = round(time.time() - t0, 1)
            body = json.dumps({
                'ok': True,
                'pipelines': data['pipelines'],
                'disk':      data.get('disk',   []),
                'server':    data.get('server', {}),
                'timestamp': data.get('timestamp', ''),
                'source':    data.get('_source', ''),
                'elapsed':   elapsed,
            }, ensure_ascii=False).encode()
            self._respond(200, body, 'application/json; charset=utf-8')
            print(f'  OK {elapsed}s — {data.get("_source","")} ({len(data["pipelines"])} pipelines)')
        except Exception as e:
            body = json.dumps({'ok': False, 'error': str(e)}).encode()
            self._respond(500, body, 'application/json; charset=utf-8')
            print(f'  ERRO: {e}')

    def _serve_static(self):
        path = self.path.split('?')[0]
        if path == '/':
            path = '/index.html'
        filepath = BASE_DIR / path.lstrip('/')
        # Segurança: não sair do BASE_DIR
        try: filepath.resolve().relative_to(BASE_DIR.resolve())
        except ValueError:
            self.send_response(403); self.end_headers(); return
        if not filepath.exists() or not filepath.is_file():
            self.send_response(404); self.end_headers(); return
        data = filepath.read_bytes()
        ct   = MIME.get(filepath.suffix, 'application/octet-stream')
        self._respond(200, data, ct)

    def _respond(self, code, body, content_type):
        self.send_response(code)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def log_message(self, fmt, *args):
        print(f'[{datetime.now().strftime("%H:%M:%S")}] {fmt % args}')

# ── Start ────────────────────────────────────────────────────────────────────

print('=' * 52)
print(f'  Mapa do Servidor  —  porta {PORT}')
if LOCAL_MODE:
    print(f'  Modo: LOCAL (servidor direto)')
else:
    print(f'  Modo: SSH → {SSH_USER}@{SSH_HOST}')
    print(f'  Chave: {"env var" if _SSH_KEY_ENV else _SSH_KEY_FILE}')
print('=' * 52)
HTTPServer(('0.0.0.0', PORT), Handler).serve_forever()

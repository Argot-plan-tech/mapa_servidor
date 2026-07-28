"""
status_server.py — Servidor local para o botão Atualizar do mapa
Execute via iniciar.bat (duplo clique) ou:
    python status_server.py
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import subprocess, json, os, time
from datetime import datetime, timezone, timedelta

PORT        = 5678
KEY         = os.path.expanduser(r'~\Downloads\vini.pem')
REMOTE      = 'vinicius-argo@20.94.160.24'
SCRIPT      = '/home/vinicius-argo/generate_map_status.py'
CACHE_FILE  = '/home/vinicius-argo/mapserver/status_cache.json'
STATUS_JS   = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'status.js')
CACHE_MAX_AGE = 360  # segundos — usa cache se tiver menos de 6 min

def ssh(cmd, timeout=45):
    r = subprocess.run(
        ['ssh', '-i', KEY,
         '-o', 'StrictHostKeyChecking=no',
         '-o', 'ConnectTimeout=12',
         '-o', 'ServerAliveInterval=10',
         REMOTE, cmd],
        capture_output=True, text=True, timeout=timeout
    )
    if r.returncode != 0:
        raise Exception(r.stderr.strip() or f'SSH falhou (exit {r.returncode})')
    return r.stdout.strip()

def fetch_status():
    # Verifica se o cache no servidor está fresco
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
        # Cache fresco: só faz cat (muito rápido)
        raw = ssh(f'cat {CACHE_FILE}', timeout=15)
        source = f'cache ({cache_age}s atrás)'
    else:
        # Cache velho/ausente: roda o script completo
        raw = ssh(f'python3 {SCRIPT}', timeout=50)
        source = 'script ao vivo'

    data = json.loads(raw)
    data['_source'] = source
    return data

def build_status_js(data):
    def q(v):
        if v is None: return 'null'
        return '"' + str(v).replace('\\', '\\\\').replace('"', '\\"') + '"'
    lines = ['// Auto-gerado — nao editar manualmente', 'const PIPELINE_STATUS = {']
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

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        if self.path != '/refresh':
            self.send_response(404); self.end_headers(); return
        t0 = time.time()
        try:
            data = fetch_status()
            js   = build_status_js(data)
            with open(STATUS_JS, 'w', encoding='utf-8') as f:
                f.write(js)
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
            self._respond(200, body)
            src = data.get('_source', '')
            print(f'  OK em {elapsed}s via {src} ({len(data["pipelines"])} pipelines)')
        except Exception as e:
            body = json.dumps({'ok': False, 'error': str(e)}).encode()
            self._respond(500, body)
            print(f'  ERRO: {e}')

    def _respond(self, code, body):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        print(f'[{datetime.now().strftime("%H:%M:%S")}] {fmt % args}')

print('=' * 52)
print('  Mapa do Servidor — Status Server')
print(f'  Porta: http://localhost:{PORT}/refresh')
print('  Cache servidor: atualizado a cada 5 min (cron)')
print('  Deixe esta janela aberta.')
print('=' * 52)
HTTPServer(('localhost', PORT), Handler).serve_forever()

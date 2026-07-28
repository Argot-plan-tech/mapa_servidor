"""
status_server.py — Servidor local para o botão Atualizar do mapa
Execute uma vez (deixe rodando em segundo plano):
    python status_server.py
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import subprocess, json, os
from datetime import datetime, timezone, timedelta

PORT       = 5678
KEY        = os.path.expanduser(r'~\Downloads\vini.pem')
REMOTE     = 'vinicius-argo@20.94.160.24'
SCRIPT     = '/home/vinicius-argo/generate_map_status.py'
STATUS_JS  = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'status.js')

def fetch_status():
    r = subprocess.run(
        ['ssh', '-i', KEY, '-o', 'StrictHostKeyChecking=no',
         '-o', 'ConnectTimeout=15', REMOTE, f'python3 {SCRIPT}'],
        capture_output=True, text=True, timeout=40
    )
    if r.returncode != 0:
        raise Exception(r.stderr.strip() or 'SSH falhou')
    return json.loads(r.stdout)

def build_status_js(data):
    def q(v):
        if v is None: return 'null'
        return '"' + str(v).replace('"', "'") + '"'
    lines = ['// Auto-gerado — nao editar manualmente', 'const PIPELINE_STATUS = {']
    for pid, p in data['pipelines'].items():
        history  = json.dumps(p.get('history',  []), ensure_ascii=False)
        last_log = json.dumps(p.get('last_log', []), ensure_ascii=False)
        lines.append(
            f'  "{pid}": {{ "status": {q(p.get("status"))}, "last_run": {q(p.get("last_run"))}, '
            f'"duration": {q(p.get("duration"))}, "inserts": {q(p.get("inserts"))}, "error": {q(p.get("error"))}, '
            f'"history": {history}, "last_log": {last_log} }},'
        )
    lines.append('};')
    disk = data.get('disk', [])
    lines.append('const DISK_STATUS = ' + json.dumps(disk, ensure_ascii=False) + ';')
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
        try:
            data   = fetch_status()
            js     = build_status_js(data)
            with open(STATUS_JS, 'w', encoding='utf-8') as f:
                f.write(js)
            body = json.dumps({'ok': True, 'pipelines': data['pipelines'],
                               'updated_at': json.loads(js.split('"')[-2] if 'STATUS_UPDATED_AT' in js else '""')},
                              ensure_ascii=False).encode()
            # simpler: just return data directly
            body = json.dumps({'ok': True, 'pipelines': data['pipelines'],
                               'disk': data.get('disk', []),
                               'server': data.get('server', {}),
                               'timestamp': data['timestamp']}, ensure_ascii=False).encode()
            self._respond(200, body)
            print(f'  Status atualizado OK ({len(data["pipelines"])} pipelines)')
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

print('=' * 50)
print(f'  Mapa do Servidor — Status Server')
print(f'  http://localhost:{PORT}/refresh')
print('  Deixe esta janela aberta.')
print('=' * 50)
HTTPServer(('localhost', PORT), Handler).serve_forever()

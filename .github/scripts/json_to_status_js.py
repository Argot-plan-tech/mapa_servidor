"""
Converte o JSON de generate_map_status.py para status.js
Uso: python json_to_status_js.py <arquivo.json>
     cat output.json | python json_to_status_js.py -
"""
import json, sys
from datetime import datetime, timezone, timedelta

def jstr(v):
    if v is None: return "null"
    return json.dumps(v, ensure_ascii=False)

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else "-"
    raw = open(src).read() if src != "-" else sys.stdin.read()
    data = json.loads(raw)

    pipelines = data.get("pipelines", {})
    server    = data.get("server", {})
    disk      = data.get("disk", [])

    brt = datetime.now(timezone(timedelta(hours=-3)))
    updated = brt.strftime("%d/%m/%Y %H:%M") + " BRT"

    lines = ["// Auto-gerado pelo GitHub Actions — nao editar manualmente"]
    lines.append("const PIPELINE_STATUS = {")
    for pid, p in pipelines.items():
        if pid.startswith("_"): continue
        history  = json.dumps(p.get("history",  []), ensure_ascii=False)
        last_log = json.dumps(p.get("last_log", []), ensure_ascii=False)
        err = p.get("error")
        err_js = json.dumps(err.replace('"', "'"), ensure_ascii=False) if err else "null"
        lines.append(
            f'  {jstr(pid)}: {{ "status": {jstr(p.get("status","neutral"))}, '
            f'"last_run": {jstr(p.get("last_run"))}, '
            f'"duration": {jstr(p.get("duration"))}, '
            f'"inserts": {jstr(p.get("inserts"))}, '
            f'"error": {err_js}, '
            f'"history": {history}, '
            f'"last_log": {last_log} }},'
        )
    lines.append("};")
    lines.append("")

    services_js = json.dumps(server.get("services", []), ensure_ascii=False)
    top_mem_js  = json.dumps(server.get("top_mem",  []), ensure_ascii=False)
    disk_js     = json.dumps(disk, ensure_ascii=False)

    lines.append("const SERVER_STATUS = {")
    lines.append(f'  "hostname": {jstr(server.get("hostname",""))},')
    lines.append(f'  "os": {jstr(server.get("os",""))},')
    lines.append(f'  "kernel": {jstr(server.get("kernel",""))},')
    lines.append(f'  "cpu_pct": {server.get("cpu_pct", 0)},')
    lines.append(f'  "ram_used_gb": {server.get("ram_used_gb", 0)},')
    lines.append(f'  "ram_total_gb": {server.get("ram_total_gb", 0)},')
    lines.append(f'  "ram_pct": {server.get("ram_pct", 0)},')
    lines.append(f'  "load1": {jstr(server.get("load1","0"))},')
    lines.append(f'  "load5": {jstr(server.get("load5","0"))},')
    lines.append(f'  "load15": {jstr(server.get("load15","0"))},')
    lines.append(f'  "uptime": {jstr(server.get("uptime",""))},')
    lines.append(f'  "proc_count": {server.get("proc_count", 0)},')
    lines.append(f'  "services": {services_js},')
    lines.append(f'  "top_mem": {top_mem_js},')
    lines.append(f'  "disk": {disk_js}')
    lines.append("};")
    lines.append("")
    lines.append(f'const STATUS_UPDATED_AT = "{updated}";')
    lines.append("")

    print("\n".join(lines))

if __name__ == "__main__":
    main()

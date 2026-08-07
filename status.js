// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": null, "duration": "4m 56s", "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "dl": { "status": "ok", "last_run": null, "duration": "25m 10s", "inserts": "25744", "error": null, "history": [{"date": "2026-08-06", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 35s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 21s", "inserts": "2139", "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "1m 53s", "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "energia": { "status": "ok", "last_run": "2026-08-07 06:00", "duration": null, "inserts": "1136", "error": null, "history": [{"date": "2026-08-06", "status": "neutral"}], "last_log": ["2026-08-07 06:00:02,103  INFO      Iniciando INCREMENTAL — 2026-08-04 -> 2026-08-06", "2026-08-07 06:00:02,557  INFO      Token obtido", "2026-08-07 06:00:06,831  INFO      1136 pontos recebidos — PONTA: 192 | FORA_PONTA: 944", "2026-08-07 06:00:07,167  INFO      Concluido — 1136 pontos | 1136 linhas afetadas"] },
  "svc_gaps": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "intel": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução manual", "history": [], "last_log": [] },
};

const SERVER_STATUS = {
  "hostname": "vm-database-01",
  "os": "Ubuntu 24.04.4 LTS",
  "kernel": "6.17.0-1008-azure",
  "cpu_pct": 27.9,
  "ram_used_gb": 14.1,
  "ram_total_gb": 15.6,
  "ram_pct": 90.5,
  "load1": "0.00",
  "load5": "0.02",
  "load15": "0.00",
  "uptime": "141d 6h 33m",
  "proc_count": 214,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "11.5", "mem": "20.7", "rss_mb": 3309.1, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "viniciu+", "pid": "3064817", "cpu": "0.1", "mem": "0.7", "rss_mb": 121.6, "cmd": "/home/DataLake_Group/.venv/bin/python /home/DataLake_Group/b"}, {"user": "viniciu+", "pid": "3064757", "cpu": "0.0", "mem": "0.7", "rss_mb": 113.6, "cmd": "/home/DataLake_Group/.venv/bin/python /home/DataLake_Group/b"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.5", "rss_mb": 90.0, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.5", "rss_mb": 80.2, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.5", "rss_mb": 80.2, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.4", "rss_mb": 67.9, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 50.3, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "prometh+", "pid": "739560", "cpu": "0.1", "mem": "0.2", "rss_mb": 45.8, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 35.3, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}],
  "disk": [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "07/08/2026 04:30 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


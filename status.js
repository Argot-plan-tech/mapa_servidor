// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": "2026-08-07 08:00", "duration": "4m 56s", "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": ["2026-08-07 08:00:01,504 - INFO - ", "2026-08-07 08:00:01,505 - INFO - ==========================================================================================", "2026-08-07 08:00:01,505 - INFO - INICIANDO PIPELINE COMPLETO WPS", "2026-08-07 08:00:01,505 - INFO - ==========================================================================================", "2026-08-07 08:00:01,505 - INFO - Execution ID : 20260807_080001", "2026-08-07 08:00:01,505 - INFO - Host         : vm-database-01", "2026-08-07 08:00:01,505 - INFO - Etapas       : 1-BRONZE | 2-SILVER | 3-GOLD", "2026-08-07 08:00:01,505 - INFO - ", "2026-08-07 08:00:01,505 - INFO - ******************************************************************************************", "2026-08-07 08:00:01,505 - INFO - *** ETAPA 1: BRONZE — Ingestão de dados D-1", "2026-08-07 08:00:01,505 - INFO - ******************************************************************************************", "2026-08-07 08:00:01,505 - INFO - ", "2026-08-07 08:00:01,505 - INFO - ==========================================================================================", "2026-08-07 08:00:01,505 - INFO - [PYTHON] BRONZE_CLIMA", "2026-08-07 08:00:01,505 - INFO - ==========================================================================================", "2026-08-07 08:00:01,505 - INFO - Script: /home/Parking_Flow/Estacionamento/Clima/bronze_clima_linux.py"] },
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
  "cpu_pct": 53.7,
  "ram_used_gb": 14.2,
  "ram_total_gb": 15.6,
  "ram_pct": 91.0,
  "load1": "0.02",
  "load5": "0.02",
  "load15": "0.00",
  "uptime": "141d 7h 3m",
  "proc_count": 219,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "11.5", "mem": "20.8", "rss_mb": 3329.8, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "viniciu+", "pid": "3064817", "cpu": "0.0", "mem": "0.7", "rss_mb": 121.5, "cmd": "/home/DataLake_Group/.venv/bin/python /home/DataLake_Group/b"}, {"user": "viniciu+", "pid": "3064757", "cpu": "0.0", "mem": "0.7", "rss_mb": 113.6, "cmd": "/home/DataLake_Group/.venv/bin/python /home/DataLake_Group/b"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.5", "rss_mb": 91.5, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "viniciu+", "pid": "3072171", "cpu": "122", "mem": "0.5", "rss_mb": 87.1, "cmd": "/home/Parking_Flow/.venv/bin/python /home/Parking_Flow/Estac"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.5", "rss_mb": 80.2, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.5", "rss_mb": 80.2, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.4", "rss_mb": 67.9, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 50.3, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "prometh+", "pid": "739560", "cpu": "0.1", "mem": "0.2", "rss_mb": 45.7, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}],
  "disk": [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "07/08/2026 05:00 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


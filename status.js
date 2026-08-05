// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": "2026-08-05 08:00", "duration": "4m 58s", "inserts": null, "error": null, "history": [{"date": "2026-08-04", "status": "ok"}], "last_log": ["2026-08-05 08:00:01,381 - INFO - ", "2026-08-05 08:00:01,382 - INFO - ==========================================================================================", "2026-08-05 08:00:01,382 - INFO - INICIANDO PIPELINE COMPLETO WPS", "2026-08-05 08:00:01,382 - INFO - ==========================================================================================", "2026-08-05 08:00:01,382 - INFO - Execution ID : 20260805_080001", "2026-08-05 08:00:01,382 - INFO - Host         : vm-database-01", "2026-08-05 08:00:01,382 - INFO - Etapas       : 1-BRONZE | 2-SILVER | 3-GOLD", "2026-08-05 08:00:01,382 - INFO - ", "2026-08-05 08:00:01,383 - INFO - ******************************************************************************************", "2026-08-05 08:00:01,383 - INFO - *** ETAPA 1: BRONZE — Ingestão de dados D-1", "2026-08-05 08:00:01,383 - INFO - ******************************************************************************************", "2026-08-05 08:00:01,383 - INFO - ", "2026-08-05 08:00:01,383 - INFO - ==========================================================================================", "2026-08-05 08:00:01,383 - INFO - [PYTHON] BRONZE_CLIMA", "2026-08-05 08:00:01,383 - INFO - ==========================================================================================", "2026-08-05 08:00:01,383 - INFO - Script: /home/Parking_Flow/Estacionamento/Clima/bronze_clima_linux.py"] },
  "dl": { "status": "ok", "last_run": null, "duration": "26m 20s", "inserts": "24714", "error": null, "history": [{"date": "2026-08-04", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 49s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-04", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 20s", "inserts": "137", "error": null, "history": [{"date": "2026-08-04", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "2m 5s", "inserts": null, "error": null, "history": [{"date": "2026-08-04", "status": "ok"}], "last_log": [] },
  "energia": { "status": "ok", "last_run": "2026-08-05 06:00", "duration": null, "inserts": "1135", "error": null, "history": [{"date": "2026-08-04", "status": "neutral"}], "last_log": ["2026-08-05 06:00:01,434  INFO      Iniciando INCREMENTAL — 2026-08-02 -> 2026-08-04", "2026-08-05 06:00:02,305  INFO      Token obtido", "2026-08-05 06:00:08,320  INFO      1135 pontos recebidos — PONTA: 192 | FORA_PONTA: 943", "2026-08-05 06:00:08,801  INFO      Concluido — 1135 pontos | 1135 linhas afetadas"] },
  "svc_gaps": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "intel": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução manual", "history": [], "last_log": [] },
};

const SERVER_STATUS = {
  "hostname": "vm-database-01",
  "os": "Ubuntu 24.04.4 LTS",
  "kernel": "6.17.0-1008-azure",
  "cpu_pct": 86.7,
  "ram_used_gb": 14.4,
  "ram_total_gb": 15.6,
  "ram_pct": 92.2,
  "load1": "0.05",
  "load5": "0.06",
  "load15": "0.24",
  "uptime": "139d 7h 3m",
  "proc_count": 214,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "13.3", "mem": "23.7", "rss_mb": 3789.6, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.5", "rss_mb": 87.3, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.4", "rss_mb": 67.7, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "viniciu+", "pid": "2707098", "cpu": "101", "mem": "0.4", "rss_mb": 65.3, "cmd": "/home/Parking_Flow/.venv/bin/python /home/Parking_Flow/Estac"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.3", "rss_mb": 61.1, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 58.4, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "prometh+", "pid": "739560", "cpu": "0.2", "mem": "0.2", "rss_mb": 46.8, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.2", "rss_mb": 40.6, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 35.0, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.1", "rss_mb": 26.6, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}],
  "disk": [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "05/08/2026 05:00 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


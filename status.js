// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": null, "duration": "4m 48s", "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "dl": { "status": "ok", "last_run": null, "duration": "25m 10s", "inserts": "21876", "error": null, "history": [{"date": "2026-08-03", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 38s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 20s", "inserts": "67", "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "2m 2s", "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "energia": { "status": "ok", "last_run": "2026-08-04 06:00", "duration": null, "inserts": "1136", "error": null, "history": [{"date": "2026-08-03", "status": "neutral"}], "last_log": ["2026-08-04 06:00:02,230  INFO      Iniciando INCREMENTAL — 2026-08-01 -> 2026-08-03", "2026-08-04 06:00:03,170  INFO      Token obtido", "2026-08-04 06:00:08,044  INFO      1136 pontos recebidos — PONTA: 192 | FORA_PONTA: 944", "2026-08-04 06:00:08,354  INFO      Concluido — 1136 pontos | 1136 linhas afetadas"] },
  "svc_gaps": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "intel": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução manual", "history": [], "last_log": [] },
};

const SERVER_STATUS = {
  "hostname": "vm-database-01",
  "os": "Ubuntu 24.04.4 LTS",
  "kernel": "6.17.0-1008-azure",
  "cpu_pct": 29.3,
  "ram_used_gb": 14.1,
  "ram_total_gb": 15.6,
  "ram_pct": 90.8,
  "load1": "0.01",
  "load5": "0.02",
  "load15": "0.00",
  "uptime": "138d 5h 48m",
  "proc_count": 210,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "13.8", "mem": "22.5", "rss_mb": 3597.5, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.5", "rss_mb": 88.9, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.4", "rss_mb": 66.8, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.3", "rss_mb": 63.2, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.3", "rss_mb": 51.9, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "prometh+", "pid": "739560", "cpu": "0.2", "mem": "0.3", "rss_mb": 50.3, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 34.8, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.1", "rss_mb": 27.6, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}, {"user": "root", "pid": "1232657", "cpu": "0.0", "mem": "0.1", "rss_mb": 25.8, "cmd": "/sbin/multipathd -d -s"}, {"user": "viniciu+", "pid": "1232869", "cpu": "0.0", "mem": "0.1", "rss_mb": 25.8, "cmd": "./externals/node20/bin/node ./bin/RunnerService.js"}],
  "disk": [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "04/08/2026 03:45 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


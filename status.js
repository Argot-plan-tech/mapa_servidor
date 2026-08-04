// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": null, "duration": "4m 48s", "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "dl": { "status": "ok", "last_run": null, "duration": "25m 10s", "inserts": "21876", "error": null, "history": [{"date": "2026-08-03", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 38s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 20s", "inserts": "67", "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "2m 2s", "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": [] },
  "energia": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "neutral"}], "last_log": [] },
  "svc_gaps": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "intel": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução manual", "history": [], "last_log": [] },
};

const SERVER_STATUS = {
  "hostname": "vm-database-01",
  "os": "Ubuntu 24.04.4 LTS",
  "kernel": "6.17.0-1008-azure",
  "cpu_pct": 28.6,
  "ram_used_gb": 14.1,
  "ram_total_gb": 15.6,
  "ram_pct": 90.6,
  "load1": "0.13",
  "load5": "0.05",
  "load15": "0.01",
  "uptime": "138d 0h 18m",
  "proc_count": 210,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "14.5", "mem": "22.5", "rss_mb": 3598.8, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.5", "rss_mb": 84.3, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.5", "rss_mb": 81.4, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.4", "rss_mb": 66.1, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.3", "rss_mb": 54.6, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "prometh+", "pid": "739560", "cpu": "0.2", "mem": "0.2", "rss_mb": 42.2, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 35.4, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.1", "rss_mb": 28.7, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}, {"user": "root", "pid": "1232657", "cpu": "0.0", "mem": "0.1", "rss_mb": 25.9, "cmd": "/sbin/multipathd -d -s"}, {"user": "viniciu+", "pid": "1232869", "cpu": "0.0", "mem": "0.1", "rss_mb": 24.9, "cmd": "./externals/node20/bin/node ./bin/RunnerService.js"}],
  "disk": [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "03/08/2026 22:15 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": "2026-08-04 08:05", "duration": "4m 48s", "inserts": null, "error": null, "history": [{"date": "2026-08-03", "status": "ok"}], "last_log": ["2026-08-04 08:02:23,559 - INFO - ==========================================================================================", "2026-08-04 08:02:23,559 - INFO - [SQL] GOLD_SAIDAS_SP3", "2026-08-04 08:02:23,559 - INFO - ==========================================================================================", "2026-08-04 08:02:23,559 - INFO - Procedure: gold.carga_saidas_diaria_wps", "2026-08-04 08:04:08,448 - INFO - [GOLD] GOLD_SAIDAS_SP3 | OK | 104.89s", "2026-08-04 08:04:08,448 - INFO - ", "2026-08-04 08:04:08,448 - INFO - ==========================================================================================", "2026-08-04 08:04:08,448 - INFO - [SQL] GOLD_PAGANTES_WPS", "2026-08-04 08:04:08,448 - INFO - ==========================================================================================", "2026-08-04 08:04:08,448 - INFO - Procedure: gold.sp_carga_fluxo_pagantes_wps", "2026-08-04 08:05:00,172 - INFO - [GOLD] GOLD_PAGANTES_WPS | OK | 51.72s", "2026-08-04 08:05:00,172 - INFO - ", "2026-08-04 08:05:00,172 - INFO - ==========================================================================================", "2026-08-04 08:05:00,172 - INFO - ETAPA 3 — GOLD CONCLUÍDA", "2026-08-04 08:05:00,172 - INFO - ==========================================================================================", "2026-08-04 08:05:00,172 - INFO - ", "2026-08-04 08:05:00,172 - INFO - ==========================================================================================", "2026-08-04 08:05:00,173 - INFO - ✅ PIPELINE FINALIZADO COM SUCESSO", "2026-08-04 08:05:00,173 - INFO - ==========================================================================================", "2026-08-04 08:05:00,188 - INFO - Execução registrada: /home/Parking_Flow/Estacionamento/Orquestrador/logs/pipeline_executions.json"] },
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
  "cpu_pct": 28.6,
  "ram_used_gb": 14.3,
  "ram_total_gb": 15.6,
  "ram_pct": 91.7,
  "load1": "0.03",
  "load5": "0.03",
  "load15": "0.07",
  "uptime": "138d 7h 33m",
  "proc_count": 215,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "14.4", "mem": "23.4", "rss_mb": 3733.8, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.5", "rss_mb": 89.6, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.3", "rss_mb": 61.5, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.3", "rss_mb": 60.7, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 57.9, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "prometh+", "pid": "739560", "cpu": "0.2", "mem": "0.3", "rss_mb": 49.1, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.3", "rss_mb": 48.7, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 34.8, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "viniciu+", "pid": "2532656", "cpu": "11.4", "mem": "0.1", "rss_mb": 28.9, "cmd": "/home/Parking_Flow/.venv/bin/python /home/Parking_Flow/monit"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.1", "rss_mb": 27.6, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}],
  "disk": [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "04/08/2026 05:30 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "51G", "avail": "11G", "pct": 83, "level": "warn"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];


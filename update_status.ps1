# update_status.ps1 — Atualiza status.js lendo os logs do servidor via SSH
# Execute: clique direito → "Executar com PowerShell"  ou  .\update_status.ps1 no terminal

$ErrorActionPreference = 'Stop'
$KEY     = "$env:USERPROFILE\Downloads\vini.pem"
$REMOTE  = "vinicius-argo@20.94.160.24"
$OUTFILE = "$PSScriptRoot\status.js"

Write-Host ""
Write-Host "Conectando ao servidor..." -ForegroundColor Cyan

$json = ssh -i "$KEY" -o StrictHostKeyChecking=no $REMOTE `
    "python3 /home/vinicius-argo/generate_map_status.py" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro SSH:" -ForegroundColor Red
    Write-Host $json
    Read-Host "Pressione Enter para fechar"
    exit 1
}

try {
    $data = $json | ConvertFrom-Json
} catch {
    Write-Host "Erro ao parsear JSON: $_" -ForegroundColor Red
    Write-Host $json
    Read-Host "Pressione Enter para fechar"
    exit 1
}

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine("// Auto-gerado por update_status.ps1 — nao editar manualmente")
[void]$sb.AppendLine("const PIPELINE_STATUS = {")

foreach ($id in $data.pipelines.PSObject.Properties.Name) {
    $p        = $data.pipelines.$id
    $status   = "`"$($p.status)`""
    $last_run = if ($p.last_run) { "`"$($p.last_run)`"" } else { "null" }
    $duration = if ($p.duration) { "`"$($p.duration)`"" } else { "null" }
    $inserts  = if ($p.inserts)  { "`"$($p.inserts)`""  } else { "null" }
    $errTxt   = if ($p.error)    { ($p.error -replace '"', "'") } else { $null }
    $error    = if ($errTxt)     { "`"$errTxt`"" } else { "null" }
    $history  = if ($p.history)  { $p.history  | ConvertTo-Json -Compress } else { "[]" }
    $last_log = if ($p.last_log) { $p.last_log | ConvertTo-Json -Compress } else { "[]" }
    [void]$sb.AppendLine("  `"$id`": { `"status`": $status, `"last_run`": $last_run, `"duration`": $duration, `"inserts`": $inserts, `"error`": $error, `"history`": $history, `"last_log`": $last_log },")
}

[void]$sb.AppendLine("};")

$brt     = ([System.DateTime]::UtcNow).AddHours(-3)
$updated = $brt.ToString('dd/MM/yyyy HH:mm') + ' BRT'
[void]$sb.AppendLine("const STATUS_UPDATED_AT = `"$updated`";")

$sb.ToString() | Out-File $OUTFILE -Encoding utf8 -NoNewline

Write-Host ""
Write-Host "status.js atualizado: $updated" -ForegroundColor Green

# Resumo dos pipelines
Write-Host ""
Write-Host "Status dos pipelines:" -ForegroundColor Yellow
foreach ($id in $data.pipelines.PSObject.Properties.Name) {
    $p = $data.pipelines.$id
    $icon = switch ($p.status) { "ok" {"OK "} "fail" {"ERRO"} "pending" {"AVISO"} default {"----"} }
    $color = switch ($p.status) { "ok" {"Green"} "fail" {"Red"} "pending" {"Yellow"} default {"Gray"} }
    $line = "  [$icon] $id"
    if ($p.last_run) { $line += " — $($p.last_run)" }
    if ($p.duration) { $line += " ($($p.duration))" }
    if ($p.error)    { $line += " — $($p.error)" }
    Write-Host $line -ForegroundColor $color
}

Write-Host ""
Write-Host "Recarregue o index.html no navegador para ver o status atualizado." -ForegroundColor Cyan
Write-Host ""

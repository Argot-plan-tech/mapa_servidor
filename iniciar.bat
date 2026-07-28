@echo off
title Mapa do Servidor — Status Server
cd /d "%~dp0"
echo.
echo  ============================================
echo   Mapa do Servidor - Status Server
echo   Deixe esta janela aberta enquanto usar.
echo   Para parar: feche esta janela
echo  ============================================
echo.

where python >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERRO] Python nao encontrado no PATH.
    echo  Instale Python 3 em python.org ou configure o PATH.
    echo.
    pause
    exit /b 1
)

python -c "import paramiko" >nul 2>&1
if %errorlevel% neq 0 (
    echo  Instalando dependencias...
    pip install paramiko --quiet
)

python status_server.py
pause

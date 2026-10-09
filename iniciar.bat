@echo off
title Iniciar Imobifolio
echo ===================================================
echo       INICIANDO AMBIENTE IMOBIFOLIO (SAAS)
echo ===================================================
echo.
echo [1/2] Iniciando Banco de Dados PostgreSQL...
start "PostgreSQL Imobifolio" cmd /c "node scripts/pg-server.mjs"

echo Aguardando banco de dados inicializar...
timeout /t 3 /nobreak >nul

echo.
echo [2/2] Iniciando Servidor Next.js (Porta 8181)...
start "Next.js Imobifolio" cmd /c "pnpm dev"

echo.
echo ===================================================
echo  Tudo pronto! Acesse no navegador:
echo  - Site: http://localhost:8181
echo  - Admin: http://localhost:8181/admin
echo  - Rede local (celular): http://192.168.100.80:8181
echo ===================================================
echo.
pause

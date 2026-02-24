@echo off
setlocal

echo [Nexus OS] Veritabani durumu kontrol ediliyor...

:: Check if postgres is already running
"C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" status -D "C:\postgres_data" >nul 2>&1

if %errorlevel% neq 0 (
    echo [Nexus OS] Veritabani kapali. Baslatiliyor...
    "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" start -D "C:\postgres_data" -l "C:\postgres_data\server.log"
) else (
    echo [Nexus OS] Veritabani zaten calisiyor.
)

echo.
echo [Nexus OS] ElectroNova Magazasi aciliyor...
npm run dev

endlocal

@echo off
setlocal
cd /d "%~dp0"
title Firebase Login - GiriEditsZone
cls
echo ============================================================
echo           FIREBASE LOGIN - GIRIEDITSZONE
echo ============================================================
echo.
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Google.FirebaseCLI_Microsoft.Winget.Source_8wekyb3d8bbwe;%PATH%"

echo This will open your web browser so you can log into Google.
echo Select your Google account and click "Allow".
echo.
pause
echo.
firebase login
echo.
echo ============================================================
echo If login succeeded, you are ready to deploy!
echo Next: Double-click deploy.bat to launch your website live.
echo ============================================================
echo.
pause

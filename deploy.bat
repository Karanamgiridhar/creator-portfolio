@echo off
setlocal
cd /d "%~dp0"
title Deploy GiriEditsZone
cls
echo ============================================================
echo           GIRIEDITSZONE - ONE-CLICK WEB DEPLOY
echo ============================================================
echo.
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Google.FirebaseCLI_Microsoft.Winget.Source_8wekyb3d8bbwe;%PATH%"

echo [1/2] Verifying Firebase project connection...
python sync_project.py
if %ERRORLEVEL% EQU 2 (
    echo.
    echo Please complete the quick project creation in your browser,
    echo then re-run deploy.bat!
    echo.
    pause
    exit /b 2
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Could not verify project. Please make sure you are logged in.
    echo Double-click login.bat to log in.
    echo.
    pause
    exit /b 1
)

echo.
echo [2/2] Deploying portfolio to Firebase Hosting...
echo.
firebase deploy --only hosting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo [SUCCESS] Your portfolio is updated and LIVE on the web!
    echo.
    echo Visit your website:
    echo   https://girieditszone.web.app
    echo ============================================================
) else (
    echo.
    echo [NOTE] If you encounter an error above, please review the message.
)

echo.
pause

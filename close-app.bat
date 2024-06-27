@echo off
echo Stopping backend and frontend...
start cmd /c docker-compose -f docker-compose.app.yml down

echo Stopping database...
start cmd /c docker-compose -f docker-compose.database.yml down

echo Application stopped successfully.
timeout /t 5 >nul
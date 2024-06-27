@echo off
echo Starting database...
start cmd /k docker-compose -f docker-compose.database.yml up -d database

echo Waiting for database to initialize (90 seconds)...
timeout /t 90 >nul

echo Starting backend and frontend...
start cmd /k docker-compose -f docker-compose.app.yml up -d backend

echo Application started successfully.


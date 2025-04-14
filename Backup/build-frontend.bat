@echo off
echo Building React frontend...
cd frontend
call npm run build
echo.
echo Copying build to backend static directory...
if exist "..\backend\src\main\resources\static" (
    rmdir /s /q "..\backend\src\main\resources\static"
)
mkdir "..\backend\src\main\resources\static"
xcopy /E /I /Y "build\*" "..\backend\src\main\resources\static"
echo.
echo Frontend build completed and copied to backend 
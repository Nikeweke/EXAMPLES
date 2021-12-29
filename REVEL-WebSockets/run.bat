@ECHO OFF
SETLOCAL
chcp 866>nul

rem Установка переменных среды для компиляции
SET GOROOT=C:\GO
SET GOPATH=%CD%
SET PATH=%GOPATH%\BIN;%PATH%;

REM SET GOOS=linux
REM SET GOARCH=amd64
REM SET CGO_ENABLED=0

REM -----> Packages
REM go get github.com/revel/revel
REM go get github.com/revel/cmd/revel

REM revel new /ws_app
revel run ws_app
REM revel build ws_app ./build

pause

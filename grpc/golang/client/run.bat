@ECHO OFF
SETLOCAL
chcp 866>nul
CLS

SET BUILD_PATH=.\bin\myapp

@REM SET GOPATH=%CD%
@REM SET PATH=%PATH%;%GOPATH%\BIN;
SET GO111MODULE=auto
SET GOMODCACHE=%CD%\packages

REM download all packages if project require
go mod tidy

ECHO Building service...

rem build with flags
go build -o %BUILD_PATH%.exe

rem start in dev mode (default)
%BUILD_PATH%.exe
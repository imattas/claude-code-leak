@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "EXITCODE=0"
set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

pushd "%ROOT%" >nul || (
  echo Failed to enter project directory: "%ROOT%"
  exit /b 1
)

if not defined APP_NAME (
  for %%I in ("%ROOT%") do set "APP_NAME=%%~nxI"
)
if not defined ARTIFACT_BASENAME set "ARTIFACT_BASENAME=claude"

if not defined ENTRYPOINT call :detect_entrypoint
if errorlevel 1 goto :end

where bun >nul 2>nul
if errorlevel 1 (
  echo Bun is required but was not found in PATH.
  echo Install Bun from https://bun.sh/ and run this script again.
  set "EXITCODE=1"
  goto :end
)

call :preflight
if errorlevel 1 (
  set "EXITCODE=1"
  goto :end
)

if not exist "dist" mkdir "dist"

set "FAILURES=0"

for %%T in (
  bun-windows-x64
  bun-windows-arm64
  bun-linux-x64
  bun-linux-x64-musl
  bun-linux-arm64
  bun-darwin-x64
  bun-darwin-arm64
) do (
  call :build_target "%%~T"
)

echo.
if !FAILURES! GTR 0 (
  echo Build finished with !FAILURES! failed target^(s^).
  set "EXITCODE=1"
  goto :end
)

echo Build finished successfully for all targets.
set "EXITCODE=0"
goto :end

:detect_entrypoint
for %%F in (
  src\entrypoints\cli.tsx
  src\entrypoints\cli.ts
  src\main.tsx
  src\main.ts
  src\index.tsx
  src\index.ts
  main.tsx
  main.ts
  index.tsx
  index.ts
) do (
  if exist "%%~F" (
    set "ENTRYPOINT=%%~F"
    goto :eof
  )
)

echo Could not find an entrypoint.
echo Set ENTRYPOINT to a file such as src\main.tsx and run the script again.
exit /b 1

:preflight
echo [CHECK] Verifying build prerequisites...

if not exist "package.json" (
  echo Missing required file: package.json
  echo This project cannot be built until its package manifest is restored.
  exit /b 1
)

if /I not "%SKIP_INSTALL%"=="1" (
  echo [CHECK] Installing dependencies with Bun...
  call bun install

  if errorlevel 1 (
    echo Dependency installation failed.
    exit /b 1
  )
)

echo [CHECK] Running a preflight bundle test...
call bun build --target=bun "%ENTRYPOINT%" --outfile "%TEMP%\%APP_NAME%-preflight.js"
if errorlevel 1 (
  echo Preflight build failed. Fix the errors above before cross-compiling.
  if exist "%TEMP%\%APP_NAME%-preflight.js" del /q "%TEMP%\%APP_NAME%-preflight.js" >nul 2>nul
  exit /b 1
)

if exist "%TEMP%\%APP_NAME%-preflight.js" del /q "%TEMP%\%APP_NAME%-preflight.js" >nul 2>nul
echo [CHECK] Build prerequisites look good.
exit /b 0

:build_target
set "TARGET=%~1"
set "TARGET=%TARGET:"=%"
call :target_dir_name
call :artifact_name
set "OUTDIR=dist\!TARGET_DIR!"
set "EXT="

echo !TARGET! | findstr /I /C:"windows" >nul && set "EXT=.exe"

if not exist "!OUTDIR!" mkdir "!OUTDIR!"
set "OUTFILE=!OUTDIR!\!ARTIFACT_NAME!!EXT!"

echo.
echo [BUILD] !TARGET!
echo         !OUTFILE!

call bun build --compile --target=!TARGET! "!ENTRYPOINT!" --outfile "!OUTFILE!"
if errorlevel 1 (
  echo [FAIL]  !TARGET!
  set /a FAILURES+=1
  goto :eof
)

echo [OK]    !TARGET!
goto :eof

:target_dir_name
set "TARGET_DIR=!TARGET!"
if /I "!TARGET_DIR:~0,4!"=="bun-" set "TARGET_DIR=!TARGET_DIR:~4!"
set "TARGET_DIR=!TARGET_DIR:darwin=mac!"
goto :eof

:artifact_name
set "ARTIFACT_NAME=!ARTIFACT_BASENAME!"
set "TARGET_LABEL=!TARGET_DIR!"
if /I "!TARGET_LABEL:~0,8!"=="windows-" set "TARGET_LABEL=win-!TARGET_LABEL:~8!"
set "ARTIFACT_NAME=!ARTIFACT_NAME!-!TARGET_LABEL!"
goto :eof

:end
popd >nul
exit /b %EXITCODE%

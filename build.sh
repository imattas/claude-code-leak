#!/usr/bin/env bash
set -u -o pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT" || exit 1

APP_NAME="${APP_NAME:-$(basename "$ROOT")}"
ARTIFACT_BASENAME="${ARTIFACT_BASENAME:-claude}"

detect_entrypoint() {
  local candidate
  for candidate in \
    "src/entrypoints/cli.tsx" \
    "src/entrypoints/cli.ts" \
    "src/main.tsx" \
    "src/main.ts" \
    "src/index.tsx" \
    "src/index.ts" \
    "main.tsx" \
    "main.ts" \
    "index.tsx" \
    "index.ts"
  do
    if [[ -f "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  echo "Could not find an entrypoint." >&2
  echo "Set ENTRYPOINT to a file such as src/main.tsx and run the script again." >&2
  return 1
}

ENTRYPOINT="${ENTRYPOINT:-$(detect_entrypoint)}" || exit 1

if ! command -v bun >/dev/null 2>&1; then
  echo "Bun is required but was not found in PATH." >&2
  echo "Install Bun from https://bun.sh/ and run this script again." >&2
  exit 1
fi

preflight() {
  echo "[CHECK] Verifying build prerequisites..."

  if [[ ! -f "package.json" ]]; then
    echo "Missing required file: package.json" >&2
    echo "This project cannot be built until its package manifest is restored." >&2
    return 1
  fi

  if [[ "${SKIP_INSTALL:-0}" != "1" ]]; then
    echo "[CHECK] Installing dependencies with Bun..."
    bun install || return 1
  fi

  echo "[CHECK] Running a preflight bundle test..."
  local preflight_out="${TMPDIR:-/tmp}/${APP_NAME}-preflight.js"

  if ! bun build --target=bun "$ENTRYPOINT" --outfile "$preflight_out"; then
    echo "Preflight build failed. Fix the errors above before cross-compiling." >&2
    rm -f "$preflight_out"
    return 1
  fi

  rm -f "$preflight_out"
  echo "[CHECK] Build prerequisites look good."
}

preflight || exit 1

mkdir -p dist

targets=(
  "bun-windows-x64"
  "bun-windows-arm64"
  "bun-linux-x64"
  "bun-linux-x64-musl"
  "bun-linux-arm64"
  "bun-darwin-x64"
  "bun-darwin-arm64"
)

failures=0

build_target() {
  local target="$1"
  local target_dir="${target#bun-}"
  target_dir="${target_dir/darwin/mac}"
  local outdir="dist/$target_dir"
  local target_label="$target_dir"
  target_label="${target_label/windows-/win-}"
  local artifact_name="${ARTIFACT_BASENAME}-${target_label}"
  local ext=""

  if [[ "$target" == *"windows"* ]]; then
    ext=".exe"
  fi

  mkdir -p "$outdir"

  local outfile="$outdir/$artifact_name$ext"

  echo
  echo "[BUILD] $target"
  echo "        $outfile"

  if ! bun build --compile --target="$target" "$ENTRYPOINT" --outfile "$outfile"; then
    echo "[FAIL]  $target"
    failures=$((failures + 1))
    return 0
  fi

  echo "[OK]    $target"
}

for target in "${targets[@]}"; do
  build_target "$target"
done

echo
if [[ "$failures" -gt 0 ]]; then
  echo "Build finished with $failures failed target(s)."
  exit 1
fi

echo "Build finished successfully for all targets."

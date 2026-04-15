# Claude Code Leak

This repository is a reconstructed, buildable snapshot of the widely circulated "Claude Code leak" source tree.

It exists as an archival and research-oriented copy of the leaked client code, with enough project metadata and build tooling restored to make the project compile again on modern systems.

## What This Repo Contains

- The leaked TypeScript/Bun source tree under `src/`
- Cross-platform build scripts for Windows and Unix-like systems
- A reconstructed `package.json`, lockfile, and TypeScript config
- Local stub packages for missing private/internal dependencies so the project can build

## What This Repo Does Not Contain

- Original private Anthropic internal packages
- Original generated files that were missing from the leaked snapshot
- A guarantee that every feature behaves exactly like the original internal build

Some features are backed by placeholder implementations because the public leak did not include all proprietary modules and generated assets.

## Building

### Requirements

- [Bun](https://bun.sh/)

### Windows

```powershell
.\build.bat
```

### macOS / Linux / WSL / Git Bash

```bash
bash ./build.sh
```

The scripts perform a dependency install, run a preflight bundle check, and then build standalone executables for:

- Windows `x64` and `arm64`
- Linux `x64`, `x64-musl`, and `arm64`
- macOS `x64` and `arm64`

## Output Layout

Compiled binaries are written to `dist/` using platform-specific names:

- `dist/windows-x64/claude-win-x64.exe`
- `dist/windows-arm64/claude-win-arm64.exe`
- `dist/linux-x64/claude-linux-x64`
- `dist/linux-x64-musl/claude-linux-x64-musl`
- `dist/linux-arm64/claude-linux-arm64`
- `dist/mac-x64/claude-mac-x64`
- `dist/mac-arm64/claude-mac-arm64`

## Important Notes

- This is not an official Anthropic repository.
- This repo includes compatibility stubs to replace missing internal packages so the codebase can compile.
- A successful build does not mean every internal or cloud-backed feature is functional.

## License / Ownership

All original rights remain with their respective owners.

This repository should be treated as an unofficial reconstruction of leaked material, intended for inspection, preservation, and build research.

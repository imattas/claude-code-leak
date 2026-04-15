# Claude Code Leak
The incident began at approximately 04:23 UTC on March 31, 2026, when Anthropic uploaded version 2.1.88 of the @anthropic-ai/claude-code npm package. Unlike previous releases, this version contained a critical packaging error: a 59.8 MB source map file named cli.js.map that linked to a publicly accessible Cloudflare R2 storage bucket containing the complete, unobfuscated TypeScript codebase of Claude Code.

# Before you continue please star this repository
## What This Repo Contains
- The leaked TypeScript/Bun source code under `src/`
- Cross-platform build scripts for Windows and Unix-like systems
- A reconstructed `package.json`, lockfile, and TypeScript config
- Local stub packages for missing private/internal dependencies so the project can build
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

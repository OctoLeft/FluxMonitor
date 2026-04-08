# Flux Monitor

A system monitoring and management dashboard designed for Macs running as servers, built with Next.js 16 + React 19 + TypeScript.

## Cursor Cloud specific instructions

### Quick reference

- **Dev server**: `npm run dev` (port 3000)
- **Lint**: `npm run lint` (pre-existing warnings/errors in the codebase; ESLint exits non-zero)
- **Build**: `npm run build`
- **Config**: Copy `config.example.json` → `config.json` if it doesn't exist. Default login: `admin` / `password123`.

### Caveats

- **macOS-only APIs**: Many API routes (`/api/system/stats`, `/api/launchagent/*`, etc.) invoke macOS-specific commands (`sysctl`, `sw_vers`, `pmset`, `launchctl`, `vm_stat`). On Linux these will return errors, but the app still starts and renders. Features like Processes, Configs, Docker, and Nginx may partially work on Linux.
- **No database**: All state lives in `config.json` (flat file). No migrations needed.
- **No automated test suite**: The project has no unit/integration tests. `test.sh` is a macOS-only launcher build script, not a test runner.
- **Launcher (Swift/Xcode)**: The `/launcher` directory contains a native macOS menu-bar app. Not buildable on Linux — ignore it for cloud development.
- **ESLint exits non-zero**: The codebase has ~44 pre-existing errors and ~41 warnings. `npm run lint` will always exit 1 in the current state.

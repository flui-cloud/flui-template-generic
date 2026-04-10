# Flui Template — Generic

A minimal **Node.js** HTTP server with **zero dependencies**, ready to deploy on [Flui](https://flui.cloud).

This is a starting point for projects that don't fit one of the framework-specific templates. Replace `server.js` with your own code, or adapt the Dockerfile to use any runtime you prefer (Go, Rust, Bun, Deno, etc).

This template includes:

- 🟢 Pure Node.js HTTP server (no dependencies, no package install)
- 🩺 `/health` endpoint
- ℹ️  `/api/info` endpoint with runtime info
- 🐳 Minimal Dockerfile (`#flui-managed`)

## Local development

```bash
node server.js
```

App runs on http://localhost:3000

## Build with Docker

```bash
docker build -t flui-demo-generic .
docker run -p 3000:3000 flui-demo-generic
```

## Customizing for other languages

The Dockerfile is intentionally simple. To switch to another runtime:

1. Replace the `FROM` base image (e.g. `golang:1.23-alpine`, `rust:1.83-slim`, `denoland/deno:alpine`)
2. Update the `COPY` and `CMD` instructions
3. Keep the `# #flui-managed` marker on line 1
4. Keep `EXPOSE` matching your app's port

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `Flui Demo Generic` | App name |
| `APP_VERSION` | `1.0.0` | App version |
| `PORT` | `3000` | HTTP port |

## Deploy with Flui

1. Click **Use this template** on GitHub
2. Customize for your needs
3. Connect to Flui
4. Click **Deploy**

## License

MIT

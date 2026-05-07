# Flui Template — Generic

A minimal **Node.js** HTTP server with **zero dependencies**, ready to deploy on [Flui](https://flui.cloud).

This is a starting point for projects that don't fit one of the framework-specific templates. Replace `server.js` with your own code, or adapt the Dockerfile to use any runtime you prefer (Go, Rust, Bun, Deno, etc).

Includes:

- Pure Node.js HTTP server with no dependencies and no package install step
- `/health` endpoint
- `/api/info` endpoint with runtime info
- Minimal `#flui-managed` Dockerfile

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

This repo ships with a [`flui.yaml`](./flui.yaml) manifest describing the build strategy, port, healthcheck and resource profile.

From the CLI, with `flui` installed and authenticated against your cluster:

```bash
flui deploy ./flui.yaml
```

The CLI reads the manifest, triggers a build via GitHub Actions and rolls out the workload.

From the UI:

1. Click **Use this template** on GitHub.
2. Connect the new repository to Flui.
3. Click **Deploy**.

Built for [Flui](https://github.com/flui-cloud/flui.api) — see the main repo for cluster setup and CLI installation.

## License

MIT

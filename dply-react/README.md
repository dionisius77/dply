# dply-react

React web client for dply core operations using **gRPC-Web**.

## Scope (Phase 1)
- Login/logout/status
- Project list/create/delete + active project selector
- Image list/add
- Spec get/upsert: envar, scale, port, affinity
- Deploy image / redeploy

Excluded in this phase:
- `dply image create` local Docker build/push
- CLI config-equivalent screens

## Runtime Config
`public/env-config.js` is generated in Docker entrypoint and can be edited manually in local static hosting.

Supported runtime keys:
- `REACT_APP_GRPC_WEB_HOST` (preferred)
- `REACT_APP_REST_HOST` (fallback)

## gRPC-Web Codegen
Proto source for web client generation lives in [`./proto`](./proto).

Prerequisite tools:
- `protoc`
- `protoc-gen-js`
- `protoc-gen-grpc-web`

Generate clients:

```bash
yarn grpc:generate
```

Generated files are written to [`src/grpc/generated`](./src/grpc/generated).

## Local Dev

Install dependencies:

```bash
yarn
```

Run react dev server:

```bash
yarn start:dev
```

## Envoy gRPC-Web Proxy
Envoy config is in [`envoy.yaml`](./envoy.yaml).

Example compose file is in [`docker-compose.grpc-web.yml`](./docker-compose.grpc-web.yml) and expects:
- a reachable `dply-server` gRPC endpoint at `dply-server:50090`
- external Docker network `dply-net`

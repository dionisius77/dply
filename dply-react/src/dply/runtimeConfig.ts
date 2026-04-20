declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      REACT_APP_GRPC_WEB_HOST?: string;
      REACT_APP_REST_HOST?: string;
    };
  }
}

export const getGrpcWebHost = (): string => {
  return (
    window.__RUNTIME_CONFIG__?.REACT_APP_GRPC_WEB_HOST ||
    window.__RUNTIME_CONFIG__?.REACT_APP_REST_HOST ||
    process.env.REACT_APP_GRPC_WEB_HOST ||
    process.env.REACT_APP_REST_HOST ||
    "http://localhost:8080"
  );
};

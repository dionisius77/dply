import { RpcError, StatusCode } from "grpc-web";

const prefix = (message: string) => (message ? message : "Unexpected error");

export const mapGrpcError = (error: unknown): string => {
  const e = error as Partial<RpcError> | undefined;
  if (!e || typeof e !== "object") {
    return "Unexpected error";
  }

  if (e.code === StatusCode.UNAUTHENTICATED || e.code === StatusCode.PERMISSION_DENIED) {
    return "Unauthorized. Please login again.";
  }
  if (e.code === StatusCode.INVALID_ARGUMENT) {
    return prefix(e.message || "Invalid request.");
  }
  if (e.code === StatusCode.UNAVAILABLE) {
    return "Service unavailable. Please retry.";
  }

  return prefix(e.message || "Unexpected error");
};

import { DeployApiClient } from "../../grpc/generated/DeployServiceClientPb";
import { ImageApiClient } from "../../grpc/generated/ImageServiceClientPb";
import { ProjectApiClient } from "../../grpc/generated/ProjectServiceClientPb";
import { ServerApiClient } from "../../grpc/generated/ServerServiceClientPb";
import { SpecApiClient } from "../../grpc/generated/SpecServiceClientPb";
import { UserApiClient } from "../../grpc/generated/UserServiceClientPb";
import { getGrpcWebHost } from "../runtimeConfig";

const host = getGrpcWebHost();

export const userClient = new UserApiClient(host, null, null);
export const serverClient = new ServerApiClient(host, null, null);
export const projectClient = new ProjectApiClient(host, null, null);
export const imageClient = new ImageApiClient(host, null, null);
export const specClient = new SpecApiClient(host, null, null);
export const deployClient = new DeployApiClient(host, null, null);

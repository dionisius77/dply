import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { mapGrpcError } from "./error";
import {
  AddReq,
  GetReq,
} from "../../grpc/generated/image_pb";
import {
  CreateReq,
  DeleteReq,
} from "../../grpc/generated/project_pb";
import {
  DeployImageReq,
  RedeployReq,
} from "../../grpc/generated/deploy_pb";
import {
  GetAffinityReq,
  GetEnvarReq,
  GetPortReq,
  GetScaleReq,
  Port,
  UpsertAffinityReq,
  UpsertEnvarReq,
  UpsertPortReq,
  UpsertScaleReq,
  AffinityTerm,
} from "../../grpc/generated/spec_pb";
import { LoginReq } from "../../grpc/generated/user_pb";
import {
  deployClient,
  imageClient,
  projectClient,
  serverClient,
  specClient,
  userClient,
} from "./client";
import {
  AffinitySpec,
  AuthUser,
  ImageItem,
  ProjectItem,
  ScaleSpec,
  SpecBundle,
} from "../types";

const authMetadata = (token?: string): Record<string, string> =>
  token ? { Authorization: token } : {};

const asError = (error: unknown) => new Error(mapGrpcError(error));

export const login = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const req = new LoginReq();
    req.setEmail(email);
    req.setPassword(password);
    const resp = await userClient.login(req, {});
    return {
      name: resp.getName(),
      usertype: resp.getUsertype(),
      email: resp.getEmail(),
      token: resp.getToken(),
    };
  } catch (error) {
    throw asError(error);
  }
};

export const getCurrentLogin = async (token: string): Promise<AuthUser> => {
  try {
    const resp = await userClient.getCurrentLogin(new Empty(), authMetadata(token));
    return {
      name: resp.getName(),
      usertype: resp.getUsertype(),
      email: resp.getEmail(),
      token: resp.getToken(),
    };
  } catch (error) {
    throw asError(error);
  }
};

export const getServerStatus = async (): Promise<string> => {
  try {
    const resp = await serverClient.status(new Empty(), {});
    return resp.getStatus();
  } catch (error) {
    throw asError(error);
  }
};

export const listProjects = async (token: string): Promise<ProjectItem[]> => {
  try {
    const resp = await projectClient.getAll(new Empty(), authMetadata(token));
    return resp.getProjectsList().map((p) => ({
      id: p.getId(),
      name: p.getName(),
      description: p.getDescription(),
    }));
  } catch (error) {
    throw asError(error);
  }
};

export const createProject = async (token: string, name: string, description: string): Promise<void> => {
  try {
    const req = new CreateReq();
    req.setName(name);
    req.setDescription(description);
    await projectClient.create(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const deleteProject = async (token: string, name: string): Promise<void> => {
  try {
    const req = new DeleteReq();
    req.setName(name);
    await projectClient.delete(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const listImages = async (
  token: string,
  project: string,
  repository: string,
  page: number,
  size: number,
): Promise<ImageItem[]> => {
  try {
    const req = new GetReq();
    req.setProject(project);
    req.setRepository(repository);
    req.setPage(page);
    req.setSize(size);
    const resp = await imageClient.get(req, authMetadata(token));
    return resp.getImagesList().map((item) => ({
      id: item.getId(),
      digest: item.getDigest(),
      image: item.getImage(),
      project: item.getProject(),
      repository: item.getRepository(),
      description: item.getDescription(),
      createdBy: item.getCreatedby(),
      createdAt: item.getCreatedat()?.toDate().toISOString() || "",
      notes: item.getNotes(),
    }));
  } catch (error) {
    throw asError(error);
  }
};

export const addImage = async (
  token: string,
  project: string,
  repository: string,
  image: string,
  description: string,
): Promise<void> => {
  try {
    const req = new AddReq();
    req.setProject(project);
    req.setRepository(repository);
    req.setImage(image);
    req.setDescription(description);
    await imageClient.add(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

const newScope = (project: string, env: string, name: string) => ({ project, env, name });

export const getSpecBundle = async (
  token: string,
  project: string,
  env: string,
  name: string,
): Promise<SpecBundle> => {
  const scope = newScope(project, env, name);
  try {
    const envarReq = new GetEnvarReq();
    envarReq.setProject(scope.project);
    envarReq.setEnv(scope.env);
    envarReq.setName(scope.name);

    const scaleReq = new GetScaleReq();
    scaleReq.setProject(scope.project);
    scaleReq.setEnv(scope.env);
    scaleReq.setName(scope.name);

    const portReq = new GetPortReq();
    portReq.setProject(scope.project);
    portReq.setEnv(scope.env);
    portReq.setName(scope.name);

    const affinityReq = new GetAffinityReq();
    affinityReq.setProject(scope.project);
    affinityReq.setEnv(scope.env);
    affinityReq.setName(scope.name);

    const [envar, scale, ports, affinity] = await Promise.all([
      specClient.getEnvar(envarReq, authMetadata(token)),
      specClient.getScale(scaleReq, authMetadata(token)),
      specClient.getPort(portReq, authMetadata(token)),
      specClient.getAffinity(affinityReq, authMetadata(token)),
    ]);

    return {
      variables: envar.getVariables(),
      scaling: {
        project: scale.getProject(),
        env: scale.getEnv(),
        name: scale.getName(),
        minReplica: scale.getMinreplica(),
        maxReplica: scale.getMaxreplica(),
        minCpu: scale.getMincpu(),
        maxCpu: scale.getMaxcpu(),
        minMemory: scale.getMinmemory(),
        maxMemory: scale.getMaxmemory(),
        targetCpu: scale.getTargetcpuutilization(),
      },
      ports: {
        accessType: ports.getAccesstype(),
        externalIP: ports.getExternalip(),
        ports: ports.getPortsList().map((p) => ({
          name: p.getPortname(),
          port: p.getPort(),
          remotePort: p.getRemoteport(),
          protocol: p.getProtocol(),
        })),
      },
      affinity: {
        nodeAffinity: affinity.getNodeaffinityList().map((a) => ({
          mode: a.getMode(),
          key: a.getKey(),
          operator: a.getOperator(),
          values: a.getValuesList(),
          weight: a.getWeight(),
          topologyKey: a.getTopologykey(),
        })),
        podAffinity: affinity.getPodaffinityList().map((a) => ({
          mode: a.getMode(),
          key: a.getKey(),
          operator: a.getOperator(),
          values: a.getValuesList(),
          weight: a.getWeight(),
          topologyKey: a.getTopologykey(),
        })),
        podAntiAffinity: affinity.getPodantiaffinityList().map((a) => ({
          mode: a.getMode(),
          key: a.getKey(),
          operator: a.getOperator(),
          values: a.getValuesList(),
          weight: a.getWeight(),
          topologyKey: a.getTopologykey(),
        })),
      },
    };
  } catch (error) {
    throw asError(error);
  }
};

export const upsertEnvar = async (
  token: string,
  project: string,
  env: string,
  name: string,
  variables: string,
): Promise<void> => {
  try {
    const req = new UpsertEnvarReq();
    req.setProject(project);
    req.setEnv(env);
    req.setName(name);
    req.setVariables(variables);
    await specClient.upsertEnvar(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const upsertScale = async (
  token: string,
  scale: ScaleSpec,
): Promise<void> => {
  try {
    const req = new UpsertScaleReq();
    req.setProject(scale.project);
    req.setEnv(scale.env);
    req.setName(scale.name);
    req.setMinreplica(scale.minReplica);
    req.setMaxreplica(scale.maxReplica);
    req.setMincpu(scale.minCpu);
    req.setMaxcpu(scale.maxCpu);
    req.setMinmemory(scale.minMemory);
    req.setMaxmemory(scale.maxMemory);
    req.setTargetcpuutilization(scale.targetCpu);
    await specClient.upsertScale(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const upsertPorts = async (
  token: string,
  project: string,
  env: string,
  name: string,
  accessType: string,
  externalIP: string,
  ports: Array<{ name: string; port: number; remotePort: number; protocol: string }>,
): Promise<void> => {
  try {
    const req = new UpsertPortReq();
    req.setProject(project);
    req.setEnv(env);
    req.setName(name);
    req.setAccesstype(accessType);
    req.setExternalip(externalIP);
    req.setPortsList(
      ports.map((item) => {
        const p = new Port();
        p.setPortname(item.name);
        p.setPort(item.port);
        p.setRemoteport(item.remotePort);
        p.setProtocol(item.protocol);
        return p;
      }),
    );
    await specClient.upsertPort(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

const makeAffinityTerm = (item: {
  mode: string;
  key: string;
  operator: string;
  values: string[];
  weight: number;
  topologyKey: string;
}): AffinityTerm => {
  const term = new AffinityTerm();
  term.setMode(item.mode);
  term.setKey(item.key);
  term.setOperator(item.operator);
  term.setValuesList(item.values || []);
  term.setWeight(item.weight || 0);
  term.setTopologykey(item.topologyKey || "");
  return term;
};

export const upsertAffinity = async (
  token: string,
  project: string,
  env: string,
  name: string,
  affinity: AffinitySpec,
): Promise<void> => {
  try {
    const req = new UpsertAffinityReq();
    req.setProject(project);
    req.setEnv(env);
    req.setName(name);
    req.setNodeaffinityList((affinity.nodeAffinity || []).map(makeAffinityTerm));
    req.setPodaffinityList((affinity.podAffinity || []).map(makeAffinityTerm));
    req.setPodantiaffinityList((affinity.podAntiAffinity || []).map(makeAffinityTerm));
    await specClient.upsertAffinity(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const deployImage = async (
  token: string,
  project: string,
  env: string,
  name: string,
  digest: string,
): Promise<void> => {
  try {
    const req = new DeployImageReq();
    req.setProject(project);
    req.setEnv(env);
    req.setName(name);
    req.setDigest(digest);
    await deployClient.deployImage(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export const redeploy = async (
  token: string,
  project: string,
  env: string,
  name: string,
): Promise<void> => {
  try {
    const req = new RedeployReq();
    req.setProject(project);
    req.setEnv(env);
    req.setName(name);
    await deployClient.redeploy(req, authMetadata(token));
  } catch (error) {
    throw asError(error);
  }
};

export type AuthUser = {
  name: string;
  usertype: string;
  email: string;
  token: string;
};

export type ProjectItem = {
  id: number;
  name: string;
  description: string;
};

export type ImageItem = {
  id: number;
  digest: string;
  image: string;
  project: string;
  repository: string;
  description: string;
  createdBy: number;
  createdAt: string;
  notes: string;
};

export type ScaleSpec = {
  project: string;
  env: string;
  name: string;
  minReplica: number;
  maxReplica: number;
  minCpu: number;
  maxCpu: number;
  minMemory: number;
  maxMemory: number;
  targetCpu: number;
};

export type PortSpecItem = {
  name: string;
  port: number;
  remotePort: number;
  protocol: string;
};

export type PortsSpec = {
  accessType: string;
  externalIP: string;
  ports: PortSpecItem[];
};

export type AffinityTerm = {
  mode: string;
  key: string;
  operator: string;
  values: string[];
  weight: number;
  topologyKey: string;
};

export type AffinitySpec = {
  nodeAffinity: AffinityTerm[];
  podAffinity: AffinityTerm[];
  podAntiAffinity: AffinityTerm[];
};

export type SpecBundle = {
  variables: string;
  scaling: ScaleSpec;
  ports: PortsSpec;
  affinity: AffinitySpec;
};

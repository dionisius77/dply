import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class GetEnvarReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): GetEnvarReq;

  getEnv(): string;
  setEnv(value: string): GetEnvarReq;

  getName(): string;
  setName(value: string): GetEnvarReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEnvarReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetEnvarReq): GetEnvarReq.AsObject;
  static serializeBinaryToWriter(message: GetEnvarReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEnvarReq;
  static deserializeBinaryFromReader(message: GetEnvarReq, reader: jspb.BinaryReader): GetEnvarReq;
}

export namespace GetEnvarReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
  }
}

export class UpsertEnvarReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): UpsertEnvarReq;

  getEnv(): string;
  setEnv(value: string): UpsertEnvarReq;

  getName(): string;
  setName(value: string): UpsertEnvarReq;

  getVariables(): string;
  setVariables(value: string): UpsertEnvarReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertEnvarReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertEnvarReq): UpsertEnvarReq.AsObject;
  static serializeBinaryToWriter(message: UpsertEnvarReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertEnvarReq;
  static deserializeBinaryFromReader(message: UpsertEnvarReq, reader: jspb.BinaryReader): UpsertEnvarReq;
}

export namespace UpsertEnvarReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    variables: string,
  }
}

export class Envar extends jspb.Message {
  getVariables(): string;
  setVariables(value: string): Envar;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Envar.AsObject;
  static toObject(includeInstance: boolean, msg: Envar): Envar.AsObject;
  static serializeBinaryToWriter(message: Envar, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Envar;
  static deserializeBinaryFromReader(message: Envar, reader: jspb.BinaryReader): Envar;
}

export namespace Envar {
  export type AsObject = {
    variables: string,
  }
}

export class GetScaleReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): GetScaleReq;

  getEnv(): string;
  setEnv(value: string): GetScaleReq;

  getName(): string;
  setName(value: string): GetScaleReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScaleReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetScaleReq): GetScaleReq.AsObject;
  static serializeBinaryToWriter(message: GetScaleReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScaleReq;
  static deserializeBinaryFromReader(message: GetScaleReq, reader: jspb.BinaryReader): GetScaleReq;
}

export namespace GetScaleReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
  }
}

export class UpsertScaleReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): UpsertScaleReq;

  getEnv(): string;
  setEnv(value: string): UpsertScaleReq;

  getName(): string;
  setName(value: string): UpsertScaleReq;

  getMinreplica(): number;
  setMinreplica(value: number): UpsertScaleReq;

  getMaxreplica(): number;
  setMaxreplica(value: number): UpsertScaleReq;

  getMincpu(): number;
  setMincpu(value: number): UpsertScaleReq;

  getMaxcpu(): number;
  setMaxcpu(value: number): UpsertScaleReq;

  getMinmemory(): number;
  setMinmemory(value: number): UpsertScaleReq;

  getMaxmemory(): number;
  setMaxmemory(value: number): UpsertScaleReq;

  getTargetcpuutilization(): number;
  setTargetcpuutilization(value: number): UpsertScaleReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertScaleReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertScaleReq): UpsertScaleReq.AsObject;
  static serializeBinaryToWriter(message: UpsertScaleReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertScaleReq;
  static deserializeBinaryFromReader(message: UpsertScaleReq, reader: jspb.BinaryReader): UpsertScaleReq;
}

export namespace UpsertScaleReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    minreplica: number,
    maxreplica: number,
    mincpu: number,
    maxcpu: number,
    minmemory: number,
    maxmemory: number,
    targetcpuutilization: number,
  }
}

export class Scale extends jspb.Message {
  getProject(): string;
  setProject(value: string): Scale;

  getEnv(): string;
  setEnv(value: string): Scale;

  getName(): string;
  setName(value: string): Scale;

  getMinreplica(): number;
  setMinreplica(value: number): Scale;

  getMaxreplica(): number;
  setMaxreplica(value: number): Scale;

  getMincpu(): number;
  setMincpu(value: number): Scale;

  getMaxcpu(): number;
  setMaxcpu(value: number): Scale;

  getMinmemory(): number;
  setMinmemory(value: number): Scale;

  getMaxmemory(): number;
  setMaxmemory(value: number): Scale;

  getTargetcpuutilization(): number;
  setTargetcpuutilization(value: number): Scale;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Scale.AsObject;
  static toObject(includeInstance: boolean, msg: Scale): Scale.AsObject;
  static serializeBinaryToWriter(message: Scale, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Scale;
  static deserializeBinaryFromReader(message: Scale, reader: jspb.BinaryReader): Scale;
}

export namespace Scale {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    minreplica: number,
    maxreplica: number,
    mincpu: number,
    maxcpu: number,
    minmemory: number,
    maxmemory: number,
    targetcpuutilization: number,
  }
}

export class GetPortReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): GetPortReq;

  getEnv(): string;
  setEnv(value: string): GetPortReq;

  getName(): string;
  setName(value: string): GetPortReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPortReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetPortReq): GetPortReq.AsObject;
  static serializeBinaryToWriter(message: GetPortReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPortReq;
  static deserializeBinaryFromReader(message: GetPortReq, reader: jspb.BinaryReader): GetPortReq;
}

export namespace GetPortReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
  }
}

export class UpsertPortReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): UpsertPortReq;

  getEnv(): string;
  setEnv(value: string): UpsertPortReq;

  getName(): string;
  setName(value: string): UpsertPortReq;

  getAccesstype(): string;
  setAccesstype(value: string): UpsertPortReq;

  getExternalip(): string;
  setExternalip(value: string): UpsertPortReq;

  getPortsList(): Array<Port>;
  setPortsList(value: Array<Port>): UpsertPortReq;
  clearPortsList(): UpsertPortReq;
  addPorts(value?: Port, index?: number): Port;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertPortReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertPortReq): UpsertPortReq.AsObject;
  static serializeBinaryToWriter(message: UpsertPortReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertPortReq;
  static deserializeBinaryFromReader(message: UpsertPortReq, reader: jspb.BinaryReader): UpsertPortReq;
}

export namespace UpsertPortReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    accesstype: string,
    externalip: string,
    portsList: Array<Port.AsObject>,
  }
}

export class Ports extends jspb.Message {
  getPortsList(): Array<Port>;
  setPortsList(value: Array<Port>): Ports;
  clearPortsList(): Ports;
  addPorts(value?: Port, index?: number): Port;

  getAccesstype(): string;
  setAccesstype(value: string): Ports;

  getExternalip(): string;
  setExternalip(value: string): Ports;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ports.AsObject;
  static toObject(includeInstance: boolean, msg: Ports): Ports.AsObject;
  static serializeBinaryToWriter(message: Ports, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ports;
  static deserializeBinaryFromReader(message: Ports, reader: jspb.BinaryReader): Ports;
}

export namespace Ports {
  export type AsObject = {
    portsList: Array<Port.AsObject>,
    accesstype: string,
    externalip: string,
  }
}

export class Port extends jspb.Message {
  getPortname(): string;
  setPortname(value: string): Port;

  getPort(): number;
  setPort(value: number): Port;

  getRemoteport(): number;
  setRemoteport(value: number): Port;

  getProtocol(): string;
  setProtocol(value: string): Port;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Port.AsObject;
  static toObject(includeInstance: boolean, msg: Port): Port.AsObject;
  static serializeBinaryToWriter(message: Port, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Port;
  static deserializeBinaryFromReader(message: Port, reader: jspb.BinaryReader): Port;
}

export namespace Port {
  export type AsObject = {
    portname: string,
    port: number,
    remoteport: number,
    protocol: string,
  }
}

export class GetAffinityReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): GetAffinityReq;

  getEnv(): string;
  setEnv(value: string): GetAffinityReq;

  getName(): string;
  setName(value: string): GetAffinityReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAffinityReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetAffinityReq): GetAffinityReq.AsObject;
  static serializeBinaryToWriter(message: GetAffinityReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAffinityReq;
  static deserializeBinaryFromReader(message: GetAffinityReq, reader: jspb.BinaryReader): GetAffinityReq;
}

export namespace GetAffinityReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
  }
}

export class UpsertAffinityReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): UpsertAffinityReq;

  getEnv(): string;
  setEnv(value: string): UpsertAffinityReq;

  getName(): string;
  setName(value: string): UpsertAffinityReq;

  getNodeaffinityList(): Array<AffinityTerm>;
  setNodeaffinityList(value: Array<AffinityTerm>): UpsertAffinityReq;
  clearNodeaffinityList(): UpsertAffinityReq;
  addNodeaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  getPodaffinityList(): Array<AffinityTerm>;
  setPodaffinityList(value: Array<AffinityTerm>): UpsertAffinityReq;
  clearPodaffinityList(): UpsertAffinityReq;
  addPodaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  getPodantiaffinityList(): Array<AffinityTerm>;
  setPodantiaffinityList(value: Array<AffinityTerm>): UpsertAffinityReq;
  clearPodantiaffinityList(): UpsertAffinityReq;
  addPodantiaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertAffinityReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertAffinityReq): UpsertAffinityReq.AsObject;
  static serializeBinaryToWriter(message: UpsertAffinityReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertAffinityReq;
  static deserializeBinaryFromReader(message: UpsertAffinityReq, reader: jspb.BinaryReader): UpsertAffinityReq;
}

export namespace UpsertAffinityReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    nodeaffinityList: Array<AffinityTerm.AsObject>,
    podaffinityList: Array<AffinityTerm.AsObject>,
    podantiaffinityList: Array<AffinityTerm.AsObject>,
  }
}

export class Affinity extends jspb.Message {
  getNodeaffinityList(): Array<AffinityTerm>;
  setNodeaffinityList(value: Array<AffinityTerm>): Affinity;
  clearNodeaffinityList(): Affinity;
  addNodeaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  getPodaffinityList(): Array<AffinityTerm>;
  setPodaffinityList(value: Array<AffinityTerm>): Affinity;
  clearPodaffinityList(): Affinity;
  addPodaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  getPodantiaffinityList(): Array<AffinityTerm>;
  setPodantiaffinityList(value: Array<AffinityTerm>): Affinity;
  clearPodantiaffinityList(): Affinity;
  addPodantiaffinity(value?: AffinityTerm, index?: number): AffinityTerm;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Affinity.AsObject;
  static toObject(includeInstance: boolean, msg: Affinity): Affinity.AsObject;
  static serializeBinaryToWriter(message: Affinity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Affinity;
  static deserializeBinaryFromReader(message: Affinity, reader: jspb.BinaryReader): Affinity;
}

export namespace Affinity {
  export type AsObject = {
    nodeaffinityList: Array<AffinityTerm.AsObject>,
    podaffinityList: Array<AffinityTerm.AsObject>,
    podantiaffinityList: Array<AffinityTerm.AsObject>,
  }
}

export class AffinityTerm extends jspb.Message {
  getMode(): string;
  setMode(value: string): AffinityTerm;

  getKey(): string;
  setKey(value: string): AffinityTerm;

  getOperator(): string;
  setOperator(value: string): AffinityTerm;

  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): AffinityTerm;
  clearValuesList(): AffinityTerm;
  addValues(value: string, index?: number): AffinityTerm;

  getWeight(): number;
  setWeight(value: number): AffinityTerm;

  getTopologykey(): string;
  setTopologykey(value: string): AffinityTerm;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AffinityTerm.AsObject;
  static toObject(includeInstance: boolean, msg: AffinityTerm): AffinityTerm.AsObject;
  static serializeBinaryToWriter(message: AffinityTerm, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AffinityTerm;
  static deserializeBinaryFromReader(message: AffinityTerm, reader: jspb.BinaryReader): AffinityTerm;
}

export namespace AffinityTerm {
  export type AsObject = {
    mode: string,
    key: string,
    operator: string,
    valuesList: Array<string>,
    weight: number,
    topologykey: string,
  }
}


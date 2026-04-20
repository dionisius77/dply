import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class DeployImageReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): DeployImageReq;

  getEnv(): string;
  setEnv(value: string): DeployImageReq;

  getName(): string;
  setName(value: string): DeployImageReq;

  getDigest(): string;
  setDigest(value: string): DeployImageReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployImageReq.AsObject;
  static toObject(includeInstance: boolean, msg: DeployImageReq): DeployImageReq.AsObject;
  static serializeBinaryToWriter(message: DeployImageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployImageReq;
  static deserializeBinaryFromReader(message: DeployImageReq, reader: jspb.BinaryReader): DeployImageReq;
}

export namespace DeployImageReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
    digest: string,
  }
}

export class RedeployReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): RedeployReq;

  getEnv(): string;
  setEnv(value: string): RedeployReq;

  getName(): string;
  setName(value: string): RedeployReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RedeployReq.AsObject;
  static toObject(includeInstance: boolean, msg: RedeployReq): RedeployReq.AsObject;
  static serializeBinaryToWriter(message: RedeployReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RedeployReq;
  static deserializeBinaryFromReader(message: RedeployReq, reader: jspb.BinaryReader): RedeployReq;
}

export namespace RedeployReq {
  export type AsObject = {
    project: string,
    env: string,
    name: string,
  }
}


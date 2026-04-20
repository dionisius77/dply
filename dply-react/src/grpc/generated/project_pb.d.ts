import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class Project extends jspb.Message {
  getId(): number;
  setId(value: number): Project;

  getName(): string;
  setName(value: string): Project;

  getDescription(): string;
  setDescription(value: string): Project;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Project.AsObject;
  static toObject(includeInstance: boolean, msg: Project): Project.AsObject;
  static serializeBinaryToWriter(message: Project, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Project;
  static deserializeBinaryFromReader(message: Project, reader: jspb.BinaryReader): Project;
}

export namespace Project {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
  }
}

export class Projects extends jspb.Message {
  getProjectsList(): Array<Project>;
  setProjectsList(value: Array<Project>): Projects;
  clearProjectsList(): Projects;
  addProjects(value?: Project, index?: number): Project;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Projects.AsObject;
  static toObject(includeInstance: boolean, msg: Projects): Projects.AsObject;
  static serializeBinaryToWriter(message: Projects, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Projects;
  static deserializeBinaryFromReader(message: Projects, reader: jspb.BinaryReader): Projects;
}

export namespace Projects {
  export type AsObject = {
    projectsList: Array<Project.AsObject>,
  }
}

export class CreateReq extends jspb.Message {
  getName(): string;
  setName(value: string): CreateReq;

  getDescription(): string;
  setDescription(value: string): CreateReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReq.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReq): CreateReq.AsObject;
  static serializeBinaryToWriter(message: CreateReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReq;
  static deserializeBinaryFromReader(message: CreateReq, reader: jspb.BinaryReader): CreateReq;
}

export namespace CreateReq {
  export type AsObject = {
    name: string,
    description: string,
  }
}

export class DeleteReq extends jspb.Message {
  getName(): string;
  setName(value: string): DeleteReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteReq.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteReq): DeleteReq.AsObject;
  static serializeBinaryToWriter(message: DeleteReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteReq;
  static deserializeBinaryFromReader(message: DeleteReq, reader: jspb.BinaryReader): DeleteReq;
}

export namespace DeleteReq {
  export type AsObject = {
    name: string,
  }
}


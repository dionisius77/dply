import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Image extends jspb.Message {
  getId(): number;
  setId(value: number): Image;

  getDigest(): string;
  setDigest(value: string): Image;

  getImage(): string;
  setImage(value: string): Image;

  getProject(): string;
  setProject(value: string): Image;

  getRepository(): string;
  setRepository(value: string): Image;

  getDescription(): string;
  setDescription(value: string): Image;

  getCreatedby(): number;
  setCreatedby(value: number): Image;

  getCreatedat(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedat(value?: google_protobuf_timestamp_pb.Timestamp): Image;
  hasCreatedat(): boolean;
  clearCreatedat(): Image;

  getNotes(): string;
  setNotes(value: string): Image;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    id: number,
    digest: string,
    image: string,
    project: string,
    repository: string,
    description: string,
    createdby: number,
    createdat?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    notes: string,
  }
}

export class Images extends jspb.Message {
  getImagesList(): Array<Image>;
  setImagesList(value: Array<Image>): Images;
  clearImagesList(): Images;
  addImages(value?: Image, index?: number): Image;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Images.AsObject;
  static toObject(includeInstance: boolean, msg: Images): Images.AsObject;
  static serializeBinaryToWriter(message: Images, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Images;
  static deserializeBinaryFromReader(message: Images, reader: jspb.BinaryReader): Images;
}

export namespace Images {
  export type AsObject = {
    imagesList: Array<Image.AsObject>,
  }
}

export class GetReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): GetReq;

  getRepository(): string;
  setRepository(value: string): GetReq;

  getSize(): number;
  setSize(value: number): GetReq;

  getPage(): number;
  setPage(value: number): GetReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetReq): GetReq.AsObject;
  static serializeBinaryToWriter(message: GetReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReq;
  static deserializeBinaryFromReader(message: GetReq, reader: jspb.BinaryReader): GetReq;
}

export namespace GetReq {
  export type AsObject = {
    project: string,
    repository: string,
    size: number,
    page: number,
  }
}

export class AddReq extends jspb.Message {
  getProject(): string;
  setProject(value: string): AddReq;

  getImage(): string;
  setImage(value: string): AddReq;

  getRepository(): string;
  setRepository(value: string): AddReq;

  getDescription(): string;
  setDescription(value: string): AddReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddReq): AddReq.AsObject;
  static serializeBinaryToWriter(message: AddReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddReq;
  static deserializeBinaryFromReader(message: AddReq, reader: jspb.BinaryReader): AddReq;
}

export namespace AddReq {
  export type AsObject = {
    project: string,
    image: string,
    repository: string,
    description: string,
  }
}


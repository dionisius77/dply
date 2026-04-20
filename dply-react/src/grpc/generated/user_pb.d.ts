import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class LoginReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginReq;

  getPassword(): string;
  setPassword(value: string): LoginReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginReq.AsObject;
  static toObject(includeInstance: boolean, msg: LoginReq): LoginReq.AsObject;
  static serializeBinaryToWriter(message: LoginReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginReq;
  static deserializeBinaryFromReader(message: LoginReq, reader: jspb.BinaryReader): LoginReq;
}

export namespace LoginReq {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class UpdatePasswordReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): UpdatePasswordReq;

  getOldpassword(): string;
  setOldpassword(value: string): UpdatePasswordReq;

  getNewpassword(): string;
  setNewpassword(value: string): UpdatePasswordReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdatePasswordReq.AsObject;
  static toObject(includeInstance: boolean, msg: UpdatePasswordReq): UpdatePasswordReq.AsObject;
  static serializeBinaryToWriter(message: UpdatePasswordReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdatePasswordReq;
  static deserializeBinaryFromReader(message: UpdatePasswordReq, reader: jspb.BinaryReader): UpdatePasswordReq;
}

export namespace UpdatePasswordReq {
  export type AsObject = {
    email: string,
    oldpassword: string,
    newpassword: string,
  }
}

export class User extends jspb.Message {
  getName(): string;
  setName(value: string): User;

  getUsertype(): string;
  setUsertype(value: string): User;

  getEmail(): string;
  setEmail(value: string): User;

  getToken(): string;
  setToken(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    name: string,
    usertype: string,
    email: string,
    token: string,
  }
}


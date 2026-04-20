import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class StatusResp extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): StatusResp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResp.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResp): StatusResp.AsObject;
  static serializeBinaryToWriter(message: StatusResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResp;
  static deserializeBinaryFromReader(message: StatusResp, reader: jspb.BinaryReader): StatusResp;
}

export namespace StatusResp {
  export type AsObject = {
    status: string,
  }
}


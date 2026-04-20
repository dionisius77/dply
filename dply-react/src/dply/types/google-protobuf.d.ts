declare module "google-protobuf/google/protobuf/empty_pb" {
  import * as jspb from "google-protobuf";

  export class Empty extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static deserializeBinary(bytes: Uint8Array): Empty;
  }

  export namespace Empty {
    type AsObject = Record<string, never>;
  }
}

declare module "google-protobuf/google/protobuf/timestamp_pb" {
  import * as jspb from "google-protobuf";

  export class Timestamp extends jspb.Message {
    getSeconds(): number;
    setSeconds(value: number): Timestamp;
    getNanos(): number;
    setNanos(value: number): Timestamp;
    toDate(): Date;
  }

  export namespace Timestamp {
    type AsObject = {
      seconds: number;
      nanos: number;
    };
  }
}

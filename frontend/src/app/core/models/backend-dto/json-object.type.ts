import { Primitive } from "../primitive.type";

export type JsonObject = {
  [key: string]:
    Primitive
  | Primitive[]
  | JsonObject
  | JsonObject[];
}

import { Primitive } from "../primitive.type";
import { SearchOperation } from "./search-operation.type";

export type SearchFilterDto = {
  fieldName: string;
  value: Primitive;
  operation: SearchOperation;
}

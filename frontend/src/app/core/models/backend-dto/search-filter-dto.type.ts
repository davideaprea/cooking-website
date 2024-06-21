import { Primitive } from "../primitive.type";
import { SearchOperation } from "./search-operation.type";

export type SearchFilterDto<T extends Primitive> = {
  fieldName: string;
  value: T;
  operation: SearchOperation;
}

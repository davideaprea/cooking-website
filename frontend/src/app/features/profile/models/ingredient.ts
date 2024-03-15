import { Category } from "./category"

export type Ingredient = {
  readonly id: number,
  name: string,
  category: Category
}

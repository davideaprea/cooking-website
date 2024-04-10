import { Category } from "./category.enum"

export type Ingredient = {
  readonly id: number,
  name: string,
  category: Category
}

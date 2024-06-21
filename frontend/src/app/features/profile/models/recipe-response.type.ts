import { BaseRecipe } from "./base-recipe.type"
import { RecipeType } from "./recipe-type.type"

export type RecipeResponse = BaseRecipe & {
  readonly id: number,
  readonly user: string,
  thumbnailImage: string
}

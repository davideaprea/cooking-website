import { BaseRecipe } from "./base-recipe"
import { RecipeType } from "./recipe-type"

export type RecipeResponse = BaseRecipe & {
  readonly id: number,
  readonly user: string,
  thumbnailImage: string,
  recipeType: RecipeType,
  isDairyFree: boolean,
  isGlutenFree: boolean
}

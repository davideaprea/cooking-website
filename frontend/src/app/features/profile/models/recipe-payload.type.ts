import { BaseRecipe } from "./base-recipe.type";

export type RecipePayload = BaseRecipe & {
  thumbnailImage: File
}

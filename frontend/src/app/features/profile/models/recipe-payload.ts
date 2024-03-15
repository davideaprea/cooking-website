import { BaseRecipe } from "./base-recipe";

export type RecipePayload = BaseRecipe & {
  thumbnailImage: File
}

import { BaseRecipe } from "../../profile/models/base-recipe.type";

export type RecipeSearchDto = Pick<BaseRecipe, "cookingTime" | "difficulty" | "isGlutenFree" | "isDairyFree" | "preparationTime" | "course" | "name" | "recipeType">;

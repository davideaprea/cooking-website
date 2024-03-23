import { Country } from "./country";
import { Course } from "./course";
import { Difficulty } from "./difficulty";
import { Ingredient } from "./ingredient";
import { RecipeIngredient } from "./recipe-ingredient";

export type BaseRecipe = {
  name: string,
  course: Course,
  difficulty: Difficulty,
  cookingTime: Date,
  preparationTime: Date,
  servings: number,
  caloriesPerServing: number,
  country: Country,
  ingredients: Set<RecipeIngredient>,
  preparationSteps: Set<string>,
  storage: string,
  tips?: string,
}

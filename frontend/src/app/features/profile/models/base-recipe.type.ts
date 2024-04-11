import { Country } from "./country.enum";
import { Course } from "./course.enum";
import { Difficulty } from "./difficulty.enum";
import { RecipeIngredient } from "./recipe-ingredient.type";
import { Duration } from "moment";
import { RecipeType } from "./recipe-type.type";

export type BaseRecipe = {
  name: string,
  course: Course,
  difficulty: Difficulty,
  preparationTime: Duration,
  cookingTime: Duration,
  servings: number,
  caloriesPerServing: number,
  country: Country,
  ingredients: RecipeIngredient[],
  preparationSteps: string[],
  storage: string,
  tips?: string,
  recipeType: RecipeType,
  isDairyFree: boolean,
  isGlutenFree: boolean
}

import { Time } from "@angular/common";
import { Country } from "./country.enum";
import { Course } from "./course.enum";
import { Difficulty } from "./difficulty.enum";
import { RecipeIngredient } from "./recipe-ingredient.type";

export type BaseRecipe = {
  name: string,
  course: Course,
  difficulty: Difficulty,
  cookingTime: Time,
  preparationTime: Time,
  servings: number,
  caloriesPerServing: number,
  country: Country,
  ingredients: RecipeIngredient[],
  preparationSteps: string[],
  storage: string,
  tips?: string,
}

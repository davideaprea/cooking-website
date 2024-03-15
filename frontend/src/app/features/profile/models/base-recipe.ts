import { Country } from "./country";
import { Course } from "./course";
import { Difficulty } from "./difficulty";
import { Ingredient } from "./ingredient";

export type BaseRecipe = {
  name: string,
  course: Course,
  difficulty: Difficulty,
  cookingTime: Date,
  preparationTime: Date,
  servings: number,
  caloriesPerServing: number,
  country: Country,
  ingredients: Set<{ingredient: Ingredient, grams: number}>,
  preparationSteps: Set<string>,
  storage: string,
  tips?: string,
}

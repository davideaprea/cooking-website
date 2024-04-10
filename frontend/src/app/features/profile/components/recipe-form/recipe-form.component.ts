import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course.enum';
import { Difficulty } from '../../models/difficulty.enum';
import { Country } from '../../models/country.enum';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Ingredient } from '../../models/ingredient.type';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Time } from '@angular/common';
import { FormModel } from 'src/app/core/models/form-model.type';
import { RecipePayload } from '../../models/recipe-payload.type';

type FormArrayProperty = "ingredients" | "preparationSteps";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  readonly utilityService = inject(UtilityService);

  readonly difficultyOptions = this.utilityService.getEnumAsArray(Difficulty) as string[];
  readonly courseOptions = this.utilityService.getEnumAsArray(Course) as string[];
  readonly countryOptions = this.utilityService.getEnumAsArray(Country) as string[];

  readonly trashIcon = faTrash;
  readonly plusIcon = faPlus;

  private _form = new FormGroup<FormModel<RecipePayload>>({
    name: new FormControl<string>("", Validators.required),
    course: new FormControl<Course | null>(null, Validators.required),
    thumbnailImage: new FormControl<File | null>(null, Validators.required),
    difficulty: new FormControl<Difficulty | null>(null, Validators.required),
    cookingTime: new FormControl<Time | null>(null, Validators.required),
    preparationTime: new FormControl<Time | null>(null, Validators.required),
    servings: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    caloriesPerServing: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ingredients: new FormArray<FormGroup<{
      ingredient: FormControl<Ingredient | null>;
      grams: FormControl<number | null>;
    }>>([]),
    preparationSteps: new FormArray<FormControl<string | null>>([]),
    country: new FormControl<Country | null>(null, Validators.required),
    storage: new FormControl<string>("", Validators.required),
    tips: new FormControl<string>("")
  });

  constructor(){
    this.addIngredient();
    this.addStep();
  }

  get form() {
    return this._form;
  }

  addIngredient(): void {
    const ingredientControl = new FormControl<Ingredient | null>(null, Validators.required);

    this.form.controls.ingredients.push(
      new FormGroup({
        ingredient: ingredientControl,
        grams: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
      })
    );

    ingredientControl.valueChanges.subscribe(value => console.log(value));
  }

  addStep(): void{
    this.form.controls.preparationSteps.push(new FormControl<string>("", [Validators.required, Validators.minLength(10)]));
  }

  removeFromFormArray(formArray: FormArrayProperty, index: number): void {
    if (this.form.controls[formArray].length > 1) this.form.controls[formArray].removeAt(index);
  }

  submit(): void{

  }
}

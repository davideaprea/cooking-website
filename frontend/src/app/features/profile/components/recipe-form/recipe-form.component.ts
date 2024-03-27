import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { Difficulty } from '../../models/difficulty';
import { Country } from '../../models/country';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Ingredient } from '../../models/ingredient';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type IngredientGroup = FormGroup<{
  ingredient: FormControl<Ingredient | null>;
  grams: FormControl<number | null>;
}>;

type FormArrayProperty = "stepsFormArray" | "ingredientsFormArray";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  readonly utilityService = inject(UtilityService);

  readonly difficultyOptions = this.utilityService.getEnumAsArray(Difficulty);
  readonly courseOptions = this.utilityService.getEnumAsArray(Course);
  readonly countryOptions = this.utilityService.getEnumAsArray(Country);

  readonly trashIcon = faTrash;
  readonly plusIcon = faPlus;

  form = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    course: new FormControl<Course | null>(null, Validators.required),
    thumbnailImage: new FormControl<File | null>(null, Validators.required),
    difficulty: new FormControl<Difficulty | null>(null, Validators.required),
    cookingTime: new FormControl<Date | null>(null, Validators.required),
    preparationTime: new FormControl<Date | null>(null, Validators.required),
    servings: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    caloriesPerServing: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ingredients: new FormArray<IngredientGroup>([]),
    preparationSteps: new FormArray<FormControl<string | null>>([]),
    country: new FormControl<Country | null>(null, Validators.required),
    storage: new FormControl<string>("", Validators.required),
    tips: new FormControl<string>("")
  });

  constructor(){
    this.addIngredient();
    this.addStep();
  }

  addIngredient(): void {
    this.ingredientsFormArray.push(
      new FormGroup({
        ingredient: new FormControl<Ingredient | null>(null, Validators.required),
        grams: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
      })
    );
  }

  addStep(): void{
    this.stepsFormArray.push(new FormControl<string>("", [Validators.required, Validators.minLength(10)]));
  }

  removeFromFormArray(formArray: FormArrayProperty, index: number): void {
    if (this[formArray].length > 1) this[formArray].removeAt(index);
  }

  submit(): void{
    console.log(this.form.value)
  }

  get nameControl() {
    return this.form.get('name') as FormControl<string>;
  }

  get courseControl() {
    return this.form.get('course') as FormControl<Course | null>;
  }

  get thumbnailImageControl() {
    return this.form.get('thumbnailImage') as FormControl<File | null>;
  }

  get difficultyControl() {
    return this.form.get('difficulty') as FormControl<Difficulty>;
  }

  get cookingTimeControl() {
    return this.form.get('cookingTime') as FormControl<Date | null>;
  }

  get preparationTimeControl() {
    return this.form.get('preparationTime') as FormControl<Date | null>;
  }

  get servingsControl() {
    return this.form.get('servings') as FormControl<number | null>;
  }

  get caloriesPerServingControl() {
    return this.form.get('caloriesPerServing') as FormControl<number | null>;
  }

  get countryControl() {
    return this.form.get('country') as FormControl<Country | null>;
  }

  get storageControl() {
    return this.form.get('storage') as FormControl<string>;
  }

  get tipsControl() {
    return this.form.get('tips') as FormControl<string>;
  }

  get ingredientsFormArray() {
    return this.form.get('ingredients') as FormArray<IngredientGroup>;
  }

  get stepsFormArray() {
    return this.form.get('preparationSteps') as FormArray<FormControl<string | null>>;
  }

  getIngredientControl(index: number) {
    return this.ingredientsFormArray.at(index).get('ingredient') as FormControl<Ingredient | null>;
  }

  getGramsControl(index: number) {
    return this.ingredientsFormArray.at(index).get('grams') as FormControl<number | null>;
  }

  getStepControl(index: number) {
    return this.stepsFormArray.at(index) as FormControl<string | null>;
  }
}

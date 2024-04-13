import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course.enum';
import { Difficulty } from '../../models/difficulty.enum';
import { Country } from '../../models/country.enum';
import { UtilityService } from 'src/app/core/services/utility.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormModel } from 'src/app/core/models/form-model.type';
import { RecipePayload } from '../../models/recipe-payload.type';
import { Duration } from 'moment';
import { RecipeType } from '../../models/recipe-type.type';
import { RecipeService } from '../../services/recipe.service';
import { BaseReactiveForm } from 'src/app/core/models/base-reactive-form.class';

type FormArrayProperty = "ingredients" | "preparationSteps";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent extends BaseReactiveForm<RecipePayload>{
  private readonly utilityService = inject(UtilityService);

  readonly difficultyOptions = this.utilityService.getEnumAsArray(Difficulty) as string[];
  readonly courseOptions = this.utilityService.getEnumAsArray(Course) as string[];
  readonly countryOptions = this.utilityService.getEnumAsArray(Country) as string[];
  readonly recipeTypeOptions = this.utilityService.getEnumAsArray(RecipeType) as string[];

  readonly trashIcon = faTrash;
  readonly plusIcon = faPlus;

  readonly quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ]
  };

  protected form = new FormGroup<FormModel<RecipePayload>>({
    name: new FormControl<string>("", Validators.required),
    course: new FormControl<Course | null>(null, Validators.required),
    thumbnailImage: new FormControl<File | null>(null, Validators.required),
    difficulty: new FormControl<Difficulty | null>(null, Validators.required),
    cookingTime: new FormControl<Duration | null>(null, Validators.required),
    preparationTime: new FormControl<Duration | null>(null, Validators.required),
    servings: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    caloriesPerServing: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ingredients: new FormArray<FormGroup<{
      ingredient: FormControl<string | null>;
      grams: FormControl<number | null>;
    }>>([]),
    preparationSteps: new FormArray<FormControl<string | null>>([]),
    country: new FormControl<Country | null>(null, Validators.required),
    storage: new FormControl<string>("", Validators.required),
    tips: new FormControl<string>(""),
    recipeType: new FormControl<RecipeType | null>(null),
    isDairyFree: new FormControl<boolean>(false),
    isGlutenFree: new FormControl<boolean>(false)
  });

  constructor(private recipeService: RecipeService){
    super();
    this.addIngredient();
    this.addStep();

    this.form.controls.recipeType.valueChanges.subscribe(value => {
      const dairyFreeControl = this.form.controls.isDairyFree;

      if(value == RecipeType.VEGAN) {
        dairyFreeControl.reset();
        dairyFreeControl.disable();
      }
      else if(dairyFreeControl.disabled) dairyFreeControl.enable();
    });
  }

  addIngredient(): void {
    this.form.controls.ingredients.push(
      new FormGroup({
        ingredient: new FormControl<string | null>(null, Validators.required),
        grams: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
      })
    );
  }

  addStep(): void{
    this.form.controls.preparationSteps.push(new FormControl<string>("", [Validators.required, Validators.minLength(10)]));
  }

  removeFromFormArray(formArray: FormArrayProperty, index: number): void {
    if (this.form.controls[formArray].length > 1) this.form.controls[formArray].removeAt(index);
  }

  submit(): void{
    if(this.form.invalid) return;

    const recipe = this.form.value as Required<RecipePayload>;
    console.log(recipe)
    recipe.preparationTime.toISOString();
    recipe.cookingTime.toISOString();

    //this.recipeService.create(recipe).subscribe();
  }
}

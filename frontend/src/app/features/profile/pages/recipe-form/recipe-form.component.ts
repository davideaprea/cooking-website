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
import { SelectItem } from 'src/app/core/models/select-item.type';

type FormArrayProperty = "ingredients" | "preparationSteps";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent extends BaseReactiveForm<RecipePayload> {
  private readonly utilityService = inject(UtilityService);

  readonly difficultyOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Difficulty);
  readonly courseOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Course);
  readonly countryOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Country);
  readonly recipeTypeOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(RecipeType);

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
    storage: new FormControl<string>("", [Validators.required, Validators.minLength(30), Validators.maxLength(255)]),
    tips: new FormControl<string>("", [Validators.minLength(30), Validators.maxLength(255)]),
    recipeType: new FormControl<RecipeType | null>(null),
    isDairyFree: new FormControl<boolean>(false),
    isGlutenFree: new FormControl<boolean>(false)
  });

  constructor(private recipeService: RecipeService) {
    super();
    this.addIngredient();
    this.addStep();

    this.form.controls.recipeType.valueChanges.subscribe(value => {
      const dairyFreeControl = this.form.controls.isDairyFree;

      if (value == RecipeType.VEGAN) {
        dairyFreeControl.reset();
        dairyFreeControl.disable();
      }
      else if (dairyFreeControl.disabled) dairyFreeControl.enable();
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

  addStep(): void {
    this.form.controls.preparationSteps.push(new FormControl<string>("", [Validators.required, Validators.minLength(10), Validators.maxLength(400)]));
  }

  removeFromFormArray(formArray: FormArrayProperty, index: number): void {
    if (this.form.controls[formArray].length > 1) this.form.controls[formArray].removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) return;

    const recipe = this.form.value as Required<RecipePayload>;
    if (typeof recipe.preparationTime != "string") recipe.preparationTime = recipe.preparationTime.toISOString();
    if (typeof recipe.cookingTime != "string") recipe.cookingTime = recipe.cookingTime.toISOString();

    this.recipeService.create(recipe).subscribe(
      {
        next: () => {
          this.form.reset();
          this.form.controls.preparationSteps.clear();
          this.form.controls.ingredients.clear();
          this.addIngredient();
          this.addStep();
        }
      }
    );
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { Difficulty } from '../../models/difficulty';
import { Country } from '../../models/country';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  form = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    course: new FormControl<Course | undefined>(undefined, Validators.required),
    thumbnailImage: new FormControl<File | undefined>(undefined, Validators.required),
    difficulty: new FormControl<Difficulty | undefined>(undefined, Validators.required),
    cookingTime: new FormControl<Date | undefined>(undefined, Validators.required),
    preparationTime: new FormControl<Date | undefined>(undefined, Validators.required),
    servings: new FormControl<number | undefined>(undefined, Validators.required),
    caloriesPerServing: new FormControl<number | undefined>(undefined, Validators.required),
    country: new FormControl<Country | undefined>(undefined, Validators.required),
    storage: new FormControl<string>("", Validators.required),
    tips: new FormControl<string>("")
  });

  get nameControl() {
    return this.form.get('name') as FormControl<string>;
  }

  get courseControl() {
    return this.form.get('course') as FormControl<Course | undefined>;
  }

  get thumbnailImageControl() {
    return this.form.get('thumbnailImage') as FormControl<File | undefined>;
  }

  get difficultyControl() {
    return this.form.get('difficulty') as FormControl<Difficulty | undefined>;
  }

  get cookingTimeControl() {
    return this.form.get('cookingTime') as FormControl<Date | undefined>;
  }

  get preparationTimeControl() {
    return this.form.get('preparationTime') as FormControl<Date | undefined>;
  }

  get servingsControl() {
    return this.form.get('servings') as FormControl<number | undefined>;
  }

  get caloriesPerServingControl() {
    return this.form.get('caloriesPerServing') as FormControl<number | undefined>;
  }

  get countryControl() {
    return this.form.get('country') as FormControl<Country | undefined>;
  }

  get storageControl() {
    return this.form.get('storage') as FormControl<string>;
  }

  get tipsControl() {
    return this.form.get('tips') as FormControl<string>;
  }

}

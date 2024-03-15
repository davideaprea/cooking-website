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
}

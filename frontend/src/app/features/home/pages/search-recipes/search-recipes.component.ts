import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RecipeSearchDto } from '../../models/recipe-search-dto.type';
import { SearchOperation } from 'src/app/core/models/backend-dto/search-operation.type';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/features/profile/services/recipe.service';
import { RecipeResponse } from 'src/app/features/profile/models/recipe-response.type';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/core/models/select-item.type';
import { Course } from 'src/app/features/profile/models/course.enum';
import { Difficulty } from 'src/app/features/profile/models/difficulty.enum';
import { RecipeType } from 'src/app/features/profile/models/recipe-type.type';
import { UtilityService } from 'src/app/core/services/utility.service';
import { BaseReactiveForm } from 'src/app/core/models/base-reactive-form.class';
import { FormModel } from 'src/app/core/models/form-model.type';
import { Duration } from 'moment';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRecipesComponent implements BaseReactiveForm<RecipeSearchDto> {
  readonly difficultyOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Difficulty);
  readonly courseOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Course);
  readonly recipeTypeOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(RecipeType);

  form!: FormGroup<FormModel<RecipeSearchDto>>;

  openFilters: boolean = false;
  recipes: RecipeResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private changeDetectorRef: ChangeDetectorRef,
    private utilityService: UtilityService
  ) {
    const recipeName: string = route.snapshot.paramMap.get("name")!;

    this.form = new FormGroup<FormModel<RecipeSearchDto>>({
      cookingTime: new FormControl<Duration | null>(null),
      course: new FormControl<Course | null>(null),
      difficulty: new FormControl<Difficulty | null>(null),
      recipeType: new FormControl<RecipeType | null>(null),
      isDairyFree: new FormControl<boolean>(false),
      isGlutenFree: new FormControl<boolean>(false),
      name: new FormControl<string>(recipeName),
      preparationTime: new FormControl<Duration | null>(null)
    });

    this.submit();
  }

  submit(): void {
    this.recipeService.filter(this.form.value as Required<RecipeSearchDto>, { pageNumber: 0, pageSize: 10 }).subscribe(recipes => this.recipes = recipes.content);
  }
}

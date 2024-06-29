import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RecipeSearchDto } from '../../models/recipe-search-dto.type';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/features/profile/services/recipe.service';
import { RecipeResponse } from 'src/app/features/profile/models/recipe-response.type';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'src/app/core/models/select-item.type';
import { Course } from 'src/app/features/profile/models/course.enum';
import { Difficulty } from 'src/app/features/profile/models/difficulty.enum';
import { RecipeType } from 'src/app/features/profile/models/recipe-type.type';
import { UtilityService } from 'src/app/core/services/utility.service';
import { BaseReactiveForm } from 'src/app/core/models/base-reactive-form.class';
import { FormModel } from 'src/app/core/models/form-model.type';
import { Duration } from 'moment';
import { Subscription } from 'rxjs';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRecipesComponent implements BaseReactiveForm<RecipeSearchDto>, OnDestroy {
  readonly difficultyOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Difficulty);
  readonly courseOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(Course);
  readonly recipeTypeOptions: SelectItem[] = this.utilityService.getEnumAsSelectItems(RecipeType);
  readonly filterIcon = faFilter;

  readonly form: FormGroup<FormModel<RecipeSearchDto>> = new FormGroup<FormModel<RecipeSearchDto>>({
    cookingTime: new FormControl<Duration | null>(null),
    course: new FormControl<Course | null>(null),
    difficulty: new FormControl<Difficulty | null>(null),
    recipeType: new FormControl<RecipeType | null>(null),
    isDairyFree: new FormControl<boolean>(false),
    isGlutenFree: new FormControl<boolean>(false),
    name: new FormControl<string>(""),
    preparationTime: new FormControl<Duration | null>(null)
  });

  paramSubscription!: Subscription;

  openFilters: boolean = false;
  recipes: RecipeResponse[] = [];
  totalPages: number = 0;
  pageNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private changeDetectorRef: ChangeDetectorRef,
    private utilityService: UtilityService
  ) {
    this.paramSubscription = route.params.subscribe(param => {
      this.form.controls.name.setValue(param['name']);
      //this.submit();
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  onPageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    console.log(pageNumber);
  }

  submit(event?: SubmitEvent): void {
    event?.preventDefault();
    this.openFilters = false;
    this.recipeService.filter(this.form.value as Required<RecipeSearchDto>, { pageNumber: this.pageNumber, pageSize: 10 }).subscribe(page => {
      this.recipes = page.content;
      this.totalPages = page.totalPages;
      this.changeDetectorRef.markForCheck();
    });
  }
}

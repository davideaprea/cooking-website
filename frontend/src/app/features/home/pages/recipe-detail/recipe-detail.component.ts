import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBowlRice, faClock, faCow, faJarWheat, faSkull, faSpoon, faWheatAlt, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { RecipeResponse } from 'src/app/features/profile/models/recipe-response.type';
import { RecipeService } from 'src/app/features/profile/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {"class": "fluid-container-lg grid-row-flow-lg"}
})
export class RecipeDetailComponent {
  readonly wheatIcon = faWheatAwn;
  readonly cowIcon = faCow;
  readonly skullIcon = faSkull;
  readonly foodIcon = faBowlRice;
  readonly clockIcon = faClock;
  readonly spoonIcon = faSpoon;

  recipe!: RecipeResponse;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef) {
    const recipeId = Number(route.snapshot.paramMap.get("id"));
    recipeService.findById(recipeId).subscribe(recipe => {
      this.recipe = recipe;
      changeDetectorRef.markForCheck();
    });
  }
}

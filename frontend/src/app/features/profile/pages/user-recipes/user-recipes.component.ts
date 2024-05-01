import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RecipeResponse } from '../../models/recipe-response.type';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRecipesComponent {
  recipes: RecipeResponse[] = [];
  constructor(private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef) {
    recipeService.getRecipesPage({ pageNumber: 0, pageSize: 10 }).subscribe(recipePage => {
      this.recipes = recipePage.content;
      changeDetectorRef.markForCheck();
    });
  }
}

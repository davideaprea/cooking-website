import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeResponse } from 'src/app/features/profile/models/recipe-response.type';
import { RecipeService } from 'src/app/features/profile/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  recipe!: RecipeResponse;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    const recipeId = Number(route.snapshot.paramMap.get("id"));
    recipeService.findById(recipeId).subscribe(recipe => this.recipe = recipe);
  }
}

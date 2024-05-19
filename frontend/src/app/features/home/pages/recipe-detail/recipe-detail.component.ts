import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBowlRice, faClock, faCow, faCubesStacked, faPencil, faSkull, faSpoon, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/auth/models/role.enum';
import { User } from 'src/app/auth/models/user.type';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  readonly kcalIcon = faCubesStacked;
  readonly pencilIcon = faPencil;

  recipe!: RecipeResponse;
  user?: User;
  role = Role;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService) {
    const recipeId = Number(route.snapshot.paramMap.get("id"));
    recipeService.findById(recipeId).subscribe(recipe => {
      this.recipe = recipe;
      changeDetectorRef.markForCheck();
    });

    authService.user$.subscribe(user => this.user = user);
  }
}

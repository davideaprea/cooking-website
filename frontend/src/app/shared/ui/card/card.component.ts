import { ChangeDetectionStrategy, Component, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faBowlFood, faClock } from '@fortawesome/free-solid-svg-icons';
import { RecipeResponse } from 'src/app/features/profile/models/recipe-response.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  readonly router: Router = inject(Router);
  @Input({required: true}) recipe!: RecipeResponse;
  readonly clockIcon = faClock;
  readonly bowlIcon = faBowlFood;

  @HostListener('click')
  private goToRecipeDetail() {
    this.router.navigate(["/recipes", this.recipe.id]);
  }
}

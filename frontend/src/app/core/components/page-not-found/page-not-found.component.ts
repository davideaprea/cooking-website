import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  private readonly router: Router = inject(Router);
  private readonly location: Location = inject(Location);

  goToPrevious(): void {
    this.location.back();
  }

  goToHome(): void {
    this.router.navigate(["/home"]);
  }
}

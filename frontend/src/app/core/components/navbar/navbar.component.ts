import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/auth/models/user.type';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly searchIcon = faSearch;
  openModal: boolean = false;
  user: User | undefined = undefined;

  constructor(private authService: AuthService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    authService.user$.subscribe(user => {
      this.user = user;
      changeDetectorRef.markForCheck();
    });
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  searchRecipes(event: SubmitEvent, input: HTMLInputElement): void {
    event.preventDefault();
    if(input.value.length > 0) this.router.navigate(["/search", input.value]);
  }
}

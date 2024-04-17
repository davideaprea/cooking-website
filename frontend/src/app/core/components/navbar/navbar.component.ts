import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.type';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  openModal: boolean = false;
  user: User | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {
    authService.user$.subscribe(user => this.user = user);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}

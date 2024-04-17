import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faPlus, faUtensils, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/auth/models/role.enum';
import { User } from 'src/app/auth/models/user.type';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuLink } from 'src/app/core/models/menu-link.type';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileNavbarComponent {
  user!: User;

  menuLinks: MenuLink[] = [];

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.user = user!;
      this.menuLinks = [
        {
          tooltipText: "Create a new recipe",
          path: ['/profile', 'new-recipe'],
          icon: faPlus,
          canActivate: this.user.role == Role.CREATOR
        },
        {
          tooltipText: "Your recipes",
          path: [''],
          icon: faUtensils,
          canActivate: this.user.role == Role.CREATOR
        },
        {
          tooltipText: "Settings",
          path: [''],
          icon: faGear
        },
        {
          tooltipText: "Logout",
          callback: () => { this.authService.logout(); },
          icon: faArrowRightFromBracket,
          class: "logout-icon"
        }
      ];
    });
  }

  handleClick(link: MenuLink): void {
    if (link.callback) link.callback();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faPlus, faUtensils, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileNavbarComponent {
  readonly plusIcon = faPlus;
  readonly utensilsIcon = faUtensils;
  readonly gearIcon = faGear;
}

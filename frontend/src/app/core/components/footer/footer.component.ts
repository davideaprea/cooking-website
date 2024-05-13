import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly fbIcon = faFacebook;
  readonly instaIcon = faInstagram;
  readonly tikTokIcon = faTiktok;
  readonly ytIcon = faYoutube;

  readonly today = new Date();
}

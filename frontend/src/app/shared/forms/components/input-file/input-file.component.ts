import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { BaseFormInput } from '../../models/base-form-input';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent extends BaseFormInput<undefined | File> {
  @Input() accept: string = "";
  readonly cameraIcon = faCamera;
  host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  file: File | undefined = undefined;

  fileInput(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
    if(this.file.type.startsWith("image")) this.host.nativeElement.style.backgroundImage = `url("${URL.createObjectURL(this.file)}")`;
  }
}

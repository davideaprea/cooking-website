import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFileComponent,
      multi: true
    }
  ]
})
export class InputFileComponent extends DefaultValueAccessor {
  host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  renderer: Renderer2 = inject(Renderer2);

  @Input() accept: string = "";
  @Input() label?: string;
  @Input() id?: string;

  readonly cameraIcon = faCamera;

  fileInput(event: Event) {
    event.stopPropagation();
    const file = (event.target as HTMLInputElement).files![0];
    this.onChange(file);
    if (file.type.startsWith("image")) this.renderer.setStyle(this.host.nativeElement, "backgroundImage", `url("${URL.createObjectURL(file)}")`);
  }
}

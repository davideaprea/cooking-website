import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnChanges {
  @ViewChild("modal") private modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected markIcon = faXmark;

  ngOnChanges(): void {
    if (this.modal) {
      this.open ? this.openModal() : this.closeModal();
    }
  }

  closeModal() {
    this.open = false;
    this.openChange.emit(false);
    this.modal.nativeElement.close();
  }

  openModal() {
    this.open = true;
    this.openChange.emit(true);
    this.modal.nativeElement.showModal();
  }
}

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnChanges {
  @ViewChild("modal") private modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) openModal: boolean = false;

  ngOnChanges(): void {
    if (this.modal) {
      const modal = this.modal.nativeElement;
      this.openModal ? modal.showModal() : modal.close();
    }
  }
}

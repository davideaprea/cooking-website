import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnChanges {
  readonly leftArrow = faChevronLeft;
  readonly rightArrow = faChevronRight;

  @Output() private pageNumberChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() pageNumber: number = 0;
  @Input({ required: true }) totalPages: number = 0;

  leftEdge: number[] = []
  middle: number[] = [];
  rightEdge: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const totPages: number | undefined = changes["totalPages"]?.currentValue;

    if (!totPages) return;

    this.totalPages = totPages;

    this.leftEdge = Array.from({ length: Math.min(totPages, 10) }, (_, i) => i);

    if (totPages > 10) {
      this.rightEdge = [];
      for (let i = totPages - 10; i < totPages; i++) this.rightEdge.push(i);
    }
  }

  goTo(page: number): void {
    this.pageNumberChange.emit(this.pageNumber = page);
    this.renderMiddlePages();
  }

  goToPrevious(): void {
    this.pageNumberChange.emit(--this.pageNumber);
    this.renderMiddlePages();
  }

  goToNext(): void {
    this.pageNumberChange.emit(++this.pageNumber);
    this.renderMiddlePages();
  }

  private renderMiddlePages(): void {
    if (
      this.pageNumber < 10 &&
      this.pageNumber >= this.totalPages - 11
    ) return;

    this.middle = [];
    for (let page = this.pageNumber - 2; page < this.pageNumber + 3; page++) {
      this.middle.push(page);
    }
  }
}

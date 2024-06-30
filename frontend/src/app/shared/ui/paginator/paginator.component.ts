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

  pages: number[] = []

  ngOnChanges(changes: SimpleChanges): void {
    const totPages: number | undefined = changes["totalPages"]?.currentValue;
    const pageNumber: number | undefined = changes["pageNumber"]?.currentValue;

    if (totPages) this.totalPages = totPages;
    if(pageNumber) this.pageNumber = pageNumber;

    this.renderPages();
  }

  goTo(page: number): void {
    this.pageNumberChange.emit(this.pageNumber = page);
    this.renderPages();
  }

  goToPrevious(): void {
    this.pageNumberChange.emit(--this.pageNumber);
    this.renderPages();
  }

  goToNext(): void {
    this.pageNumberChange.emit(++this.pageNumber);
    this.renderPages();
  }

  private renderPages(): void {
    this.pages = [];
    if (this.pageNumber >= 10 && this.pageNumber <= this.totalPages - 11) {
      for (let page = this.pageNumber - 2; page < this.pageNumber + 3; page++) {
        this.pages.push(page);
      }
    }
    else if (this.pageNumber < 10) {
      this.pages = Array.from({ length: Math.min(this.totalPages, 10) }, (_, i) => i);
    }
    else {
      for (let i = this.totalPages - 10; i < this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }
}

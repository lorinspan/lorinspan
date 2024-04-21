import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Picture } from '../../model/picture';
import { PicturesService } from '../../services/pictures-service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent implements OnInit, OnDestroy {
  numberOfColumns = 1;
  allPictures: Picture[] = [];
  visiblePictures: Picture[] = [];
  columns: Picture[][] = [];
  initialBatchLoadSize = 5;
  loadInterval: number = 250;
  intervalIncrement = 250;
  intervalId: number | null = null;

  private resizeSubject = new Subject<void>();
  private resizeSubscription: Subscription = new Subscription();

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }

  ngOnInit(): void {
    this.resizeSubscription = this.resizeSubject
      .pipe(debounceTime(200))
      .subscribe(() => this.recalculateLayout());

    this.picturesService.getPictures().subscribe((pictures) => {
      this.allPictures = pictures;
      this.visiblePictures = pictures.slice(0, this.initialBatchLoadSize);

      this.recalculateLayout();

      this.startLoadInterval();
    });
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.resizeSubject.next(); // Trigger recalculation
  }

  private recalculateLayout() {
    this.calculateColumns();
    this.resetColumns();
    this.cd.detectChanges(); // Trigger change detection to avoid layout jitter
  }

  private calculateColumns() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.numberOfColumns = 5;
    } else if (
      window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches
    ) {
      this.numberOfColumns = 3;
    } else {
      this.numberOfColumns = 1;
    }
  }

  private resetColumns() {
    this.columns = Array.from({ length: this.numberOfColumns }, () => []);
    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % this.numberOfColumns;
      this.columns[colIndex].push(picture); // Assign to correct column
    });
  }

  startLoadInterval() {
    this.stopLoadInterval(); // Clear previous interval if any
    this.intervalId = window.setInterval(() => {
      this.loadMorePictures();
    }, this.loadInterval);
  }

  stopLoadInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadMorePictures() {
    const currentLength = this.visiblePictures.length;
    const newBatch = this.allPictures.slice(
      currentLength,
      currentLength + this.initialBatchLoadSize
    );
    this.visiblePictures.push(...newBatch);

    this.resetColumns(); // Update columns with new pictures
    this.loadInterval += this.intervalIncrement; // Increment load interval
    this.startLoadInterval(); // Reset interval with updated delay
  }

  ngOnDestroy() {
    this.stopLoadInterval(); // Clean up interval on destroy
    this.resizeSubscription.unsubscribe(); // Unsubscribe from resize subject
  }
}

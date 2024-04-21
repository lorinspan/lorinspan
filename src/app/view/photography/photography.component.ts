import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  currentLoadInterval = 250;
  baseIncrement = 250;
  intervalIncrementFactor = 50;
  currentIncrement = this.baseIncrement;
  intervalId: number | null = null;

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }

  ngOnInit(): void {
    this.calculateColumns();
    this.picturesService.getPictures().subscribe((pictures) => {
      this.allPictures = pictures;
      this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);

      this.loadingService.setLoading(true);
      this.generatePictures();

      this.setLoadInterval();
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const previousNumberOfColumns = this.numberOfColumns;
    this.calculateColumns();

    if (previousNumberOfColumns !== this.numberOfColumns) {
      this.generatePictures(); // Recalculate the columns
    }
  }

  setLoadInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      this.loadMorePictures();
    }, this.currentLoadInterval);
  }

  loadMorePictures() {
    const currentLength = this.visiblePictures.length;
    const newBatchSize = this.initialBatchLoadSize;
    const endIndex = Math.min(currentLength + newBatchSize, this.allPictures.length);

    const newBatch = this.allPictures.slice(currentLength, endIndex);
    this.visiblePictures = [...this.visiblePictures, ...newBatch];

    this.generatePictures();

    this.currentLoadInterval += this.currentIncrement;
    this.currentIncrement += this.intervalIncrementFactor;

    this.setLoadInterval(); // Reset with updated interval
  }

  calculateColumns() {
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

  generatePictures() {
    const numColumns = this.numberOfColumns;
    this.columns = Array.from({ length: numColumns }, () => []);

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % numColumns;
      this.columns[colIndex].push(picture);
    });

    this.loadingService.setLoading(false);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

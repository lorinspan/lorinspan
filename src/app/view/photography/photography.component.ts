import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Picture } from '../../model/picture';
import { PicturesService } from '../../services/pictures-service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading-service';
import {PicturesStateService} from "../../services/pictures-state-service";

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
    public loadingService: LoadingService,
    private picturesStateService: PicturesStateService // Inject the state service
  ) {}

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }

  ngOnInit(): void {
    this.calculateColumns();

    const loadedPictures = this.picturesStateService.getLoadedPictures();
    const remainingPictures = this.picturesStateService.getRemainingPictures();

    if (loadedPictures.length > 0) {
      this.allPictures = [...loadedPictures, ...remainingPictures];
      this.visiblePictures = loadedPictures;
      this.loadingService.setLoading(false);
      this.generatePictures();
      this.setLoadInterval(); // Start the interval again with the appropriate interval
    } else {
      this.picturesService.getPictures().subscribe((pictures) => {
        this.allPictures = pictures;
        this.setBatchAndInterval();

        this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);

        this.loadingService.setLoading(true);
        this.generatePictures();

        this.setLoadInterval(); // Start the load interval with the updated time
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const previousNumberOfColumns = this.numberOfColumns;
    this.calculateColumns();

    if (previousNumberOfColumns !== this.numberOfColumns) {
      this.setBatchAndInterval(); // Update batch size and interval based on columns
      this.generatePictures(); // Recalculate the columns
    }
  }

  setBatchAndInterval() {
    if (this.numberOfColumns === 1) {
      this.initialBatchLoadSize = 2; // Smaller batches for smaller screens
      this.currentLoadInterval = 150; // Faster intervals
      this.intervalIncrementFactor = 25;
    } else if (this.numberOfColumns === 5) {
      this.initialBatchLoadSize = 5; // Larger batches for larger screens
      this.currentLoadInterval = 250; // Default interval for larger screens
      this.intervalIncrementFactor = 100;
    } else {
      this.initialBatchLoadSize = 3; // Larger batches for larger screens
      this.currentLoadInterval = 200; // Default interval for larger screens
      this.intervalIncrementFactor = 75;
    }

    this.currentIncrement = this.baseIncrement; // Reset current increment to the base
  }

  setLoadInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear any existing interval
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

    // Increment the load interval with the current increment
    this.currentLoadInterval += this.currentIncrement;

    let maxInterval: number;
    if (this.numberOfColumns === 1) {
      maxInterval = 1000; // Cap at 1000ms for one column
    } else if (this.numberOfColumns === 3) {
      maxInterval = 1350; // Cap at 1350ms for three columns
    } else {
      maxInterval = 1750; // Cap at 1750ms for five columns
    }

    this.currentLoadInterval = Math.min(this.currentLoadInterval, maxInterval);

    this.setLoadInterval(); // Reset the interval with the updated load interval
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
    this.columns = Array.from({ length: numColumns }, () => []); // Reset columns

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % numColumns;
      this.columns[colIndex].push(picture); // Push into the correct column
    });

    this.loadingService.setLoading(false); // Loading complete
  }

  trackByPictureId(index: number, picture: Picture): number {
    return picture.id; // Unique identifier for tracking
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId); // Clear any existing interval
    }

    const remainingPictures = this.allPictures.slice(this.visiblePictures.length);

    this.picturesStateService.saveState(
      this.visiblePictures,
      remainingPictures
    ); // Save the current state
  }
}

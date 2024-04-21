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
  initialBatchLoadSize = 7; // Start with 7 for the first batch
  batchCount = 0; // To track the number of batches loaded
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
    console.log("oninit");
      this.allPictures = pictures;
      this.setBatchAndInterval();
      this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);
      this.loadingService.setLoading(true);
      this.generatePictures();
      this.setLoadInterval(); // Start the load interval with the updated time
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    console.log("resize");
    const previousNumberOfColumns = this.numberOfColumns;
    this.calculateColumns();

    if (previousNumberOfColumns !== this.numberOfColumns) {
      this.setBatchAndInterval(); // Update batch size and interval based on columns
      this.generatePictures(); // Recalculate the columns
    }
  }

  setBatchAndInterval() {
    console.log("batchandinterval");
    if (this.numberOfColumns === 1) {
      this.initialBatchLoadSize = 7; // Start with 7 for the first batch
      this.currentLoadInterval = 250; // Faster intervals
      this.intervalIncrementFactor = 10;
    } else {
      this.initialBatchLoadSize = 5; // Larger batches for larger screens
      this.currentLoadInterval = 250; // Default interval for larger screens
      this.intervalIncrementFactor = 50;
    }

    this.currentIncrement = this.baseIncrement; // Reset current increment to the base
  }

  setLoadInterval() {
    console.log("loadinterval");
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear any existing interval
    }

    if (this.visiblePictures.length < this.allPictures.length) {
      this.intervalId = window.setInterval(() => {
        this.loadMorePictures();
      }, this.currentLoadInterval);
    }
  }

  loadMorePictures() {
    console.log("loadmorepictures");
    const currentLength = this.visiblePictures.length;

    // If we've reached or surpassed the total number of pictures, stop loading
    if (currentLength >= this.allPictures.length) {
      if (this.intervalId) {
        clearInterval(this.intervalId); // Stop the interval
      }
      return; // Nothing else to load
    }

    // Determine batch size based on the batch count
    let newBatchSize;
    if (this.batchCount === 0) {
      newBatchSize = 3; // Second batch size is 3
    } else {
      newBatchSize = 2; // All subsequent batches are 2
    }

    const endIndex = Math.min(currentLength + newBatchSize, this.allPictures.length);

    const newBatch = this.allPictures.slice(currentLength, endIndex);
    this.visiblePictures = [...this.visiblePictures, ...newBatch];

    this.generatePictures();

    this.batchCount++; // Increment the batch count

    // Adjust the interval time
    this.currentLoadInterval += this.currentIncrement;
    if (this.currentLoadInterval > 1000) {
      this.currentLoadInterval = 1000; // Cap at one second
    }

    this.currentIncrement += this.intervalIncrementFactor;

    this.setLoadInterval(); // Reset with updated interval if needed
  }

  calculateColumns() {
    console.log("calculatecolumns");
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
    console.log("generatepictures");
    const numColumns = this.numberOfColumns;
    this.columns = Array.from({ length: numColumns }, () => []); // Reset columns

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % numColumns; // Determine the correct column
      this.columns[colIndex].push(picture); // Insert the picture into the correct column
    });

    this.loadingService.setLoading(false); // Loading complete
  }

  ngOnDestroy() {
    console.log("destroy");
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

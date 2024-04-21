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
  // Columns information
  numberOfColumns = 1;
  columns: Picture[][] = [];

  // Picture data
  allPictures: Picture[] = [];
  visiblePictures: Picture[] = [];

  // Batch and Interval information
  initialBatchLoadSize = 5; // Default batch size for initial load
  loadInterval = 250; // Default interval for loading more pictures
  intervalId: number = 0;

  constructor(
    private picturesService: PicturesService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true); // Start loading indicator

    this.measureInternetSpeed().then((speed) => {
      this.adjustParametersBasedOnSpeed(speed); // Adjust based on internet speed

      this.calculateColumns(); // Determine initial number of columns
      this.picturesService.getPictures().subscribe((pictures) => {
        this.allPictures = pictures;

        this.loadInitialPictures(); // Load initial batch of pictures
        this.setLoadInterval(); // Start the interval to load more pictures
      });
    });
  }

  // Measure internet speed by downloading a known-size resource and calculating speed
  measureInternetSpeed(): Promise<number> {
    const testImageUrl = '/assets/pictures/stefania-ionescu-leu-c-min.jpg'; // Path to the test image
    const testFileSize = 50000; // Size of the test image in bytes (change as needed)

    const start = performance.now(); // Start time
    return fetch(testImageUrl).then(() => {
      const end = performance.now(); // End time
      const timeTaken = end - start; // Time taken in milliseconds
      const speedInMbps = (testFileSize * 8) / (timeTaken / 1000) / 1_000_000; // Convert to Mbps
      return speedInMbps;
    });
  }


  // Adjust batch load size and interval based on internet speed
  adjustParametersBasedOnSpeed(speed: number) {
    console.log(speed)
    if (speed < 1) {
      // Slow connection
      this.initialBatchLoadSize = 2;
      this.loadInterval = 500;
    } else if (speed < 5) {
      // Medium connection
      this.initialBatchLoadSize = 5;
      this.loadInterval = 250;
    } else {
      // Fast connection
      this.initialBatchLoadSize = 10;
      this.loadInterval = 100;
    }
  }

  // Load initial batch of pictures and set them to visible
  loadInitialPictures() {
    const initialBatch = this.allPictures.slice(0, this.initialBatchLoadSize);
    this.visiblePictures = initialBatch;
    this.recalculateColumns();
  }

  // Set an interval to load more pictures periodically
  setLoadInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear any existing interval
    }

    if (this.visiblePictures.length < this.allPictures.length) {
      this.intervalId = window.setInterval(() => {
        this.loadMorePictures();
      }, this.loadInterval);
    } else {
      this.loadingService.setLoading(false); // All batches loaded, stop loading indicator
    }
  }

  // Determine the number of columns based on screen width
  calculateColumns() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.numberOfColumns = 5;
    } else if (window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches) {
      this.numberOfColumns = 3;
    } else {
      this.numberOfColumns = 1;
    }
  }

  // Load more pictures and adjust the batch size and interval incrementally
  loadMorePictures() {
    const currentLength = this.visiblePictures.length;

    if (currentLength >= this.allPictures.length) {
      clearInterval(this.intervalId); // Stop loading when all pictures are visible
      this.loadingService.setLoading(false); // Loading is complete
      return;
    }

    const batchSize = Math.min(3, this.allPictures.length - currentLength); // New batch size
    const newPictures = this.allPictures.slice(currentLength, currentLength + batchSize);
    this.visiblePictures.push(...newPictures);

    this.recalculateColumns(); // Redistribute the columns

    this.loadInterval = Math.min(1000, this.loadInterval + 50); // Increment the interval
    this.setLoadInterval(); // Reset the interval with the updated time
  }

  // Redistribute the visible pictures among the correct number of columns
  recalculateColumns() {
    this.columns = Array.from({ length: this.numberOfColumns }, () => []);

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % this.numberOfColumns;
      this.columns[colIndex].push(picture);
    });
  }

  // Navigate to the specific picture's detail page
  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }

  // Clear the interval upon component destruction
  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

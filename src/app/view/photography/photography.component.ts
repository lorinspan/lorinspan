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
  intervalId: number = 0;

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
    const previousColumns = this.numberOfColumns;
    this.calculateColumns(); // Update the number of columns based on window size

    if (previousColumns !== this.numberOfColumns) {
      this.setBatchAndInterval(); // Update batch and interval if column count changes
      this.generatePictures(); // Recalculate columns
    }
  }


  setBatchAndInterval() {
    console.log("batchandinterval");
    if (this.numberOfColumns === 1) {
      this.initialBatchLoadSize = 7; // Start with 7 for the first batch
      this.currentLoadInterval = 250; // Faster intervals
      this.intervalIncrementFactor = 35;
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
    const currentLength = this.visiblePictures.length;

    // Stop if we've loaded all pictures
    if (currentLength >= this.allPictures.length) {
      clearInterval(this.intervalId);
      return;
    }

    // Determine new batch size
    const newBatchSize = this.batchCount === 0 ? 3 : 2;
    const endIndex = Math.min(currentLength + newBatchSize, this.allPictures.length);

    const newBatch = this.allPictures.slice(currentLength, endIndex);
    this.visiblePictures.push(...newBatch); // Append new batch
    this.generatePictures(); // Recalculate columns with new data

    this.batchCount++;
    this.setLoadInterval(); // Update interval timing
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
    const numColumns = this.numberOfColumns;

    // Reset columns based on the number of columns
    const newColumns: Picture[][] = Array.from({ length: numColumns }, () => []);

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % numColumns; // Calculate column index
      newColumns[colIndex].push(picture);
    });

    this.columns = newColumns; // Assign new columns
    this.loadingService.setLoading(false); // Indicate loading completion
  }


  ngOnDestroy() {
    console.log("destroy");
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

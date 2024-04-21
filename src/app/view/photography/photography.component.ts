import { Component, OnInit, OnDestroy } from '@angular/core';
import { Picture } from '../../model/picture';
import { PicturesService } from '../../services/pictures-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {LoadingService} from "../../services/loading-service";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent implements OnInit, OnDestroy {
  numberOfColumns: number = 1;
  allPictures: Picture[] = []; // All pictures available from the service
  visiblePictures: Picture[] = []; // Pictures currently being displayed
  columns: Picture[][] = []; // Columnized pictures
  initialBatchLoadSize = 5; // Number of pictures to load at a time
  currentLoadInterval = 250; // Initial interval in milliseconds for lazy loading
  baseIncrement = 250; // Base increment amount
  intervalIncrementFactor = 50; // Additional increment factor
  currentIncrement = this.baseIncrement; // Start with the base increment
  intervalId: number | null = null; // ID for setInterval

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

      // Load the first batch
      this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);
      this.loadingService.setLoading(true);
      this.generatePictures();

      // Start loading more pictures incrementally
      this.setLoadInterval();
    });
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

    // Append the new batch to the visiblePictures
    const newBatch = this.allPictures.slice(currentLength, endIndex);
    this.visiblePictures = [...this.visiblePictures, ...newBatch]; // Concatenating arrays

    // Regenerate the columns with updated visiblePictures
    this.generatePictures();

    // Update the interval based on the current increment
    this.currentLoadInterval += this.currentIncrement;

    // Adjust the increment for the next increase
    this.currentIncrement += this.intervalIncrementFactor;

    // Reset the interval with the updated load interval
    this.setLoadInterval();
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

    // Reset columns
    this.columns = Array.from({ length: numColumns }, () => []);

    // Fill the columns with the staggered pattern
    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % numColumns; // Determine which column to insert into
      this.columns[colIndex].push(picture); // Push the picture into the correct column
    });

    this.loadingService.setLoading(false);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

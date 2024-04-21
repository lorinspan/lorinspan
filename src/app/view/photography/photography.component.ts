import {Component, OnInit, OnDestroy, HostListener, ElementRef, QueryList, ViewChildren} from '@angular/core';
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
  @ViewChildren('picture') pictureElements!: QueryList<ElementRef<HTMLImageElement>>;
  visiblePicturesIndex = 0;
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
  private observer!: IntersectionObserver;

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

      this.setBatchAndInterval();
      this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);

      this.loadingService.setLoading(true);
      this.generatePictures();
      this.setLoadInterval();
    });

    this.setupObserver(); // Set up the observer to track which picture is in view
  }

// Create an IntersectionObserver and track visible pictures
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nativeElement = entry.target as HTMLImageElement; // Explicitly cast to HTMLImageElement
          const elementArray = this.pictureElements.map((elementRef) => elementRef.nativeElement); // Get native elements

          const index = elementArray.indexOf(nativeElement); // Find index of the current element
          if (index >= 0) {
            this.visiblePicturesIndex = index; // Set the current visible picture index
          }
        }
      });
    }, { threshold: 0.5 });

    // Observe each picture element
    this.pictureElements.forEach((element) => this.observer.observe(element.nativeElement));
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
    // Current implementation with addition of re-anchoring based on the visible picture
    const currentLength = this.visiblePictures.length;

    if (currentLength >= this.allPictures.length) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      return;
    }

    let newBatchSize;
    if (this.batchCount === 0) {
      newBatchSize = 3;
    } else {
      newBatchSize = 2;
    }

    const endIndex = Math.min(currentLength + newBatchSize, this.allPictures.length);
    const newBatch = this.allPictures.slice(currentLength, endIndex);

    this.visiblePictures = [...this.visiblePictures, ...newBatch];

    this.generatePictures();

    // Re-anchoring the scroll to the currently visible picture
    const visiblePictureElement = this.pictureElements.toArray()[this.visiblePicturesIndex];
    if (visiblePictureElement) {
      visiblePictureElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.batchCount++; // Increment the batch count

    this.currentLoadInterval += this.currentIncrement;
    if (this.currentLoadInterval > 1000) {
      this.currentLoadInterval = 1000;
    }

    this.currentIncrement += this.intervalIncrementFactor;

    this.setLoadInterval();
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
    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

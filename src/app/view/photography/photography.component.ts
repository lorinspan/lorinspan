import { Component, OnInit, OnDestroy, HostListener, NgZone } from '@angular/core';
import { Picture } from '../../model/picture';
import { PicturesService } from '../../services/pictures-service';
import {NavigationStart, Router} from '@angular/router';
import { LoadingService } from '../../services/loading-service';
import {PicturesStateService} from "../../services/pictures-state-service";
import {Subscription} from "rxjs";

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
  initialBatchLoadSize = 7;
  currentLoadInterval = 250;
  baseIncrement = 250;
  intervalIncrementFactor = 50;
  batchCount = 0;
  intervalId: number | null = null;
  routerSubscription: Subscription | null = null; // To track router navigation events
  isLoadingMore = false;

  constructor(
    private readonly picturesService: PicturesService,
    private readonly picturesStateService: PicturesStateService,
    private router: Router,
    public loadingService: LoadingService,
    private zone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.restoreStateOrLoadInitial();

    this.calculateColumns();
    this.setBatchAndInterval();

    if (this.visiblePictures.length === 0) {
      this.loadInitialPictures();
    } else {
      this.generatePictures();
      this.setLoadInterval();
    }

    // Listen for navigation events to clear state if necessary
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url !== '/photography') {
        this.picturesStateService.clearState(); // Clear state when navigating away
      }
    });
  }

  restoreStateOrLoadInitial(): void {
    const loadedPictures = this.picturesStateService.getLoadedPictures();
    const remainingPictures = this.picturesStateService.getRemainingPictures();

    if (loadedPictures.length > 0 || remainingPictures.length > 0) {
      this.visiblePictures = loadedPictures;
      this.allPictures = [...loadedPictures, ...remainingPictures];
    }
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]); // Navigate to a specific picture
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const previousNumberOfColumns = this.numberOfColumns;
    this.calculateColumns(); // Recalculate columns on window resize

    if (previousNumberOfColumns !== this.numberOfColumns) {
      this.setBatchAndInterval(); // Adjust batch size and intervals
      this.generatePictures(); // Recreate columns if needed
    }
  }

  calculateColumns() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.numberOfColumns = 5; // For larger screens, use five columns
    } else if (
      window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches
    ) {
      this.numberOfColumns = 3; // For medium-sized screens, use three columns
    } else {
      this.numberOfColumns = 1; // For smaller screens, use one column
    }

    this.setBatchAndInterval(); // Update batch size and interval accordingly
  }

  setBatchAndInterval() {
    if (this.numberOfColumns === 5) {
      this.initialBatchLoadSize = 5; // Initial batch for 5 columns
      this.currentLoadInterval = 250; // Starting interval
      this.intervalIncrementFactor = this.baseIncrement; // Use the base increment
    } else if (this.numberOfColumns === 3) {
      this.initialBatchLoadSize = 6; // Initial batch for 3 columns
      this.currentLoadInterval = 250; // Default interval for 3 columns
      this.intervalIncrementFactor = this.baseIncrement; // Use base increment
    } else {
      this.initialBatchLoadSize = 7; // Initial batch for smaller screens
      this.currentLoadInterval = 250; // Faster intervals for 1 column
      this.intervalIncrementFactor = 25; // Smaller increment factor
    }
  }

  loadInitialPictures() {
    this.picturesService.getPictures().subscribe((pictures) => {
      this.allPictures = pictures;

      if (this.visiblePictures.length === 0) {
        this.visiblePictures = this.allPictures.slice(0, this.initialBatchLoadSize);
      }

      this.loadingService.setLoading(true);
      this.generatePictures();
      this.setLoadInterval();
    });
  }

  setLoadInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear existing interval if any
    }

    this.intervalId = window.setInterval(() => {
      this.zone.run(() => this.loadMorePictures()); // Ensure code runs in Angular zone
    }, this.currentLoadInterval); // Adjusted interval
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isLoadingMore) {
      return; // Prevent multiple triggers during loading
    }

    const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

    if (bottomReached) {
      this.loadMorePictures(); // Load more when bottom is reached
    }
  }

  loadMorePictures() {
    this.isLoadingMore = true;

    const currentLength = this.visiblePictures.length;
    const newBatchSize = this.numberOfColumns === 1 ? 2 : this.numberOfColumns;

    const newPictures = this.allPictures.slice(
      currentLength,
      currentLength + newBatchSize
    );

    // Use Angular's ChangeDetectorRef to avoid unnecessary change detection cycles
    this.visiblePictures.push(...newPictures);

    this.generatePictures(); // Re-render columns after batch update

    setTimeout(() => {
      this.isLoadingMore = false;
    }, 500); // Adjust delay if needed
  }


  adjustLoadInterval() {
    this.currentLoadInterval += this.baseIncrement; // Use base increment for adjustments
    if (this.currentLoadInterval > 1750) {
      this.currentLoadInterval = 1750; // Cap interval at 1750 ms
    }

    this.setLoadInterval(); // Reset with updated interval
  }

  generatePictures() {
    this.columns = Array.from({length: this.numberOfColumns}, () => []);

    this.visiblePictures.forEach((picture, index) => {
      const colIndex = index % this.numberOfColumns; // Determine correct column
      this.columns[colIndex].push(picture); // Add picture to appropriate column
    });

    this.loadingService.setLoading(false); // Indicate loading completion
  }

  trackByPictureId(index: number, picture: Picture): number {
    return picture.id; // Unique identifier for tracking
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const loadedPictures = this.visiblePictures;
    const remainingPictures = this.allPictures.slice(loadedPictures.length);
    this.picturesStateService.saveState(loadedPictures, remainingPictures);

    // Unsubscribe from router events
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

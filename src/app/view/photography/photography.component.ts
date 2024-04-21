import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { PicturesService } from '../../services/pictures-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent implements OnInit, AfterViewInit {
  pictures: any[] = [];
  reorderedPictures: any[] = [];
  currentColumnCount: number;

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router
  ) {
    // Initialize to avoid undefined reference issues
    this.currentColumnCount = this.detectColumnCount();
  }

  ngOnInit(): void {
    this.picturesService.getPictures().subscribe((pictures) => {
      this.pictures = pictures;
    });
  }

  ngAfterViewInit(): void {
    this.reorderPicturesBasedOnColumns(); // Reorder based on initial conditions
  }

  @HostListener('window:resize')
  onResize() {
    const newColumnCount = this.detectColumnCount(); // Detect current column count

    if (this.currentColumnCount !== newColumnCount) {
      this.currentColumnCount = newColumnCount; // Update current column count
      this.reorderPicturesBasedOnColumns();   // Reorder if column count has changed
    }
  }

  detectColumnCount(): number {
    // Check the width and return the expected column count
    const mediumScreen = window.matchMedia('(min-width: 769px) and (max-width: 992px)'); // 3 columns
    const largeScreen = window.matchMedia('(min-width: 993px)'); // 5 columns

    if (largeScreen.matches) {
      return 5; // 5 columns for large screens
    } else if (mediumScreen.matches) {
      return 3; // 3 columns for medium screens
    } else {
      return 1; // Default or fallback for smaller screens
    }
  }

  reorderPicturesBasedOnColumns() {
    const columnCount = this.currentColumnCount;

    if (isNaN(columnCount) || columnCount < 1) {
      this.reorderedPictures = [...this.pictures];
    } else {
      this.reorderedPictures = this.rearrangePictures(this.pictures, columnCount);
    }
  }

  rearrangePictures(pictures: any[], columns: number): any[] {
    const result: any[] = [];
    const rows = Math.ceil(pictures.length / columns);

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        const index = col + row * columns;
        if (index < pictures.length) {
          result.push(pictures[index]);
        }
      }
    }

    return result;
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }
}

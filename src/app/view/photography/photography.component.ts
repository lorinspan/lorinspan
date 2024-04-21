import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from '../../services/pictures-service';
import { ImageCacheService } from "../../services/image-cache-service";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent implements OnInit {
  pictures: any[] = [];
  reorderedPictures: any[] = [];
  currentColumnCount: number;

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router,
    private imageCacheService: ImageCacheService // Inject the image cache service
  ) {
    this.currentColumnCount = this.detectColumnCount();
  }

  ngOnInit(): void {
    this.picturesService.getPictures().subscribe((pictures) => {
      this.pictures = pictures;
      this.reorderPicturesBasedOnColumns();
    });
  }

  @HostListener('window:resize')
  onResize() {
    const newColumnCount = this.detectColumnCount();
    if (this.currentColumnCount !== newColumnCount) {
      this.currentColumnCount = newColumnCount;
      this.reorderPicturesBasedOnColumns();
    }
  }

  detectColumnCount(): number {
    const mediumScreen = window.matchMedia('(min-width: 769px) and (max-width: 992px)');
    const largeScreen = window.matchMedia('(min-width: 993px)');

    if (largeScreen.matches) {
      return 5;
    } else if (mediumScreen.matches) {
      return 3;
    } else {
      return 1;
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

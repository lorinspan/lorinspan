import { Component, HostListener, OnInit } from '@angular/core';
import { Picture } from "../../model/picture";
import { PicturesService } from "../../services/pictures-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})
export class PhotographyComponent implements OnInit {
  numberOfColumns: number = 1;
  pictures: Picture[];
  columns: Picture[][];

  constructor(private readonly picturesService: PicturesService, private router: Router) {
    this.columns = [];
    this.pictures = [];
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }

  ngOnInit(): void {
    this.calculateColumns();
    this.picturesService.getPictures().subscribe(pictures => {
      this.pictures = pictures;
      this.preloadImages(this.pictures);
      this.generatePictures();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateColumns();
    this.generatePictures();
  }

  calculateColumns() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.numberOfColumns = 5;
    } else if (window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches) {
      this.numberOfColumns = 3;
    } else {
      this.numberOfColumns = 1;
    }
  }

  preloadImages(pictures: Picture[]) {
    pictures.forEach(picture => {
      const img = new Image();
      img.src = picture.src;
    });
  }

  generatePictures() {
    const numPictures = this.pictures.length;
    const numColumns = this.numberOfColumns;

    // Create a promise array to track image loading
    const loadingPromises: Promise<void>[] = [];

    // Reset columns
    this.columns = [];

    // Iterate over pictures to preload images and track loading
    this.pictures.forEach((picture, index) => {
      const img = new Image();
      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          resolve();
        };
      });
      img.src = picture.src;
      loadingPromises.push(promise);
    });

    // Once all images are loaded, generate columns
    Promise.all(loadingPromises).then(() => {
      const picturesPerColumn = Math.floor(numPictures / numColumns);
      const columnsWithExtra = numPictures % numColumns;
      let pictureIndex = 0;

      for (let colIndex = 0; colIndex < numColumns; colIndex++) {
        let columnPictures = picturesPerColumn;
        if (colIndex < columnsWithExtra) {
          columnPictures++;
        }
        this.columns[colIndex] = [];
        for (let j = 0; j < columnPictures; j++) {
          this.columns[colIndex].push(this.pictures[pictureIndex]);
          pictureIndex++;
        }
      }
    });
  }

}

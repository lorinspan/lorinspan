import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Picture } from "../../model/picture";
import { PicturesService } from "../../services/pictures-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})
export class PhotographyComponent implements OnInit, AfterViewInit {
  numberOfColumns: number = 1;
  pictures: Picture[];
  columns: Picture[][];

  @ViewChild('container') container!: ElementRef;
  @ViewChildren('imageContainer') imageContainers!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  constructor(private readonly picturesService: PicturesService, private router: Router, private renderer: Renderer2) {
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

  ngAfterViewInit(): void {
    // Set up Intersection Observer
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target.querySelector('.picture') as HTMLImageElement;
          if (image && !image.src) {
            const src = image.getAttribute('data-src');
            if (src) {
              image.src = src;
            }
          }
          observer.unobserve(entry.target);
        }
      });
    });

    // Start observing image containers
    this.imageContainers.forEach(container => {
      this.observer?.observe(container.nativeElement);
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

    const picturesPerColumn = Math.floor(numPictures / numColumns);
    const columnsWithExtra = numPictures % numColumns;

    let pictureIndex = 0;
    this.columns = [];

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
  }
}

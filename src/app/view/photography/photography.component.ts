import {Component, HostListener, OnInit} from '@angular/core';
import {Picture} from "../../model/picture";
import {PicturesService} from "../../services/pictures-service";
import {Router} from "@angular/router";

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

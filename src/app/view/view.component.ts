import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  MIN_COLS: number = 1;
  MAX_COLS: number = 1; // Initial value, will be adjusted based on media queries
  pictures: string[];
  columns: string[][];

  constructor() {
    this.columns = [];
    this.pictures = [];
  }

  ngOnInit(): void {
    this.calculateColumns();
    this.generatePictures();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateColumns();
    this.generatePictures();
  }

  calculateColumns() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.MAX_COLS = 5; // 5 columns for extra large screens
    } else if (window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches) {
      this.MAX_COLS = 3; // 3 columns for medium screens
    } else {
      this.MAX_COLS = 1; // 1 column for small screens
    }
  }

  generatePictures() {
    const basePath: string = '/assets/pictures/1 (';
    const suffixPath: string = ').png';
    const numPictures = 65;
    const numColumns = this.MAX_COLS;

    // Calculate how many pictures to distribute evenly across columns
    const picturesPerColumn = Math.floor(numPictures / numColumns);
    // Calculate how many columns will have an extra picture
    const columnsWithExtra = numPictures % numColumns;

    this.pictures = [];

    for (let i = 1; i <= numPictures; ++i) {
      let picturePath: string = basePath + i + suffixPath;
      this.pictures.push(picturePath);
    }

    // Distribute pictures evenly across columns
    let pictureIndex = 0;
    this.columns = [];

    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      let columnPictures = picturesPerColumn;
      // If this column should have an extra picture, increment its count
      if (colIndex < columnsWithExtra) {
        columnPictures++;
      }
      // Push pictures to the corresponding column
      this.columns[colIndex] = [];
      for (let j = 0; j < columnPictures; j++) {
        this.columns[colIndex].push(this.pictures[pictureIndex]);
        pictureIndex++;
      }
    }
  }
}

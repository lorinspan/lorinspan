import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from '../../services/pictures-service';

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

  isLargeScreen(): boolean {
    console.log('large screen')
    console.log(window.innerWidth > 993)
    return window.innerWidth > 993;
  }

  isMediumScreen(): boolean {
    console.log('medium screen')
    console.log(window.innerWidth >= 769 && window.innerWidth <= 992)
    return window.innerWidth >= 769 && window.innerWidth <= 992;
  }

  isSmallScreen(): boolean {
    return window.innerWidth < 769;
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
    this.reorderedPictures = [...this.pictures];
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }
}

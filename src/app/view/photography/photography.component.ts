import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORIES, PicturesService } from '../../services/pictures-service';
import {CategoryService} from "../../services/category-service";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})
export class PhotographyComponent implements OnInit {
  pictures: any[] = [];
  reorderedPictures: any[] = [];
  currentColumnCount: number;
  categories: string[] = [];
  selectedCategories: string[] = [];

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.currentColumnCount = this.detectColumnCount();
  }

  ngOnInit(): void {
    this.categories = Object.values(CATEGORIES);
    this.picturesService.getPictures().subscribe((pictures) => {
      this.pictures = pictures;
      this.reorderPicturesBasedOnColumns();
    });

    this.categoryService.selectedCategories$.subscribe((categories) => {
      this.selectedCategories = categories;
      this.reorderPicturesBasedOnColumns();
    });
  }

  isLargeScreen(): boolean {
    return window.innerWidth > 993;
  }

  isMediumScreen(): boolean {
    return window.innerWidth >= 769 && window.innerWidth <= 992;
  }

  isSmallScreen(): boolean {
    return window.innerWidth < 769;
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
    if (this.selectedCategories.length > 0) {
      this.reorderedPictures = this.pictures.filter((picture) =>
        this.selectedCategories.some((category) => picture.categories.includes(category))
      );
    } else {
      this.reorderedPictures = [...this.pictures];
    }
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }
}

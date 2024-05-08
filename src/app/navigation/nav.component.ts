import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category-service";
import {CATEGORIES} from "../services/pictures-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  categories: string[] = Object.values(CATEGORIES); // Example categories
  selectedCategories: string[] = [];
  isPhotographyRoute: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Subscribe to the shared state of selected categories
    this.categoryService.selectedCategories$.subscribe((categories) => {
      this.selectedCategories = categories;
    });

    this.router.events.subscribe((event) => {
      this.isPhotographyRoute = this.router.url === '/photography';
    });
  }

  toggleCategorySelection(category: string) {
    const index = this.selectedCategories.indexOf(category);
    const updatedCategories = [...this.selectedCategories];
    if (index === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(index, 1);
    }
    this.categoryService.updateCategories(updatedCategories);
  }

  clearCategories(): void {
    this.categoryService.updateCategories([]);
  }

  navigateTo(href: string): void {
    let url: string;
    switch (href) {
      case 'instagram':
        url = 'https://www.instagram.com/lorinspan/';
        break;
      case 'flickr':
        url = 'https://www.flickr.com/photos/200472052@N08/';
        break;
      case 'linkedin':
        url = 'https://www.linkedin.com/in/lorin-%C8%99pan-831994214/';
        break;
      case 'mail':
        url = 'mailto:lorinspanx@gmail.com';
        break;
      default:
        return;
    }
    window.open(url);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Ensure change detection runs
  }
}

import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isPageScrolled: boolean = false;
  hovering: boolean = false; // Property to track hover state
  hideScrollToTopBtn: boolean = false; // Flag to hide scroll-to-top button

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrollHandler, true);
    this.scrollHandler(); // Initial check on page load

    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route matches the pattern for /photo/{any id}
        if (this.router.url.startsWith('/photo/')) {
          this.hideScrollToTopBtn = true; // Hide the scroll-to-top button
        } else {
          this.hideScrollToTopBtn = false; // Show the scroll-to-top button for other routes
        }
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, true);
  }

  scrollHandler = (): void => {
    if (window.pageYOffset > 100) {
      this.isPageScrolled = true;
    } else {
      this.isPageScrolled = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getScrollToTopImage(): string {
    // Return different image source based on hover state
    return this.hovering ? 'assets/icons/arrow-up-hover.png' : 'assets/icons/arrow-up.png';
  }
}

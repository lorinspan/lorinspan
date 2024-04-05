import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isPageScrolled: boolean = false;
  hovering: boolean = false; // Property to track hover state

  ngOnInit() {
    window.addEventListener('scroll', this.scrollHandler, true);
    this.scrollHandler(); // Initial check on page load
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

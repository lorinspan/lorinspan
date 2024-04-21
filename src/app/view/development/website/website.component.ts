import {Component, HostListener, OnInit} from '@angular/core';
import {Picture} from "../../../model/picture";
import {ActivatedRoute, Router} from "@angular/router";
import {PicturesService} from "../../../services/pictures-service";
import {Presentation, Website} from "../../../model/website";
import {WebsitesService} from "../../../services/websites-service";

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  presentation: Presentation | null = null;
  websiteNotFound: boolean = false;
  presentations: Presentation[] = [];
  currentPresentationIndex: number = -1;
  websiteId: number | null = null;
  leftImageSrc: string = "assets/icons/arrow-left.png";
  rightImageSrc: string = "assets/icons/arrow-right.png";
  exitImageSrc: string = "assets/icons/exit.png";
  isZoomed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websitesService: WebsitesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.websiteId = Number(params.get('websiteId'));
      this.loadPresentations();
    });
  }

  loadPresentations(): void {
    if (this.websiteId !== null) {
      this.websitesService.getWebsites().subscribe(websites => {
        const website = websites.find(w => w.id === this.websiteId);
        if (website) {
          this.presentations = website.presentations;
          this.navigateToPresentation(0); // Navigate to the first presentation by default
        } else {
          console.error('Website not found.');
          this.websiteNotFound = true;
        }
      }, error => {
        console.error('Error fetching websites:', error);
        this.websiteNotFound = true;
      });
    }
  }

  hasPrevious(): boolean {
    return this.currentPresentationIndex > 0;
  }

  hasNext(): boolean {
    return this.currentPresentationIndex < this.presentations.length - 1;
  }

  navigateToPresentation(index: number): void {
    if (index >= 0 && index < this.presentations.length) {
      this.currentPresentationIndex = index;
      this.presentation = this.presentations[this.currentPresentationIndex];
    }
  }

  navigateToPrevious(): void {
    this.navigateToPresentation(this.currentPresentationIndex - 1);
  }

  navigateToNext(): void {
    this.navigateToPresentation(this.currentPresentationIndex + 1);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.navigateToPrevious();
    } else if (event.key === 'ArrowRight') {
      this.navigateToNext();
    } else if (event.key === 'Escape') {
      this.navigateToPhotography();
    }
  }

  onLeftButtonHover(isHovering: boolean): void {
    this.leftImageSrc = isHovering ? "assets/icons/arrow-left-hover.png" : "assets/icons/arrow-left.png";
  }

  onRightButtonHover(isHovering: boolean): void {
    this.rightImageSrc = isHovering ? "assets/icons/arrow-right-hover.png" : "assets/icons/arrow-right.png";
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  getCursorType(): string {
    return window.innerWidth <= 768 ? 'default' : this.isZoomed ? 'zoom-out' : 'zoom-in';
  }

  navigateToPhotography(): void {
    this.router.navigate(['/development']);
  }

  onExitButtonHover(isHovering: boolean): void {
    this.exitImageSrc = isHovering ? "assets/icons/exit-hover.png" : "assets/icons/exit.png";
  }

  navigateTo(href: string | null): void {
    if(href) {
      window.open(href);
    }
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from "../../../model/picture";
import { PicturesService } from "../../../services/pictures-service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  picture: Picture | null = null;
  pictureNotFound: boolean = false;
  pictures: Picture[] = [];
  currentPictureIndex: number = -1;
  leftImageSrc: string = "assets/icons/arrow-left.png";
  rightImageSrc: string = "assets/icons/arrow-right.png";
  exitImageSrc: string = "assets/icons/exit.png";
  isZoomed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private picturesService: PicturesService
  ) { }

  ngOnInit(): void {
    this.picturesService.getPictures().subscribe(pictures => {
      this.pictures = pictures;
      this.route.paramMap.subscribe(params => {
        const pictureId = Number(params.get('id'));
        const index = this.pictures.findIndex(p => p.id === pictureId);
        if (index !== -1) {
          this.currentPictureIndex = index;
          this.picture = this.pictures[this.currentPictureIndex];
          this.pictureNotFound = false;
        } else {
          this.pictureNotFound = true;
        }
      });
    });
  }

  hasPrevious(): boolean {
    return this.currentPictureIndex > 0;
  }

  hasNext(): boolean {
    return this.currentPictureIndex < this.pictures.length - 1;
  }

  navigateToPrevious(): void {
    if (this.hasPrevious()) {
      const previousId = this.pictures[this.currentPictureIndex - 1].id;
      this.router.navigate(['/photo', previousId]);
    }
  }

  navigateToNext(): void {
    if (this.hasNext()) {
      const nextId = this.pictures[this.currentPictureIndex + 1].id;
      this.router.navigate(['/photo', nextId]);
    }
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
    this.router.navigate(['/photography']);
  }

  onExitButtonHover(isHovering: boolean): void {
    this.exitImageSrc = isHovering ? "assets/icons/exit-hover.png" : "assets/icons/exit.png";
  }
}

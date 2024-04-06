import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from "../../../model/picture";
import { PicturesService } from "../../../services/pictures-service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  picture: Picture | null = null; // Initialize picture as null
  pictureNotFound: boolean = false; // Flag to indicate if picture is not found
  pictures: Picture[] = []; // Store all pictures
  currentPictureIndex: number = -1; // Index of the current picture
  leftImageSrc: string = "assets/icons/arrow-left.png"; // Source of the left image
  rightImageSrc: string = "assets/icons/arrow-right.png"; // Source of the right image
  exitImageSrc: string = "assets/icons/exit.png"; // Source of the left image
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
        const pictureId = Number(params.get('id')); // Convert id to number
        const index = this.pictures.findIndex(p => p.id === pictureId);
        if (index !== -1) {
          this.currentPictureIndex = index;
          this.picture = this.pictures[this.currentPictureIndex];
          this.pictureNotFound = false; // Picture found, reset flag
        } else {
          this.pictureNotFound = true; // Picture not found, set flag
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

  onLeftButtonHover(isHovering: boolean): void {
    if (isHovering) {
      this.leftImageSrc = "assets/icons/arrow-left-hover.png";
    } else {
      this.leftImageSrc = "assets/icons/arrow-left.png";
    }
  }

  onRightButtonHover(isHovering: boolean): void {
    if (isHovering) {
      this.rightImageSrc = "assets/icons/arrow-right-hover.png";
    } else {
      this.rightImageSrc = "assets/icons/arrow-right.png";
    }
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  getCursorType(): string {
    if (window.innerWidth <= 768) {
      return 'default';
    } else {
      return this.isZoomed ? 'zoom-out' : 'zoom-in';
    }
  }


  navigateToPhotography(): void {
    this.router.navigate(['/photography']);
  }

  onExitButtonHover(isHovering: boolean): void {
    if (isHovering) {
      this.exitImageSrc = "assets/icons/exit-hover.png"; // Change to the hover image source
    } else {
      this.exitImageSrc = "assets/icons/exit.png"; // Change to the normal image source
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { PicturesService } from '../../services/pictures-service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent implements OnInit {
  pictures: any[] = [];

  constructor(
    private readonly picturesService: PicturesService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // Fetch the pictures from the service
    this.picturesService.getPictures().subscribe((pictures) => {
      this.pictures = pictures;
    });
  }

  navigateToPicture(pictureId: number) {
    this.router.navigate(['/photo', pictureId]);
  }
}

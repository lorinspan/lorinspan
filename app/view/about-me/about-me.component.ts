import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../services/loading-service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements AfterViewInit, OnInit {
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
  }

  navigateToMail() {
    window.open('mailto:lorinspanx@gmail.com');
  }

  downloadCV() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/assets/CV/Lorin-Span-Resume.pdf'); // Update the file path as needed
    link.setAttribute('download', 'lorin-span-resume.pdf'); // Update the file name as needed
    document.body.appendChild(link);
    link.click();
    link.remove(); // Clean up
  }

  checkImagesLoaded(images: HTMLImageElement[]): Promise<Awaited<void>[]> {
    const promises: Promise<void>[] = [];

    // Create a promise for each image
    images.forEach((img) => {
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      promises.push(promise);
    });

    // Return a promise that resolves when all images have loaded
    return Promise.all(promises);
  }

  ngAfterViewInit() {
    const images: HTMLImageElement[] = Array.from(document.querySelectorAll('.picture, .picture-2')) as HTMLImageElement[];

    // Check if all images have loaded
    this.checkImagesLoaded(images).then(() => {
      // All images have loaded
      this.loadingService.setLoading(false); // Set loading to false
    });
  }
}

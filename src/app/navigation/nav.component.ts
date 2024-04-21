import { Component } from '@angular/core';
import {LoadingService} from "../services/loading-service";

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  navigateTo(href: string): void {
    switch (href) {
      case 'instagram':
        href = 'https://www.instagram.com/lorinspan/';
        break;
      case 'flickr':
        href = 'https://www.flickr.com/photos/200472052@N08/';
        break;
      case 'linkedin':
        href = 'https://www.linkedin.com/in/lorin-%C8%99pan-831994214/';
        break;
      case 'mail':
        href = 'mailto:lorinspanx@gmail.com';
        break;
      default:
        return;
    }
    window.open(href);
  }

  constructor(public loadingService: LoadingService) {
  }
}

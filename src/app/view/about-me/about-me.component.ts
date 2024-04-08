import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  constructor() {}

  navigateToMail() {
    window.location.href = 'mailto:lorinspanx@gmail.com';
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
}

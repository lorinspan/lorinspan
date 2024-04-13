import {Component, HostListener, OnInit} from '@angular/core';
import {Website} from "../../model/website";
import {websites, WebsitesService} from "../../services/websites-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit {
  numberOfColumns: number = 1;
  websites: Website[];
  columns: Website[][];

  constructor(private readonly websitesService: WebsitesService, private router: Router) {
    this.websites = [];
    this.columns = [];
  }

  navigateToWebsite(websiteId: number, presentationId: number) {
    if (websiteId !== 0 && websiteId) {
      this.router.navigate(['/website', websiteId, 'presentation']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateWebsites();
    this.generateWebsites();
  }

  ngOnInit(): void {
    this.calculateWebsites();
    this.websitesService.getWebsites().subscribe(websites => {
      this.websites = websites;
      this.generateWebsites();
    });
  }

  calculateWebsites() {
    if (window.matchMedia('(min-width: 993px)').matches) {
      this.numberOfColumns = 3;
    } else if (window.matchMedia('(min-width: 769px) and (max-width: 992px)').matches) {
      this.numberOfColumns = 2;
    } else {
      this.numberOfColumns = 1;
    }
  }

  generateWebsites() {
    const numWebsites = this.websites.length;
    const numColumns = this.numberOfColumns;

    const websitesPerColumn = Math.floor(numWebsites / numColumns);
    const columnsWithExtra = numWebsites % numColumns;

    let websiteIndex = 0;
    this.columns = [];

    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      let columnWebsites = websitesPerColumn;
      if (colIndex < columnsWithExtra) {
        columnWebsites++;
      }
      this.columns[colIndex] = [];
      for (let j = 0; j < columnWebsites; j++) {
        this.columns[colIndex].push(this.websites[websiteIndex]);
        websiteIndex++;
      }
    }
  }
}

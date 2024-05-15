import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavComponent} from "./navigation/nav.component";
import {PhotographyComponent} from "./view/photography/photography.component";
import {DevelopmentComponent} from "./view/development/development.component";
import { AboutMeComponent } from './view/about-me/about-me.component';
import { PhotoComponent } from './view/photography/photo/photo.component';
import { WebsiteComponent } from './view/development/website/website.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {NgOptimizedImage} from "@angular/common";
import {LazyLoadImageModule} from "ng-lazyload-image";
import { ElenaComponent } from './hidden/elena/elena.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PhotographyComponent,
    DevelopmentComponent,
    AboutMeComponent,
    PhotoComponent,
    WebsiteComponent,
    ElenaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    MatProgressBarModule,
    LazyLoadImageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import {NgOptimizedImage} from "@angular/common";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PhotographyComponent,
    DevelopmentComponent,
    AboutMeComponent,
    PhotoComponent,
    WebsiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

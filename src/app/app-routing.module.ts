import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotographyComponent } from "./view/photography/photography.component";
import { DevelopmentComponent } from "./view/development/development.component";
import { AboutMeComponent } from "./view/about-me/about-me.component";
import { PhotoComponent } from "./view/photography/photo/photo.component";
import { WebsiteComponent } from "./view/development/website/website.component";
import {PersonalComponent} from "./view/personal/personal.component";

const routes: Routes = [
  { path: '', redirectTo: '/photography', pathMatch: 'full' },
  { path: 'photography', component: PhotographyComponent },
  { path: 'development', component: DevelopmentComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'photo/:id', component: PhotoComponent },
  { path: 'website/:websiteId/presentation', component: WebsiteComponent },
  { path: 'personal', component: PersonalComponent},
  { path: '**', redirectTo: '/photography' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

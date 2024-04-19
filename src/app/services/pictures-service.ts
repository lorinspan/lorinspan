import {Injectable} from '@angular/core';
import {Picture} from "../model/picture";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  constructor() { }

  getPictures(): Observable<Picture[]> {
    return of(pictures);
  }

  getPictureById(id: number): Observable<Picture | null> {
    const picture = pictures.find(p => p.id === id);
    return of(picture || null);
  }
}

export const pictures: Picture[] = [
  new Picture(1,
    'lavinia-popa-afi-cotroceni-leu-c.jpg',
    'The first snapshot I took with my new mirrorless camera features Lavinia against the backdrop of the AFI Cotroceni Sphere, perched atop our student residence roof. Illuminated solely by natural light, I improvised with a phone flash to fill in the shadows, as professional lighting gear wasn\'t yet part of my kit.',
    '11th of April, 2024',
    'The Lion Complex',
    'https://maps.app.goo.gl/WZ3KBwhREhcmRgNP8' ,
    'Lavinia Popa',
    'https://www.instagram.com/laviniapopa.03/',
    'f/1.8, 1/50 sec, ISO 12800.'),
  new Picture(2,
    'stefania-ionescu-leu-c.jpg',
    'This image captures my early exploration into studio-like portrait photography, equipped with my newly acquired lighting setup, albeit not perfect. It included a light positioned behind Ștefania, an off-camera flash with an umbrella diffuser, and a wireless trigger on the camera.',
    '18th of April, 2024',
    'The Lion Complex',
    'https://maps.app.goo.gl/CnRDSFfyjTTqtEHA8',
    'Ștefania Ionescu',
    'https://www.instagram.com/steff_06_/',
    'f/2.8, 1/180 sec, ISO 200. Backlit & off camera flash with umbrella diffuser.'
    )
];

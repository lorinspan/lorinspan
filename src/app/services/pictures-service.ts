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
  new Picture(1, '1 (1)',   'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.', '7th of April, 2024', 'Old Town, Bucharest, Romania','https://maps.app.goo.gl/FfKLYreztR4iFGpR9' , 'Popa Lavinia', 'https://www.instagram.com/laviniapopa.03/', 'ISO 400, 50mm 1.8/f'),
  new Picture(2, '1 (2)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania', null, 'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(3, '1 (3)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(4, '1 (4)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(5, '1 (5)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(6, '1 (6)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(7, '1 (7)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(8, '1 (8)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(9, '1 (9)',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(10, '1 (10)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(11, '1 (11)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(12, '1 (12)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(13, '1 (13)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(14, '1 (14)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(15, '1 (15)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(16, '1 (16)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(17, '1 (17)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(18, '1 (18)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(19, '1 (19)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(20, '1 (20)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(21, '1 (21)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(22, '1 (22)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(23, '1 (23)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(24, '1 (24)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(25, '1 (25)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(26, '1 (26)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(27, '1 (27)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(28, '1 (28)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(29, '1 (29)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(30, '1 (30)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(31, '1 (31)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(32, '1 (32)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(33, '1 (33)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(34, '1 (34)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(35, '1 (35)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(36, '1 (36)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(37, '1 (37)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(38, '1 (38)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(39, '1 (39)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(40, '1 (40)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(41, '1 (41)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(42, '1 (42)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(43, '1 (43)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(44, '1 (44)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(45, '1 (45)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(46, '1 (46)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(47, '1 (47)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(48, '1 (48)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(49, '1 (49)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(50, '1 (50)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(51, '1 (51)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(52, '1 (52)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(53, '1 (53)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(54, '1 (54)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(55, '1 (55)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(56, '1 (56)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(57, '1 (57)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(58, '1 (58)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(59, '1 (59)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(60, '1 (60)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(61, '1 (61)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(62, '1 (62)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(63, '1 (63)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(64, '1 (64)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(65, '1 (65)', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f')
];

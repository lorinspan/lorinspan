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
  new Picture(1, 'lavinia-popa-afi-cotroceni-leu-c.jpg',   'The first snapshot I took with my new mirrorless camera features Lavinia, my friend and dorm neighbor, against the backdrop of the AFI Cotroceni Sphere, perched atop our student residence roof. Illuminated solely by natural light, I improvised with a phone flash to fill in the shadows, as professional lighting gear wasn\'t yet part of my kit.', '11th of April, 2024', 'The Lion Complex','https://maps.app.goo.gl/WZ3KBwhREhcmRgNP8' , 'Popa Lavinia', 'https://www.instagram.com/laviniapopa.03/', 'f/1.8, 1/50 sec, ISO 12800.'),
  new Picture(2, '1 (2).png',   'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.', '7th of April, 2024', 'Old Town, Bucharest, Romania', null, 'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(3, '1 (3).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(4, '1 (4).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(5, '1 (5).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(6, '1 (6).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(7, '1 (7).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(8, '1 (8).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(9, '1 (9).png',   'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(10, '1 (10).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(11, '1 (11).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(12, '1 (12).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(13, '1 (13).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(14, '1 (14).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(15, '1 (15).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(16, '1 (16).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(17, '1 (17).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(18, '1 (18).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(19, '1 (19).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(20, '1 (20).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(21, '1 (21).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(22, '1 (22).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(23, '1 (23).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(24, '1 (24).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(25, '1 (25).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(26, '1 (26).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(27, '1 (27).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(28, '1 (28).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(29, '1 (29).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(30, '1 (30).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(31, '1 (31).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(32, '1 (32).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(33, '1 (33).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(34, '1 (34).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(35, '1 (35).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(36, '1 (36).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(37, '1 (37).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(38, '1 (38).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(39, '1 (39).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(40, '1 (40).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(41, '1 (41).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(42, '1 (42).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(43, '1 (43).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(44, '1 (44).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(45, '1 (45).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(46, '1 (46).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(47, '1 (47).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(48, '1 (48).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(49, '1 (49).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(50, '1 (50).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(51, '1 (51).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(52, '1 (52).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(53, '1 (53).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(54, '1 (54).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(55, '1 (55).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(56, '1 (56).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(57, '1 (57).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(58, '1 (58).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(59, '1 (59).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(60, '1 (60).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(61, '1 (61).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(62, '1 (62).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(63, '1 (63).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(64, '1 (64).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f'),
  new Picture(65, '1 (65).png', 'description', '7th of April, 2024', 'Old Town, Bucharest, Romania',null,  'Popa Lavinia', null,  'ISO 400, 50mm 1.8/f')
];

import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Presentation, Website} from "../model/website";

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {
  constructor() { }

  getWebsites(): Observable<Website[]> {
    return of(websites);
  }

  getWebsiteById(id: number): Observable<Website | null> {
    const website = websites.find(w => w.id === id);
    return of(website || null);
  }
}

export const websites: Website[] = [
  new Website(1,
    'assets/websites/businesscert/thumbnail.png',
    'Business Cert',
    'Businesscert is a meticulously crafted web platform built with Angular, designed to meet the proprietor\'s requirements for promoting their range of ISO certifications tailored for businesses seeking ISO accreditation. The platform showcases certification options, pricing details, and hosts a robust contact page facilitating seamless communication, ensuring inquiries are promptly directed to the business owner\'s inbox.',
    new Presentation(1,
      '',
      'Home Page',
      ''
    ),
    new Presentation(2,
      '',
      'About',
      ''
    ),
    new Presentation(3,
      '',
      'ISO Certifications',
      ''
    ),
    new Presentation(4,
      '',
      'Prices',
      ''
    ),
    new Presentation(5,
      '',
      'Contact',
      ''
    )
  ),
  new Website(2,
    'assets/websites/meconomy/thumbnail.png',
    'MEconomy',
    'MEconomy was conceptualized as the culmination of my engineering degree thesis, encompassing the development of a sophisticated web application using Angular, complemented by an Android application coded in Java. The project represents a multifaceted savings platform distinguished by intricate mathematical algorithms addressing variables such as available budget, expenditure tracking on both monthly and daily scales, transaction management, categorization of items, and comprehensive statistical analyses including frequented transaction locations, preferred payment methods, specific item purchases, and recurring payments. Additionally, MEconomy features a personalized user profile experience and an integrated messaging system.',
    new Presentation(1,
      'assets/websites/meconomy/gif-login-register.gif',
      'Login & Register',
      'Page for login and register.'
    ),
    new Presentation(2,
      '',
      'Dashboard',
      ''
    ),
    new Presentation(3,
      '',
      'Transactions',
      ''
    ),
    new Presentation(4,
      '',
      'Statistics',
      ''
    ),
    new Presentation(5,
      '',
      'Messages',
      ''
    ),
    new Presentation(6,
      '',
      'Profile',
      ''
    ),
    new Presentation(7,
      '',
      'Android',
      ''
    )
  ),
  new Website(0, null, null, null),
  new Website(0, null, null, null),
  new Website(0, null, null, null),
  new Website(0, null, null, null),
  new Website(0, null, null, null),
  new Website(0, null, null, null),
  new Website(0, null, null, null)
];

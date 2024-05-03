import {Injectable} from '@angular/core';
import {Picture} from "../model/picture";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  constructor() { }

  getPictures(): Observable<Picture[]> {
    const sortedPictures = [...pictures].sort((a, b) => {
      return a.id - b.id;
    }); // Using spread to avoid mutating the original array
    return of(this.reorderAndReassignIDs(pictures));
  }

  getPictureById(id: number): Observable<Picture | null> {
    const picture = pictures.find(p => p.id === id);
    return of(picture || null);
  }

  private getShuffleSeed(): number {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based
    const year = now.getFullYear();
    return day + month * 69 + year * 420;
  }

  reorderAndReassignIDs(pictures: Picture[]): Picture[] {
    const seed = this.getShuffleSeed(); // Get a deterministic seed based on the current date
    const shuffledPictures = this.shuffleArray(pictures, seed); // Shuffle with a seed

    // Reassign IDs sequentially
    shuffledPictures.forEach((picture, index) => {
      picture.id = index + 1; // Reassign IDs from 1 to the length of the array
    });

    return shuffledPictures; // Return the reordered and re-IDed array
  }

  private shuffleArray<T>(array: T[], seed: number): T[] {
    const shuffledArray = [...array];
    let currentSeed = seed;

    // Fisher-Yates shuffle with a deterministic seed
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280; // Generate a pseudo-random number
      const j = Math.floor((currentSeed / 233280) * (i + 1)); // Random index
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }

    return shuffledArray;
  }
}

export const pictures: Picture[] = [
  new Picture(
    'stefania-ionescu-targoviste-1-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/8GWzhKLjFKUkHWyJA',
    'Ștefania Ionescu',
    'https://www.instagram.com/steff_06_/',
    'f/5.6, 1/180 sec, ISO 160. On-camera flash.'
    ),
  new Picture(
    'stefania-ionescu-targoviste-2-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/8GWzhKLjFKUkHWyJA',
    'Ștefania Ionescu',
    'https://www.instagram.com/steff_06_/',
    'f/5.6, 1/180 sec, ISO 160. On-camera flash.'
  ),
  new Picture(
    'stefania-ionescu-targoviste-3-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/8GWzhKLjFKUkHWyJA',
    'Ștefania Ionescu',
    'https://www.instagram.com/steff_06_/',
    'f/8, 1/180 sec, ISO 200. On-camera flash.'
  ),
  new Picture(
    'stefania-ionescu-leu-c-min.jpg',
    null,
    '18th of April, 2024',
    'The Lion Complex',
    'https://maps.app.goo.gl/CnRDSFfyjTTqtEHA8',
    'Ștefania Ionescu',
    'https://www.instagram.com/steff_06_/',
    'f/2.8, 1/180 sec, ISO 200. Backlit & off camera flash with umbrella diffuser.'
    ),
  new Picture(
    'bucharest-court-min.jpg',
    null,
    '20th of April, 2024',
    'Bucharest Court',
    'https://maps.app.goo.gl/YBw9PkbhCEg5Zom37',
    null,
    null,
    'f/5, 1/4000 sec, ISO 500.'),
  new Picture(
    'national-library-of-romania-min.jpg',
    null,
    '20th of April, 2024',
    'National Library of Romania',
    'https://maps.app.goo.gl/QDYRHBQb5gfhwXgk6',
    null,
    null,
    'f/2.2, 1/2000 sec, ISO 100.'),
  new Picture(
    'chamber-of-commerce-and-industry-min.jpg',
    null,
    '20th of April, 2024',
    'Chamber of Commerce and Industry',
    'https://maps.app.goo.gl/TyVhoVUJh3Wucvij8',
    null,
    null,
    'f/2.2, 1/2000 sec, ISO 100.'),
  new Picture(
    'blvd-mircea-voda-min.jpg',
    null,
    '20th of April, 2024',
    'Mircea Vodă Boulevard',
    'https://maps.app.goo.gl/oLGQKc9s3FZJ2UTQ7',
    null,
    null,
    'f/2.2, 1/2000 sec, ISO 100.'),
  new Picture(
    'jandarmeria-truck-2-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/z9qokV8ju6y6fmbZA',
    null,
    null,
    'f/1.8, 1/1000 sec, ISO 100.'),
  new Picture(
    'color-run-playful-child-min.jpg',
    null,
    '20th of April, 2024',
    'Color Run',
    'https://maps.app.goo.gl/PQQVi5ox9qD3Ashv9',
    null,
    null,
    'f/2.2, 1/2000 sec, ISO 200.'),
  new Picture(
    'jandarmeria-crosswalk-min.jpg',
    null,
    '20th of April, 2024',
    'Color Run',
    'https://maps.app.goo.gl/PQQVi5ox9qD3Ashv9',
    null,
    null,
    'f/1.8, 1/2500 sec, ISO 160.'),
  new Picture(
    'color-run-finish-line-min.jpg',
    null,
    '20th of April, 2024',
    'Color Run',
    'https://maps.app.goo.gl/PQQVi5ox9qD3Ashv9',
    null,
    null,
    'f/1.8, 1/2500 sec, ISO 100.'),
  new Picture(
    'color-run-back-shot-1-min.jpg',
    null,
    '20th of April, 2024',
    'Color Run',
    'https://maps.app.goo.gl/PQQVi5ox9qD3Ashv9',
    null,
    null,
    'f/1.8, 1/2000 sec, ISO 125.'),
  new Picture(
    'bike-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/jrqEgrzxVspMfSTM9',
    null,
    null,
    'f/1.8, 1/800 sec, ISO 250.'),
  new Picture(
    'tesla-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/yfwhpKDBGY1nrmtc8',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 100.'),
  new Picture(
    'garlic-1-min.jpg',
    null,
    '20th of April, 2024',
    'Local Farmers\' Market',
    'https://maps.app.goo.gl/f44jdQatbMr6R7Tj9',
    null,
    null,
    'f/1.8, 1/1600 sec, ISO 160.'),
  new Picture(
    'old-man-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/f3MqbLFxuE7KsaMG8',
    null,
    null,
    'f/1.8, 1/1250 sec, ISO 100.'),
  new Picture(
    'union-boulevard-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/f3MqbLFxuE7KsaMG8',
    null,
    null,
    'f/4, 1/1000 sec, ISO 100.'),
  new Picture(
    'union-boulevard-2-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/f3MqbLFxuE7KsaMG8',
    null,
    null,
    'f/4.5, 1/640 sec, ISO 100.'),
  new Picture(
    'bmw-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Boulevard',
    'https://maps.app.goo.gl/6nY3XAcv7G5CzPVb6',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 400.'),
  new Picture(
    'guy-waiting-flower-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/pKVSidFra17wrP86A',
    null,
    null,
    'f/3.2, 1/250 sec, ISO 100.'),
  new Picture(
    'guy-on-bike-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/vyiQHuiZMkpcQpQg7',
    null,
    null,
    'f/3.2, 1/250 sec, ISO 100.'),
  new Picture(
    'guy-back-shot-1-min.jpg',
    null,
    '20th of April, 2024',
    'Old Town',
    'https://maps.app.goo.gl/em2HScuwVp86VLWc9',
    null,
    null,
    'f/1.8, 1/800 sec, ISO 100.'),
  new Picture(
    'accordion-player-min.jpg',
    null,
    '20th of April, 2024',
    'Old Town',
    'https://maps.app.goo.gl/CZpC9P2EE3W5wJpTA',
    null,
    null,
    'f/3.2, 1/200 sec, ISO 500.'),
  new Picture(
    'street-performer-1-min.jpg',
    null,
    '20th of April, 2024',
    'Old Town',
    'https://maps.app.goo.gl/5NDjPqsgXzo6DJJT7',
    null,
    null,
    'f/1.8, 1/1000 sec, ISO 320.'),
  new Picture(
    'guy-tunnel-1-min.jpg',
    null,
    '20th of April, 2024',
    'Old Town',
    'https://maps.app.goo.gl/5NDjPqsgXzo6DJJT7',
    null,
    null,
    'f/1.8, 1/500 sec, ISO 160.'),
  new Picture(
    'street-performer-2-min.jpg',
    null,
    '20th of April, 2024',
    'Victory Street',
    'https://maps.app.goo.gl/KFBdsabApQnhEAh36',
    null,
    null,
    'f/4, 1/640 sec, ISO 250.'),
  new Picture(
    'palace-hall-min.jpg',
    null,
    '20th of April, 2024',
    'The Palace Hall',
    'https://maps.app.goo.gl/8Z1VGR9VoWRa8KrN8',
    null,
    null,
    'f/4, 1/1000 sec, ISO 200.'),
  new Picture(
    'street-performer-3-min.jpg',
    null,
    '20th of April, 2024',
    'Victory Street',
    'https://maps.app.goo.gl/LQciTZtApnDyStHbA',
    null,
    null,
    'f/1.8, 1/800 sec, ISO 250.'),
  new Picture(
    'jandarmeria-back-shot-2-min.jpg',
    null,
    '20th of April, 2024',
    'Victory Street',
    'https://maps.app.goo.gl/mJRWJKFsF2f2zAEG6',
    null,
    null,
    'f/1.8, 1/1250 sec, ISO 250.'),
  new Picture(
    'bancorex-headquarters-1-min.jpg',
    null,
    '20th of April, 2024',
    'Bancorex Headquarters',
    'https://maps.app.goo.gl/v4BrzBkJHeYwByis5',
    null,
    null,
    'f/4, 1/400 sec, ISO 125.'),
  new Picture(
    'bancorex-headquarters-2-min.jpg',
    null,
    '20th of April, 2024',
    'Bancorex Headquarters',
    'https://maps.app.goo.gl/v4BrzBkJHeYwByis5',
    null,
    null,
    'f/4, 1/400 sec, ISO 125.'),
  new Picture(
    'national-museum-of-romanian-history-1-min.jpg',
    null,
    '20th of April, 2024',
    'National Museum of Romanian History',
    'https://maps.app.goo.gl/QR8J4ucDQSFz8ocJ9',
    null,
    null,
    'f/1.8, 1/500 sec, ISO 3200.'),
  new Picture(
    'old-town-1-min.jpg',
    null,
    '20th of April, 2024',
    'Old Town',
    'https://maps.app.goo.gl/eWTzKTxqPBqE6RPGA',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 320.'),
  new Picture(
    'union-plaza-1-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/jxoHwJGAnMmuAHae8',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 400.'),
  new Picture(
    'union-plaza-2-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/jxoHwJGAnMmuAHae8',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 1250.'),
  new Picture(
    'union-plaza-3-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/jxoHwJGAnMmuAHae8',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 160.'),
  new Picture(
    'union-plaza-4-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/jxoHwJGAnMmuAHae8',
    null,
    null,
    'f/1.8, 1/400 sec, ISO 2500.'),
  new Picture(
    'union-plaza-5-min.jpg',
    null,
    '20th of April, 2024',
    'Union Plaza',
    'https://maps.app.goo.gl/1pJAZcB2cBTJhVw76',
    null,
    null,
    'f/1.8, 1/80 sec, ISO 1250.'),
  new Picture(
    'national-museum-of-romanian-history-2-min.jpg',
    null,
    '20th of April, 2024',
    'National Museum of Romanian History',
    'https://maps.app.goo.gl/QR8J4ucDQSFz8ocJ9',
    null,
    null,
    'f/1.8, 1/60 sec, ISO 500.'),
  new Picture(
    'color-run-back-shot-2-min.jpg',
    null,
    '20th of April, 2024',
    'Color Run',
    'https://maps.app.goo.gl/PQQVi5ox9qD3Ashv9',
    null,
    null,
    'f/2.5, 1/2000 sec, ISO 640.'),
  new Picture(
    'basarab-passage-1-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/4.5, 1/800 sec, ISO 100.'),
  new Picture(
    'basarab-passage-2-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/3.2, 1/800 sec, ISO 100.'),
  new Picture(
    'basarab-passage-3-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/3.2, 1/800 sec, ISO 1000.'),
  new Picture(
    'basarab-passage-4-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/3.2, 1/800 sec, ISO 100.'),
  new Picture(
    'basarab-passage-5-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/4, 1/1600 sec, ISO 100.'),
  new Picture(
    'basarab-passage-6-min.jpg',
    null,
    '21th of April, 2024',
    'Basarab Passage',
    'https://maps.app.goo.gl/4ZoneC3t4yaksRt47',
    null,
    null,
    'f/4, 1/800 sec, ISO 200.'),
  new Picture(
    'bucharest-north-train-station-1-min.jpg',
    null,
    '21th of April, 2024',
    'Bucharest North Train Station',
    'https://maps.app.goo.gl/HZRDrN5A8pAWSc227',
    null,
    null,
    'f/1.8, 1/3200 sec, ISO 160.'),
  new Picture(
    'giurgiu-landscape-1-min.jpg',
    null,
    '29th of April, 2024',
    'Giurgiu, România',
    null,
    null,
    null,
    'f/6.3, 1/500 sec, ISO 125'
  ),
  new Picture(
    'ruse-train-station-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    'https://maps.app.goo.gl/WCxPRpm6MTQDzxw29',
    null,
    null,
    'f/5, 1/800 sec, ISO 160'
  ),
  new Picture(
    'ruse-train-station-2-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    'https://maps.app.goo.gl/WCxPRpm6MTQDzxw29',
    null,
    null,
    'f/4, 1/1250 sec, ISO 125'
  ),
  new Picture(
    'ruse-architecture-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/250 sec, ISO 250'
  ),
  new Picture(
    'ruse-architecture-2-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/250 sec, ISO 200'
  ),
  new Picture(
    'ruse-train-station-3-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    'https://maps.app.goo.gl/WCxPRpm6MTQDzxw29',
    null,
    null,
    'f/5.6, 1/1250 sec, ISO 320'
  ),
  new Picture(
    'ruse-architecture-3-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/7.1, 1/60 sec, ISO 400'
  ),
  new Picture(
    'ruse-architecture-4-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/250 sec, ISO 160'
  ),
  new Picture(
    'ruse-architecture-5-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/200 sec, ISO 320'
  ),
  new Picture(
    'ruse-architecture-6-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/60 sec, ISO 125'
  ),
  new Picture(
    'ruse-architecture-7-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/320 sec, ISO 400'
  ),
  new Picture(
    'ruse-architecture-8-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/8, 1/60 sec, ISO 400'
  ),
  new Picture(
    'ruse-car-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/400 sec, ISO 640'
  ),
  new Picture(
    'ruse-rails-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/7.1, 1/60 sec, ISO 640'
  ),
  new Picture(
    'ruse-rails-2-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/320 sec, ISO 400'
  ),
  new Picture(
    'ruse-cannon-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/5.6, 1/800 sec, ISO 800'
  ),
  new Picture(
    'ruse-sign-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/160 sec, ISO 320'
  ),
  new Picture(
    'ruse-road-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/500 sec, ISO 125'
  ),
  new Picture(
    'ruse-lock-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/320 sec, ISO 160'
  ),
  new Picture(
    'ruse-danube-1-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/320 sec, ISO 250'
  ),
  new Picture(
    'ruse-easter-eggs-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/6.3, 1/160 sec, ISO 250'
  ),
  new Picture(
    'giurgiu-landscape-2-min.jpg',
    null,
    '29th of April, 2024',
    'Giurgiu, România',
    null,
    null,
    null,
    'f/5, 1/1000 sec, ISO 250'
  ),
  new Picture(
    'giurgiu-landscape-3-min.jpg',
    null,
    '29th of April, 2024',
    'Giurgiu, România',
    null,
    null,
    null,
    'f/6.3, 1/1000 sec, ISO 800'
  ),
  new Picture(
    'giurgiu-train-shot-1-min.jpg',
    null,
    '29th of April, 2024',
    'Giurgiu, România',
    null,
    null,
    null,
    'f/4.5, 1/1000 sec, ISO 500'
  ),
  new Picture(
    'targoviste-park-1-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/RfTwDUrdLeYdXJS38',
    null,
    null,
    'f/4, 1/400 sec, ISO 100'
  ),
  new Picture(
    'targoviste-park-2-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/RfTwDUrdLeYdXJS38',
    null,
    null,
    'f/6.3, 1/400 sec, ISO 320'
  ),
  new Picture(
    'targoviste-chindiei-1-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/ApFdp67EGormM6v69',
    null,
    null,
    'f/4, 1/400 sec, ISO 160'
  ),
  new Picture(
    'targoviste-chindiei-2-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/ApFdp67EGormM6v69',
    null,
    null,
    'f/5, 1/400 sec, ISO 250'
  ),
  new Picture(
    'targoviste-chindiei-3-min.jpg',
    null,
    '1st of May, 2024',
    'Târgoviște, România',
    'https://maps.app.goo.gl/ApFdp67EGormM6v69',
    null,
    null,
    'f/5.6, 1/400 sec, ISO 160'
  ),
  new Picture(
    'ruse-bench-min.jpg',
    null,
    '29th of April, 2024',
    'Ruse, Bulgaria',
    null,
    null,
    null,
    'f/4, 1/1600 sec, ISO 160'
  ),
];

import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageCacheService {
  private cache = new Map<string, string>(); // Map to cache images
  private subject = new BehaviorSubject<string[]>([]);

  constructor() {}

  // Function to get an image by its source
  getImage(src: string): Observable<string> {
    if (this.cache.has(src)) {
      // Return cached image
      return of(this.cache.get(src) as string);
    } else {
      // Simulate an image fetch with a timeout (replace with real fetch logic)
      return this.fetchImage(src).pipe(
        switchMap((fetchedSrc) => {
          this.cache.set(src, fetchedSrc); // Cache the fetched image
          this.subject.next(Array.from(this.cache.values())); // Notify of cache change
          return of(fetchedSrc);
        }),
        shareReplay(1) // Ensures replay for any new subscribers
      );
    }
  }

  // Simulate image fetch
  private fetchImage(src: string): Observable<string> {
    // Simulate fetching (replace with HTTP request or other logic)
    return of(src); // Return the image source
  }
}

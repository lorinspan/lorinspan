// pictures-state.service.ts
import { Injectable } from '@angular/core';
import { Picture } from '../model/picture';

@Injectable({
  providedIn: 'root',
})
export class PicturesStateService {
  private loadedPictures: Picture[] = [];
  private remainingPictures: Picture[] = [];

  // Save the current state
  saveState(loadedPictures: Picture[], remainingPictures: Picture[]): void {
    this.loadedPictures = loadedPictures;
    this.remainingPictures = remainingPictures;
  }

  // Retrieve the current state
  getLoadedPictures(): Picture[] {
    return [...this.loadedPictures]; // Return a copy to maintain immutability
  }

  getRemainingPictures(): Picture[] {
    return [...this.remainingPictures]; // Return a copy to maintain immutability
  }

  // Clear the current state
  clearState(): void {
    this.loadedPictures = [];
    this.remainingPictures = [];
  }
}

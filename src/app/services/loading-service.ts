import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public static loading: boolean = false;

  setLoading(flag: boolean): void {
    console.log(this.getLoading());
    LoadingService.loading = flag;
    console.log(this.getLoading());
  }

  getLoading(): boolean {
    return LoadingService.loading;
  }

  constructor() { }
}

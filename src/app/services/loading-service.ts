import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public static loading: boolean = false;

  setLoading(flag: boolean) {
    LoadingService.loading = flag;
  }

  getLoading(): boolean {
    return LoadingService.loading;
  }

  constructor() { }
}

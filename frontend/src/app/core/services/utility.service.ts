import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  getLocalStorageItem<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  getSessionStorageItem<T>(key: string): T | undefined {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  getEnumAsArray<T = number | string>(e: {[k: number]: T}): T[] {
    return Object.values(e);
  }
}

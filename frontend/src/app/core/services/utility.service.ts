import { Injectable } from '@angular/core';
import { SelectItem } from '../models/select-item.type';
import { Enum } from '../models/enum.type';

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

  getEnumAsSelectItems<T extends number | string>(e: Enum<T>): SelectItem<T>[] {
    let arr: SelectItem[] = [];
    for (const key in e) arr.push({
      value: key,
      label: e[key] as string
    });
    return arr;
  }

  toFormData(obj: {[key: string]: any}): FormData {
    const formData = new FormData();

    for (const key in obj) {
      let value = obj[key];

      if (value instanceof File || typeof value == "string") formData.append(key, value);
      else if (value instanceof Array) formData.append(key, JSON.stringify(value));
      else formData.append(key, value.toString());
    };

    return formData;
  }
}

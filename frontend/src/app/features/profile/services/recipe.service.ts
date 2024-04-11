import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipePayload } from '../models/recipe-payload.type';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../models/recipe-response.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  create(recipe: RecipePayload): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(environment.recipes, recipe);
  }
}

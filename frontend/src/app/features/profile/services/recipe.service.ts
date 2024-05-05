import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipePayload } from '../models/recipe-payload.type';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../models/recipe-response.type';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Pageable } from 'src/app/core/models/pageable.type';
import { Page } from 'src/app/core/models/page.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  create(recipe: RecipePayload): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(environment.recipes, this.utilityService.toFormData(recipe));
  }

  findById(id: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(environment.recipes + "/" + id);
  }

  getRecipesPage(pageable: Pageable): Observable<Page<RecipeResponse>> {
    const sortParams: string = pageable.sortParams?.reduce((str, param) => `${str}&sort=${param.name},${param.order}`, "") ?? "";

    return this.http.get<Page<RecipeResponse>>(`${environment.recipes}?page=${pageable.pageNumber}&size=${pageable.pageSize}${sortParams}`);
  }
}

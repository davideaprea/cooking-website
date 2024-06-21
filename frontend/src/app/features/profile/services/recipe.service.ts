import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipePayload } from '../models/recipe-payload.type';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../models/recipe-response.type';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Pageable } from 'src/app/core/models/backend-dto/pageable.type';
import { Page } from 'src/app/core/models/backend-dto/page.type';
import { RecipeSearchDto } from '../../home/models/recipe-search-dto.type';

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
    const sortParams: string[] = pageable.sortParams?.map(param => `&sort=${param.name},${param.order}`) || [];

    return this.http.get<Page<RecipeResponse>>(`${environment.recipes}?page=${pageable.pageNumber}&size=${pageable.pageSize}${sortParams.join("")}`);
  }

  filter(filters: RecipeSearchDto, pageable: Pageable): Observable<Page<RecipeResponse>> {
    const sortParams: string[] = pageable.sortParams?.map(param => `&sort=${param.name},${param.order}`) || [];

    return this.http.post<Page<RecipeResponse>>(`${environment.recipes}/filter?page=${pageable.pageNumber}&size=${pageable.pageSize}${sortParams.join("")}`, filters);
  }
}

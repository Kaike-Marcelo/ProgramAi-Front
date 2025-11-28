import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { RankingResponseDtoModel } from '../core/dtos/response/ranking/ranking-response-dto.model';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  #http = inject(HttpClient);

  rankingGlobal(): Observable<MappedResponse<RankingResponseDtoModel>> {
    return this.#http.get<MappedResponse<RankingResponseDtoModel>>(`${environment.apiUrl}/ranking/global`).pipe(
      mapSimpleApiResponse()
    );
  }
}

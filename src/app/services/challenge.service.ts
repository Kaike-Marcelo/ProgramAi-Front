import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { environment } from '../../environments/environment';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { RequestChallengeQuestions, RequestModuleDetails } from '../core/dtos/request/request-challenges.model';
import { ModuleDetailsResponseDto } from '../core/dtos/response/challenges/challenges-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  #http = inject(HttpClient);

  getModuleDetails(request: RequestModuleDetails): Observable<MappedResponse<ModuleDetailsResponseDto>> {
    return this.#http.post<MappedResponse<ModuleDetailsResponseDto>>(`${environment.apiUrl}/challenge/modules/detailed`, request).pipe(
      mapSimpleApiResponse()
    );
  }

  loadChallengeQuestions(request: RequestChallengeQuestions): Observable<MappedResponse<ModuleDetailsResponseDto>> {
    return this.#http.post<MappedResponse<ModuleDetailsResponseDto>>(`${environment.apiUrl}/challenge/questions/generate`, request).pipe(
      mapSimpleApiResponse()
    );
  }
}

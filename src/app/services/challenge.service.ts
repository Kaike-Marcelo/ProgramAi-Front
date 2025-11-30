import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { ModulesForTheLoggedInUserResponseDto } from '../core/dtos/response/modules-response-dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  #http = inject(HttpClient);

  getModulesForLoggedInUser(): Observable<MappedResponse<ModulesForTheLoggedInUserResponseDto[]>> {
    return this.#http.get<MappedResponse<ModulesForTheLoggedInUserResponseDto[]>>(`${environment.apiUrl}/challenge/modules`)
  }
}

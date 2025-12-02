import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { ModulesForTheLoggedInUserResponseDto, ModulesResponseDto } from '../core/dtos/response/modules-response-dto.model';
import { environment } from '../../environments/environment';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { Observable } from 'rxjs';
import { RequestModule } from '../core/dtos/request/request-module.model';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  #http = inject(HttpClient);

  createModule(module: RequestModule): Observable<MappedResponse<ModulesResponseDto>> {
    return this.#http.post<MappedResponse<ModulesResponseDto>>(`${environment.apiUrl}/module`, module).pipe(
      mapSimpleApiResponse()
    );
  }

  getModules(): Observable<MappedResponse<ModulesResponseDto[]>> {
    return this.#http.get<MappedResponse<ModulesResponseDto[]>>(`${environment.apiUrl}/module/list`).pipe(
      mapSimpleApiResponse()
    );
  }

  getModulesForLoggedInUser(): Observable<MappedResponse<ModulesForTheLoggedInUserResponseDto[]>> {
    return this.#http.get<MappedResponse<ModulesForTheLoggedInUserResponseDto[]>>(`${environment.apiUrl}/challenge/modules`).pipe(
      mapSimpleApiResponse()
    )
  }
}

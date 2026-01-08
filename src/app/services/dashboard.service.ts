import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestTrainingProgress } from '../core/dtos/request/request-challenges.model';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { ModuleSumaryResponseDto } from '../core/dtos/response/challenges/challenges-response-dto';
import { environment } from '../../environments/environment';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  #http = inject(HttpClient);

  getDashboardModuleSumary(request: RequestTrainingProgress): Observable<MappedResponse<ModuleSumaryResponseDto>> {
    return this.#http.post<MappedResponse<ModuleSumaryResponseDto>>(`${environment.apiUrl}/dashboard/module-summary`, request).pipe(
      mapSimpleApiResponse()
    );
  }
}

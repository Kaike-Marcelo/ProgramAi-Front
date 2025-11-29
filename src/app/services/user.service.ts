import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { AchievementsResponseDto } from '../core/dtos/response/achievements/achievements-response-dto.model';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http = inject(HttpClient);

  getAchievements(): Observable<MappedResponse<AchievementsResponseDto>> {
    return this.#http.get<MappedResponse<AchievementsResponseDto>>(`${environment.apiUrl}/user/achievements`).pipe(
      mapSimpleApiResponse()
    )
  }
}

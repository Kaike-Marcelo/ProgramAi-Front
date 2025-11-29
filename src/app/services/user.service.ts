import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { AchievementsResponseDto } from '../core/dtos/response/achievements/achievements-response-dto.model';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { RequestSignUp } from '../core/dtos/request/request-sign-up.model';
import { UserResponseDto } from '../core/dtos/response/user-response-dto.model';
import { ApiResponseDto } from '../core/dtos/response/api-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http = inject(HttpClient);

  createUser(requestSignUp: RequestSignUp): Observable<MappedResponse<UserResponseDto>> {
    return this.#http.post<ApiResponseDto<UserResponseDto>>(`${environment.apiUrl}/user`, requestSignUp).pipe(
      mapSimpleApiResponse(),
    )
  }

  getAchievements(): Observable<MappedResponse<AchievementsResponseDto>> {
    return this.#http.get<MappedResponse<AchievementsResponseDto>>(`${environment.apiUrl}/user/achievements`).pipe(
      mapSimpleApiResponse()
    )
  }
}

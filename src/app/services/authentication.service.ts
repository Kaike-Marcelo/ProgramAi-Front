import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { RequestSignIn } from '../core/dtos/request/request-sign-in.model';
import { ApiResponseDto } from '../core/dtos/response/api-response-dto.model';
import { SignInResponseDto } from '../core/dtos/response/sign-in-response-dto.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #http = inject(HttpClient);
  #router = inject(Router);
  #localStorageService = inject(LocalStorageService);

  signIn(requestSignIn: RequestSignIn): Observable<MappedResponse<SignInResponseDto>> {
    return this.#http.post<ApiResponseDto<SignInResponseDto>>(`${environment.apiUrl}/login`, requestSignIn).pipe(
      mapSimpleApiResponse()
    );
  }

  logout() {
    this.#localStorageService.clearTokensLocalStorage();
    this.#localStorageService.clearUserLocalStorage();
    this.#router.navigate(['sign-in']);
  }

  getLoggedInUser(): User | null {
    return this.#localStorageService.getUserFromLocalStorage();
  }

  getAccessToken(): string | null {
    return this.#localStorageService.getAccessToken();
  }

  setTokensLocalStorage(response: SignInResponseDto) {
    this.#localStorageService.saveAccessToken(response.tokens.accessToken);
    this.#localStorageService.saveUserLocalStorage(response);
  }

  updateUserLocalStorage(user: User) {
    this.#localStorageService.saveUserLocalStorage(user)
  }

  isUserAuthenticated(): boolean {
    // if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    //   return false;
    // }
    return localStorage.getItem('programai:access_token') !== null;
  }
}

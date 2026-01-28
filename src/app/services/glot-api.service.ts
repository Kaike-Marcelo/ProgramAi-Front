import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlotRunResponseDto } from '../core/dtos/response/glot-run-response-dto.model';
import { LanguageService } from '../shared/services/code-execution/language.service';

@Injectable({
  providedIn: 'root',
})
export class GlotApiService {
  private http = inject(HttpClient);
  private readonly API_PREFIX = '/glot-api';
  
  #languageService = inject(LanguageService);

  runCode(language: string, code: string, stdin: string = ''): Observable<GlotRunResponseDto> {
    const endpoint = `${this.API_PREFIX}/run/${language}/latest`;

    const payload = {
      files: [{
        name: this.#languageService.getFileName(language),
        content: code
      }],
      stdin: stdin
    };
    return this.http.post<GlotRunResponseDto>(endpoint, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro ${error.status}: ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

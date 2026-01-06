import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { environment } from '../../environments/environment';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { RequestChallengeQuestions, RequestModuleDetails, RequestQuestionDetailed, RequestSubmitQuestion, RequestTrainingProgress } from '../core/dtos/request/request-challenges.model';
import { ChallengeQuestionDetailsResponseDto, HintQuestionResponseDto, ModuleDetailsResponseDto, TrainingProgressResponseDto } from '../core/dtos/response/challenges/challenges-response-dto';

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

  getQuestionDetailed(request: RequestQuestionDetailed): Observable<MappedResponse<ChallengeQuestionDetailsResponseDto>> {
    return this.#http.post<MappedResponse<ChallengeQuestionDetailsResponseDto>>(`${environment.apiUrl}/challenge/questions/detailed`, request).pipe(
      mapSimpleApiResponse()
    );
  }

  getTrainingProgress(request: RequestTrainingProgress) {
    return this.#http.post<MappedResponse<TrainingProgressResponseDto>>(`${environment.apiUrl}/dashboard/training-progress`, request).pipe(
      mapSimpleApiResponse()
    );
  }

  getHintQuestion(request: RequestQuestionDetailed): Observable<MappedResponse<HintQuestionResponseDto>> {
    return this.#http.post<MappedResponse<HintQuestionResponseDto>>(`${environment.apiUrl}/challenge/questions/hint`, request).pipe(
      mapSimpleApiResponse()
    );
  }

  submitQuestionAnswer(request: RequestSubmitQuestion): Observable<MappedResponse<ChallengeQuestionDetailsResponseDto>> {
    return this.#http.post<MappedResponse<ChallengeQuestionDetailsResponseDto>>(`${environment.apiUrl}/challenge/questions/submit`, request).pipe(
      mapSimpleApiResponse()
    );
  }
}
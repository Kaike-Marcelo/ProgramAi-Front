import { OperatorFunction, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponseDto } from '../dtos/response/api-response-dto.model';
import { MappedResponse } from '../interfaces/mapped-response.interface';

/**
 * Para respostas simples onde `data` não precisa de transformação
 */
export function mapSimpleApiResponse<T>(): OperatorFunction<ApiResponseDto<T>, MappedResponse<T>> {
  return source$ =>
    source$.pipe(
      map(response => {
        if (response.data === undefined) {
          throw new Error(response.message || 'Erro ao processar a resposta da API.');
        }
        return {
          data: response.data,
          message: response.message,
        };
      }),
      catchError(err => throwError(() => err))
    );
}

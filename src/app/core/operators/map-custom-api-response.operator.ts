import { OperatorFunction, map, catchError, throwError } from "rxjs";
import { ApiResponseDto } from "../dtos/response/api-response-dto.model";
import { MappedResponse } from "../interfaces/mapped-response.interface";
import { mapErrorApiResponse } from "./map-error-api-response.operator";

/**
 * Para casos onde você precisa transformar o `data` da resposta antes de usá-lo.
 * Recebe uma função de transformação.
 */
export function mapCustomApiResponse<T, R>(
  transform: (data: T) => R
): OperatorFunction<ApiResponseDto<T>, MappedResponse<R>> {
  return source$ =>
    source$.pipe(
      map(response => {
        if (response.data === undefined) {
          throw new Error(response.message || "Erro ao processar a resposta da API.");
        }
        return {
          data: transform(response.data),
          message: response.message,
        };
      }),
      catchError(err => mapErrorApiResponse(err))
    );
}

import { HttpErrorResponse } from "@angular/common/http";
import { ResponseErrorJsonDto } from "../dtos/response/api-error-dto.model";
import { Observable, throwError } from "rxjs";

export function mapErrorApiResponse(error: HttpErrorResponse): Observable<never> {
    if ((error.status === 400 || error.status === 401) && error.error) {
        const errorBody: ResponseErrorJsonDto = error.error;
        return throwError(() => errorBody.errors);
    }
    return throwError(() => [error.message || 'Erro desconhecido']);
}
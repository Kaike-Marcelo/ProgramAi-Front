import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationListResponseDto, NotificationUpdateResponseDto } from '../core/dtos/response/notification-response-dto.model';
import { MappedResponse } from '../core/interfaces/mapped-response.interface';
import { environment } from '../../environments/environment';
import { mapSimpleApiResponse } from '../core/operators/map-simple-api-response.operator';
import { RequestNotificationList, RequestNotificationUpdate } from '../core/dtos/request/request-notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #http = inject(HttpClient);

  notificationList(request: RequestNotificationList): Observable<MappedResponse<NotificationListResponseDto[]>> {
    return this.#http.post<MappedResponse<NotificationListResponseDto[]>>(`${environment.apiUrl}/notification/list`, request).pipe(
      mapSimpleApiResponse()
    );
  }

  notificationUpdate(request: RequestNotificationUpdate): Observable<MappedResponse<NotificationUpdateResponseDto>> {
    return this.#http.put<MappedResponse<NotificationUpdateResponseDto>>(`${environment.apiUrl}/notification/read`, request).pipe(
      mapSimpleApiResponse()
    );
  }
}

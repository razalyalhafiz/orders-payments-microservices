import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../models/Order';
import { catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ORDERS_API } from '../consts/consts';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _httpError: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  httpError$ = this._httpError.asObservable();

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  fetchOrders(): Observable<Order[]> {
    return from(this._auth.getToken()).pipe(
      switchMap((token) =>
        this._http.get<Order[]>(ORDERS_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
      catchError((error) => this.handleError(error))
    );
  }

  addOrder(payload: Order) {
    return from(this._auth.getToken()).pipe(
      switchMap((token) =>
        this._http.post<Order[]>(ORDERS_API, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
      catchError((error) => this.handleError(error))
    );
  }

  cancelOrder(orderId: string) {
    const url = `${ORDERS_API}/${orderId}/cancel`;
    return from(this._auth.getToken()).pipe(
      switchMap((token) =>
        this._http.patch<Order[]>(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ),
      catchError((error) => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse) {
    let message: string = error.error ? error.error.message : '';

    if (!this._httpError) this._httpError = new BehaviorSubject<string>(null);

    if (typeof error === 'string') {
      message = error;
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', message);
    } else if (error.status === 403) {
      message =
        'Unauthorized request. Please contact your system administrator.';
    } else {
      message = 'Server currently down. Please try again later.';
    }

    this._httpError.next(message);
    return throwError(message);
  }
}

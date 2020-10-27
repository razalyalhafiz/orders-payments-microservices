import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {
  private newEventSource(path: string): EventSource {
    return new EventSource(path);
  }

  newObservable<T>(path: string): Observable<T> {
    return new Observable((observer) => {
      const eventSource = this.newEventSource(path);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = () => {
        observer.error('SSE error occurred. Please refresh the page.');
        eventSource.close();
        observer.complete();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}

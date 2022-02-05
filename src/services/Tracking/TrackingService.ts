import { createContext, KeyboardEvent, MouseEvent } from 'react';
import { fromEvent, Subject, Subscription } from 'rxjs';

interface Event {
  event: KeyboardEvent | MouseEvent;
}

export class TrackingService {
  private _events$ = new Subject<Event>();

  public initialiseTracking = (): Subscription => {
    return fromEvent(document, 'click').subscribe((event) =>
      console.log(event)
    );
  };
}

export const TrackingServiceContext = createContext(new TrackingService());

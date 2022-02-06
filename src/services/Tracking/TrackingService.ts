import { createContext, KeyboardEvent, MouseEvent } from 'react';
import { fromEvent, Subject, Subscription } from 'rxjs';

interface Event {
  event: KeyboardEvent | MouseEvent;
}

// TODO: convert to object, see SearchService, do it like there: get rid of using 'react' in this file
export class TrackingService {
  private _events$ = new Subject<Event>();

  public initialiseTracking = (): Subscription => {
    return fromEvent(document, 'click').subscribe((event) =>
      console.log(event)
    );
  };
}

export const TrackingServiceContext = createContext(new TrackingService());

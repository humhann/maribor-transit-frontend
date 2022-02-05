import { createContext } from 'react';
import { from, Subject, tap } from 'rxjs';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Station {
  id: number;
  name: string;
  coordinates: Coordinates;
  distance: number;
}

export interface SearchResults {
  // searchTerm: string;
  resultsTotalCount: number;
  stations: Station[];
}

interface SearchParams {
  searchTerm: string;
}

export class SearchService {
  private _data$ = new Subject<SearchResults>();
  private _reset$ = new Subject<void>();

  public data$ = this._data$.asObservable();
  public reset$ = this._reset$.asObservable();

  public search = ({ searchTerm }: SearchParams): void => {
    // TODO: there's probably a rxjs method for this, use that instead
    if (!searchTerm) {
      return;
    }

    from(this._remoteSearch({ searchTerm }))
      .pipe(
        tap({
          next: async (response) => this._data$.next(await response.json()),
          error: (error) => this._data$.error(error),
        })
      )
      .subscribe();
  };

  public reset = (): void => {
    this._reset$.next();
  };

  // private _remoteSearch = ({ searchTerm }: SearchParams): Promise<any> => {
  private _remoteSearch = ({ searchTerm }: SearchParams): Promise<Response> => {
    return fetch(
      'https://maribor-transit-backend.ihumhann.workers.dev/realtime'
    );
  };
}

export const SearchServiceContext = createContext(new SearchService());

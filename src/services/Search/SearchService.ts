import { from, Subject, tap } from 'rxjs';
import { SearchResults, SearchParams } from './SearchService.d';

const remoteSearch = ({ searchTerm }: SearchParams): Promise<Response> => {
  return fetch('https://maribor-transit-backend.ihumhann.workers.dev/realtime');
};

const data$ = new Subject<SearchResults>();
const reset$ = new Subject<void>();

const search = ({ searchTerm }: SearchParams): void => {
  // TODO: there's probably a rxjs method for this, use that instead
  if (!searchTerm) {
    return;
  }

  from(remoteSearch({ searchTerm }))
    .pipe(
      tap({
        next: async (response) => data$.next(await response.json()),
        error: (error) => data$.error(error),
      })
    )
    .subscribe();
};

export const SearchService = {
  data$,
  reset$,
  search,
};

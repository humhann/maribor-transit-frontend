import { useCallback, useEffect, useState } from 'react';

import { useObservableState } from '../../hooks/useObservableState';
import { SearchService } from '../../services/Search/SearchService';
import { Station, SearchResults } from '../../services/Search/SearchService.d';

const INITIAL_SEARCH_RESULTS_DATA: SearchResults = {
  // resultsTotalCount: 0,
  resultsTotalCount: 1,
  stations: [],
  // stations: [
  //   {
  //     id: 1,
  //     name: 'AP Mlinska (glavna avtobusna postaja Maribor)',
  //     coordinates: { latitude: 10000, longitude: 20000 },
  //     distance: 2300,
  //   },
  // ],
};

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);
  const searchResultsData = useObservableState(
    SearchService.data$,
    INITIAL_SEARCH_RESULTS_DATA
  );
  const { resultsTotalCount, stations } = searchResultsData;

  // TODO: renders twice on every user input, see if could improve
  console.count('SearchComponent rendered');

  const onSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  useEffect(() => {
    SearchService.search({ searchTerm });
    setResultsVisible(true);
  }, [searchTerm]);

  // useEffect(() => {
  // const data$ = SearchService.data$.pipe(
  //   tap((data) => {
  //     console.log(data);
  //     setSearchResultData(data);
  //   })
  //   // TODO: could writer simpler, like so:
  //   // tap(setSearchResultData)
  // );
  // const reset$ = SearchService.reset$.pipe(
  //   tap(() => setSearchResultData(INITIAL_SEARCH_RESULTS_DATA))
  // );
  // const subscription = merge(data$, reset$).subscribe();
  // return () => {
  //   subscription.unsubscribe();
  // };
  // }, []);

  return (
    <>
      <input
        type="text"
        name="searchTerm"
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      {resultsVisible && resultsTotalCount > 0 ? (
        <>
          <p>Total results {resultsTotalCount}</p>
          <ul>
            {stations?.map(({ id, name, coordinates, distance }: Station) => (
              <li key={id}>
                {name} {distance} from here
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};

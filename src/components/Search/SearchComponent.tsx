import React, { useCallback, useContext, useEffect, useState } from 'react';
import { merge, tap } from 'rxjs';

import {
  SearchResults,
  SearchServiceContext,
  Station,
} from '../../services/Search/SearchService';

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
  const searchService = useContext(SearchServiceContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchResultsData, setSearchResultData] = useState(
    INITIAL_SEARCH_RESULTS_DATA
  );
  const { resultsTotalCount, stations } = searchResultsData;

  const onSearchTermChange = useCallback(
    (event) => {
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);
      searchService.search({ searchTerm });
      setResultsVisible(true);
    },
    [searchService]
  );

  useEffect(() => {
    const data$ = searchService.data$.pipe(
      tap((data) => {
        console.log(data);
        setSearchResultData(data);
      })
    );
    const reset$ = searchService.reset$.pipe(
      tap(() => setSearchResultData(INITIAL_SEARCH_RESULTS_DATA))
    );
    const subscription = merge(data$, reset$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [searchService]);

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

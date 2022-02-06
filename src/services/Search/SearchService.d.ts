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

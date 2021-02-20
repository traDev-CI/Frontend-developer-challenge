export const FETCH_SHOWS = 'FETCH_SHOWS';

export const fetchShows = shows => {
  return { type: FETCH_SHOWS, payload: shows };
};

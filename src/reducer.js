import { FETCH_SHOWS } from './components/actions';

const initialState = {
  shows: []
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case FETCH_SHOWS:
      return { ...state, shows: payload };
    default:
      return state;
  }
};

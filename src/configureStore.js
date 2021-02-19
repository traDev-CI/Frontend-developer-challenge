import { compose, createStore } from 'redux';
import reducer from './reducer';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : a => a
    )
  );
  return store;
}

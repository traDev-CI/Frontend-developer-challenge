import reducer from '../reducer';

describe('algo', () => {
  it('should run', () => {
    const response = reducer(undefined, { payload: null, type: null });
    expect(response).toEqual({ shows: [] });
  });
});

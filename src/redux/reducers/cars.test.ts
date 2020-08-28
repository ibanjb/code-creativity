import reducer, { initialState } from './cars';
import * as actions from '../actions/cars';

describe('Cars reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Fetch cars from API', () => {
    it('enables the property loading', () => {
      expect(reducer(initialState, actions.fetchCarsRequest())).toEqual({
        ...initialState,
        loading: true,
      });
    });
    it('retrieves a cars list succesfully and disables the property loading', () => {
      const mockCarList = [{ id: 1, make: 'alfa-romeo', model: 'spider' }];
      expect(
        reducer(initialState, actions.fetchCarsSuccess([mockCarList]))
      ).toEqual({
        ...initialState,
        loading: false,
        list: [mockCarList],
      });
    });

    it('receives a failure retrieving a list of cars and disables the property loading', () => {
      expect(reducer(initialState, actions.fetchCarsFailure(null))).toEqual({
        ...initialState,
        loading: false,
        list: [],
      });
    });
  });

  describe('Comparison', () => {
    let mockState: any;

    let carMock = {
      id: 1,
      make: 'alfa-romeo',
      model: 'spider',
      selectedToCompare: false,
    };

    beforeEach(() => {
      mockState = {
        ...initialState,
        list: [carMock],
      };
    });

    it('add car to comparison', () => {
      const expectedCar = { ...carMock, selectedToCompare: true };
      expect(reducer(mockState, actions.addCarToComparison(1))).toEqual({
        ...initialState,
        loading: false,
        list: [expectedCar],
      });
    });
    it('removes car from comparison', () => {
      const expectedCar = { ...carMock, selectedToCompare: false };
      expect(reducer(mockState, actions.removeCarFromComparison(1))).toEqual({
        ...initialState,
        loading: false,
        list: [expectedCar],
      });
    });
  });
});

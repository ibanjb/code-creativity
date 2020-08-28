import * as types from '../types/cars';

export const fetchCarsRequest = () => ({
  type: types.FETCH_CARS_REQUEST,
});

export const fetchCarsSuccess = (cars: any) => ({
  type: types.FETCH_CARS_SUCCESS,
  cars,
});

export const fetchCarsFailure = (e: any) => ({
  type: types.FETCH_CARS_FAILURE,
  error: e,
});

export const addCarToComparison = (carId: number) => ({
  type: types.ADD_CAR_TO_COMPARE,
  carId,
});

export const removeCarFromComparison = (carId: number) => ({
  type: types.REMOVE_CAR_FROM_COMPARE,
  carId,
});

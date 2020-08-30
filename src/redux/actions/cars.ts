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

export const fetchCreateCarRequest = () => ({
  type: types.CREATE_CAR_REQUEST,
});

export const fetchCreateCarFailure = (e: any) => ({
  type: types.CREATE_CAR_FAILURE,
  error: e,
});

export const fetchCreateCarSuccess = (
  manufacturer: string,
  model: string,
  image: string,
  productionYear: string,
  horsepower: string,
  price: string
) => ({
  type: types.CREATE_CAR_SUCCESS,
  manufacturer,
  model,
  image,
  productionYear,
  horsepower,
  price,
});

export const fetchUpdateCarRequest = () => ({
  type: types.UPDATE_CAR_REQUEST,
});

export const fetchUpdateCarFailure = (e: any) => ({
  type: types.UPDATE_CAR_FAILURE,
  error: e,
});

export const fetchUpdateCarSuccess = (
  carId: number,
  manufacturer: string,
  model: string,
  image: string,
  productionYear: string,
  horsepower: string,
  price: string
) => ({
  type: types.UPDATE_CAR_SUCCESS,
  carId,
  manufacturer,
  model,
  image,
  productionYear,
  horsepower,
  price,
});

export const fetchDeleteCarRequest = () => ({
  type: types.DELETE_CAR_REQUEST,
});

export const fetchDeleteCarFailure = (e: any) => ({
  type: types.DELETE_CAR_FAILURE,
  error: e,
});

export const fetchDeleteCarSuccess = (carId: number) => ({
  type: types.DELETE_CAR_SUCCESS,
  carId,
});

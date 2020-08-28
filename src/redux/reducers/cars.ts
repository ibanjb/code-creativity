import * as types from '../types/cars';

interface ICarList {
  year: number;
  id: number;
  horsepower: number;
  make: string;
  model: string;
  price: number;
  img_url: string;
  selectedToCompare: boolean;
}

interface IState {
  list: ICarList[];
  loading: boolean;
}

export const initialState: IState = {
  list: [],
  loading: false,
};

const cars = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_CARS_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.cars,
      };
    case types.FETCH_CARS_FAILURE:
      return { ...state, loading: false, list: [] };
    case types.ADD_CAR_TO_COMPARE:
      return {
        ...state,
        list: state.list.map((car) =>
          car.id === action.carId ? { ...car, selectedToCompare: true } : car
        ),
      };
    case types.REMOVE_CAR_FROM_COMPARE:
      return {
        ...state,
        list: state.list.map((car) =>
          car.id === action.carId ? { ...car, selectedToCompare: false } : car
        ),
      };
    default:
      return { ...state };
  }
};

export default cars;

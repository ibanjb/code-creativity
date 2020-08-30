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
    case types.CREATE_CAR_SUCCESS:
      const createList = [...state.list];
      createList.unshift({
        id: new Date().getTime(),
        make: action.manufacturer,
        model: action.model,
        img_url: action.image,
        year: action.productionYear,
        horsepower: action.horsepower,
        price: action.price,
        selectedToCompare: false,
      });
      return {
        ...state,
        list: createList,
      };
    case types.UPDATE_CAR_SUCCESS:
      const updateList = [...state.list];
      let car = updateList.find((x) => x.id === action.carId);
      if (car) {
        car.make = action.manufacturer;
        car.model = action.model;
        car.img_url = action.image;
        car.year = action.productionYear;
        car.horsepower = action.horsepower;
        car.price = action.price;
      }
      return { ...state, list: updateList };
    case types.DELETE_CAR_SUCCESS:
      const deleteList = [
        ...state.list.filter((car) => car.id !== action.carId),
      ];
      return {
        ...state,
        list: deleteList,
      };
    default:
      return { ...state };
  }
};

export default cars;

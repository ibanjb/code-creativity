import {
  fetchCarsSuccess,
  fetchCarsFailure,
  fetchCarsRequest,
} from '../actions/cars';

export const thunkFetchCars = (uri: string) => async (dispatch: any) => {
  dispatch(fetchCarsRequest());
  try {
    const response = await fetch(uri);
    const jsonResponse = await response.json();
    dispatch(fetchCarsSuccess(jsonResponse));
  } catch (e) {
    dispatch(fetchCarsFailure(e));
  }
};

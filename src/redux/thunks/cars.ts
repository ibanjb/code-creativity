import {
  fetchCarsSuccess,
  fetchCarsFailure,
  fetchCarsRequest,
  fetchCreateCarRequest,
  fetchCreateCarSuccess,
  fetchCreateCarFailure,
  fetchUpdateCarRequest,
  fetchUpdateCarSuccess,
  fetchUpdateCarFailure,
  fetchDeleteCarSuccess,
  fetchDeleteCarRequest,
  fetchDeleteCarFailure,
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

export const thunkPostCar = (
  uri: string,
  manufacturer: string,
  model: string,
  image: string,
  productionYear: string,
  horsepower: string,
  price: string
) => async (dispatch: any) => {
  dispatch(fetchCreateCarRequest());
  try {
    const dataModel = {
      year: productionYear,
      id: new Date().getTime(),
      horsepower,
      make: manufacturer,
      model,
      price,
      img_url: image,
    };
    await fetch(uri, {
      method: 'POST',
      body: JSON.stringify(dataModel),
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(
      fetchCreateCarSuccess(
        manufacturer,
        model,
        image,
        productionYear,
        horsepower,
        price
      )
    );
  } catch (e) {
    dispatch(fetchCreateCarFailure(e));
  }
};

export const thunkPatchCar = (
  uri: string,
  carId: number,
  manufacturer: string,
  model: string,
  image: string,
  productionYear: string,
  horsepower: string,
  price: string
) => async (dispatch: any) => {
  dispatch(fetchUpdateCarRequest());
  try {
    const putUri = `${uri}/${carId}`;
    const dataModel = {
      year: productionYear,
      id: carId,
      horsepower,
      make: manufacturer,
      model,
      price,
      img_url: image,
    };
    await fetch(putUri, {
      method: 'PATCH',
      body: JSON.stringify(dataModel),
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(
      fetchUpdateCarSuccess(
        carId,
        manufacturer,
        model,
        image,
        productionYear,
        horsepower,
        price
      )
    );
  } catch (e) {
    dispatch(fetchUpdateCarFailure(e));
  }
};

export const thunkDeleteCar = (uri: string, carId: number) => async (
  dispatch: any
) => {
  dispatch(fetchDeleteCarRequest());
  try {
    const deleteUri = `${uri}/${carId}`;
    await fetch(deleteUri, { method: 'DELETE' });
    dispatch(fetchDeleteCarSuccess(carId));
  } catch (e) {
    dispatch(fetchDeleteCarFailure(e));
  }
};

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const imageMock =
  'http://ts2.mm.bing.net/th?id=OIP.M2dee910aeb9f8d822763a1e469b3bf07H0&pid=15.1';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    marginBottom: 20,
  },
}));

export default function CreateCar(props: {
  modalVisible: boolean;
  onModalVisibility: Function;
  onCreateCarSubmit: Function;
  title: string;
  car: any;
}) {
  const {
    modalVisible,
    onModalVisibility,
    onCreateCarSubmit,
    title,
    car,
  } = props;
  const classes = useStyles();

  const [actionTitleButton, setActionTitleButton] = React.useState('Add');
  const [validationError, setValidationError] = React.useState(false);
  const [manufacturer, setManufacturer] = React.useState('');
  const [model, setModel] = React.useState('');
  const [image, setImage] = React.useState(imageMock);
  const [year, setYear] = React.useState('');
  const [horsepower, setHorsepower] = React.useState('');
  const [price, setPrice] = React.useState('');

  React.useEffect(() => {
    if (car) {
      setManufacturer(car.make);
      setModel(car.model);
      setImage(car.img_url);
      setYear(car.year);
      setHorsepower(car.horsepower);
      setPrice(car.price);
      setActionTitleButton('Update');
    } else {
      setManufacturer('');
      setModel('');
      setImage(imageMock);
      setYear('');
      setHorsepower('');
      setPrice('');
      setActionTitleButton('Add');
    }
  }, [car]);

  const handleClose = React.useCallback(() => {
    onModalVisibility(false);
  }, [onModalVisibility]);

  const handleManufacturer = React.useCallback((e: any) => {
    setManufacturer(e.target.value);
  }, []);

  const handleModel = React.useCallback((e: any) => {
    setModel(e.target.value);
  }, []);

  const handleImage = React.useCallback((e: any) => {
    setImage(e.target.value);
  }, []);

  const handleYear = React.useCallback((e: any) => {
    setYear(e.target.value);
  }, []);

  const handleHorsepower = React.useCallback((e: any) => {
    setHorsepower(e.target.value);
  }, []);

  const handlePrice = React.useCallback((e: any) => {
    setPrice(e.target.value);
  }, []);

  const handleAdd = () => {
    if (
      manufacturer !== '' &&
      model !== '' &&
      image !== '' &&
      year !== '' &&
      horsepower !== '' &&
      price !== ''
    ) {
      setValidationError(false);
      onCreateCarSubmit(
        car ? car.id : 0,
        manufacturer,
        model,
        image,
        year,
        horsepower,
        price,
        car ? false : true
      );
    } else {
      setValidationError(true);
    }
  };

  return (
    <Dialog
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      data-testid="create-car-modal"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: validationError ? 'red' : '' }}>
          (*) You must fill all the fields
        </DialogContentText>
        <div className={classes.fieldContainer}>
          <TextField
            autoFocus
            margin="dense"
            id="make"
            label="Manufacturer"
            type="text"
            fullWidth
            required
            value={manufacturer}
            onChange={handleManufacturer}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id="model"
            label="Model"
            type="text"
            fullWidth
            required
            value={model}
            onChange={handleModel}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            required
            value={image}
            onChange={handleImage}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id="model"
            label="Production Year"
            type="text"
            value={year}
            required
            onChange={handleYear}
          />
          <TextField
            id="horsepower"
            label="Horse power"
            type="text"
            value={horsepower}
            required
            onChange={handleHorsepower}
          />
          <TextField
            id="price"
            label="Price"
            type="money"
            value={price}
            required
            onChange={handlePrice}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          {actionTitleButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

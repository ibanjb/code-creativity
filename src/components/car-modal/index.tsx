import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 3,
    margin: 5,
  },
  image: {
    maxWidth: 350,
    height: 'auto',
  },
  description: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    margin: 40,
  },
}));

export default function CarModal(props: {
  car: any;
  modalVisible: boolean;
  onModalVisibility: Function;
}) {
  const { car, modalVisible, onModalVisibility } = props;
  const classes = useStyles();

  const handleClose = React.useCallback(() => {
    onModalVisibility(false);
  }, [onModalVisibility]);

  return (
    <Dialog
      data-testid="car-modal-card"
      className={classes.modal}
      open={modalVisible}
      onClose={handleClose}
    >
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={car.img_url} alt={car.make} />
        </div>
        <div className={classes.description}>
          <div>
            <Typography variant="subtitle1">
              {`Model: ${car.make} ${car.model}`}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              {`Production year: ${car.year}`}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle1">
              {`HP: ${car.horsepower}`}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle1">{`Price: ${car.price}€`}</Typography>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

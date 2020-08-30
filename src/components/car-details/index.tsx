import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CarModal from '../car-modal';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  media: {
    height: 220,
    backgroundPosition: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: '20.50%',
  },
  icon: {
    fontSize: 50,
  },
  actionCompare: {
    flex: 2,
  },
  actionCrud: {
    flex: 1,
  },
  description: {
    marginTop: 40,
  },
});

export default function CarDetails(props: {
  car: any;
  onCarSelected?: Function;
  onCarUnselected?: Function;
  onCarUpdate?: Function;
  onCarDelete?: Function;
  currentTheme: string;
  isFullList?: boolean;
  extendedInfo?: boolean;
}) {
  const {
    car,
    onCarSelected,
    onCarUnselected,
    onCarUpdate,
    onCarDelete,
    currentTheme,
    isFullList,
    extendedInfo,
  } = props;
  const classes = useStyles();

  const [modalVisible, setModalVisibility] = useState(false);

  const handleAddToCompareButton = React.useCallback(() => {
    if (onCarSelected) {
      onCarSelected(car.id);
    }
  }, [onCarSelected, car]);

  const handleRemoveCompareButton = React.useCallback(() => {
    if (onCarUnselected) {
      onCarUnselected(car.id);
    }
  }, [onCarUnselected, car]);

  const handleUpdateCar = React.useCallback(() => {
    if (onCarUpdate) {
      onCarUpdate(car);
    }
  }, [onCarUpdate, car]);

  const handleDeleteCar = React.useCallback(() => {
    if (onCarDelete) {
      onCarDelete(car.id);
    }
  }, [onCarDelete, car]);

  const handleModalVisibility = React.useCallback(
    (visibility) => {
      setModalVisibility(visibility);
    },
    [setModalVisibility]
  );

  const renderExtendedInformation = () => {
    return (
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
          <Typography variant="subtitle1">{`HP: ${car.horsepower}`}</Typography>
        </div>

        <div>
          <Typography variant="subtitle1">{`Price: ${car.price}€`}</Typography>
        </div>
      </div>
    );
  };

  return (
    <>
      {car.selectedToCompare && (
        <div className={classes.iconContainer}>
          <CheckIcon
            data-testid="car-details-check-icon"
            color="primary"
            className={classes.icon}
          />
        </div>
      )}
      <Card className={classes.root} data-testid="car-details-card">
        <CardActionArea onClick={() => handleModalVisibility(true)}>
          <CardMedia
            className={classes.media}
            style={{ filter: currentTheme === 'dark' ? 'grayscale(100%)' : '' }}
            image={car.img_url}
            title={car.make + car.model}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${car.make} ${car.model}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </Typography>
            {extendedInfo && renderExtendedInformation()}
          </CardContent>
        </CardActionArea>
        {isFullList && (
          <CardActions>
            {!car.selectedToCompare && (
              <div className={classes.actionCompare}>
                <Button
                  size="small"
                  color="secondary"
                  onClick={handleAddToCompareButton}
                  data-testid="car-details-add-button"
                >
                  Add to compare
                </Button>
              </div>
            )}

            {car.selectedToCompare && (
              <div className={classes.actionCompare}>
                <Button
                  size="small"
                  color="secondary"
                  onClick={handleRemoveCompareButton}
                  data-testid="car-details-remove-button"
                >
                  Remove from comparison
                </Button>
              </div>
            )}
            <div className={classes.actionCrud}>
              <Tooltip id="button-report" title="Modify">
                <IconButton color="inherit" onClick={handleUpdateCar}>
                  <EditIcon
                    data-testid="car-details-update-icon"
                    color="primary"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip id="button-report" title="Delete">
                <IconButton color="inherit" onClick={handleDeleteCar}>
                  <DeleteIcon
                    data-testid="car-details-delete-icon"
                    color="primary"
                  />
                </IconButton>
              </Tooltip>
            </div>
          </CardActions>
        )}
      </Card>
      <CarModal
        car={car}
        modalVisible={modalVisible}
        onModalVisibility={handleModalVisibility}
      />
    </>
  );
}

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
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
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
});

export default function CarDetails(props: any) {
  const {
    car,
    onCarSelected,
    onCarUnselected,
    currentTheme,
    isFullList,
  } = props;
  const classes = useStyles();

  const [modalVisible, setModalVisibility] = useState(false);

  const handleAddToCompareButton = React.useCallback(() => {
    onCarSelected(car.id);
  }, [onCarSelected, car]);

  const handleRemoveCompareButton = React.useCallback(() => {
    onCarUnselected(car.id);
  }, [onCarUnselected, car]);

  const handleModalVisibility = React.useCallback(
    (visibility) => {
      setModalVisibility(visibility);
    },
    [setModalVisibility]
  );

  return (
    <>
      {car.selectedToCompare && (
        <div className={classes.iconContainer}>
          <CheckIcon color="primary" className={classes.icon} />
        </div>
      )}
      <Card className={classes.root}>
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
          </CardContent>
        </CardActionArea>
        {isFullList && (
          <CardActions>
            {!car.selectedToCompare && (
              <Button
                size="small"
                color="secondary"
                onClick={handleAddToCompareButton}
              >
                Add to compare
              </Button>
            )}

            {car.selectedToCompare && (
              <Button
                size="small"
                color="secondary"
                onClick={handleRemoveCompareButton}
              >
                Remove from comparison
              </Button>
            )}
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

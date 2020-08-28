import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';
import CarDetails from '../../components/car-details';
import Loading from '../../components/loading';
import Header from '../../features/header';
import { thunkFetchCars } from '../../redux/thunks/cars';
import {
  addCarToComparison,
  removeCarFromComparison,
} from '../../redux/actions/cars';

const uri = 'http://localhost:3001/cars'; // TODO: This must be changed by a environment variable (for ex.)

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridContainer: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  loading: {
    minHeight: 500,
    marginTop: '20%',
    marginLeft: '50%',
  },
}));

const Home = (props: any) => {
  const classes = useStyles();
  const [carsList, setCarsList] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [comparisonCarsNumber, setComparisonCarsNumber] = useState(0);
  const { cars, onOpenHome, onCarSelected, onCarUnselected, loading } = props;

  React.useEffect(() => {
    onOpenHome(uri);
  }, [onOpenHome]);

  React.useMemo(() => {
    setCarsList(cars);
  }, [cars]);

  React.useEffect(() => {
    const items = cars.filter(
      (x: { selectedToCompare: boolean }) => x.selectedToCompare
    ).length;
    setComparisonCarsNumber(items);
  }, [cars]);

  const handleSelectedTheme = React.useCallback((theme) => {
    setCurrentTheme(theme);
  }, []);

  const handleSearchChange = React.useCallback(
    (searchValue) => {
      const filterCars = cars.filter(
        (x: any) =>
          x.model.indexOf(searchValue) !== -1 ||
          x.make.indexOf(searchValue) !== -1
      );
      setCarsList(filterCars);
    },
    [setCarsList, cars]
  );

  const headerTitle = (selectedNumber: number) => {
    if (selectedNumber <= 0) {
      return null;
    }
    return (
      <>
        <IconButton color="inherit">
          <Link
            to="/comparison"
            style={{ color: currentTheme === 'dark' ? 'black' : 'white' }}
          >
            <CompareIcon fontSize="large" />
          </Link>
        </IconButton>
        <Typography variant="subtitle2" className={classes.title}>
          {`${selectedNumber} selected to compare`}
        </Typography>
      </>
    );
  };

  return (
    <Header
      title={headerTitle(comparisonCarsNumber)}
      selectedTheme={handleSelectedTheme}
      onSearchChange={handleSearchChange}
    >
      {loading && (
        <div className={classes.loading}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className={classes.container}>
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {carsList.map((car: any) => (
                  <Grid key={car.id} item>
                    <CarDetails
                      car={car}
                      onCarSelected={onCarSelected}
                      onCarUnselected={onCarUnselected}
                      currentTheme={currentTheme}
                      isFullList
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Header>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  onOpenHome: async (uri: string) => {
    await dispatch(thunkFetchCars(uri));
  },
  onCarSelected: async (carId: number) => {
    await dispatch(addCarToComparison(carId));
  },
  onCarUnselected: async (carId: number) => {
    await dispatch(removeCarFromComparison(carId));
  },
});

const mapStateToProps = (state: any) => {
  return {
    cars: state.cars.list,
    loading: state.cars.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

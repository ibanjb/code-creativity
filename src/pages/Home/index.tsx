import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton, Snackbar } from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';
import CarDetails from '../../components/car-details';
import Loading from '../../components/loading';
import CreateCarModal from '../../components/create-car';
import CommonDialog from '../../components/common-dialog';
import Header from '../../features/header';
import {
  thunkFetchCars,
  thunkPostCar,
  thunkPatchCar,
  thunkDeleteCar,
} from '../../redux/thunks/cars';
import {
  addCarToComparison,
  removeCarFromComparison,
} from '../../redux/actions/cars';

const uri = 'http://localhost:3001/cars'; // TODO: This must be changed by a environment variable (for ex.)

const addCar = 'Create  a new  car for the comparison';
const updateCar = 'Update car';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 600,
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
  const [carModalTitle, setCarModalTitle] = useState(addCar);
  const [createCarVisible, setCreateCarVisible] = useState(false);
  const [deleteCarVisible, setDeleteCarVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [comparisonCarsNumber, setComparisonCarsNumber] = useState(0);
  const {
    cars,
    onOpenHome,
    onCarSelected,
    onCarUnselected,
    loading,
    onCreateCar,
    OnUpdateCar,
    onDeleteCar,
  } = props;

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

  const handleCreateCarVisibililty = React.useCallback(
    (visible) => {
      setCreateCarVisible(visible);
    },
    [setCreateCarVisible]
  );

  const handleCarCreate = React.useCallback(
    (carId) => {
      setCarModalTitle(addCar);
      setCreateCarVisible(true);
      setSelectedCar(null);
    },
    [setCreateCarVisible]
  );

  const handleCarUpdate = React.useCallback(
    (car: any) => {
      setCarModalTitle(updateCar);
      setSelectedCar(car);
      setCreateCarVisible(true);
    },
    [setCreateCarVisible]
  );

  const handleCarDelete = React.useCallback((carId) => {
    setDeleteCarVisible(true);
    setSelectedCar(carId);
  }, []);

  const handleCarDeleteAcceptButton = (carId: number) => {
    setDeleteCarVisible(false);
    onDeleteCar(uri, selectedCar);
    setSelectedCar(null);
    setOpenSnackbar(true);
  };

  const handleCarDeleteCancelButton = () => {
    setDeleteCarVisible(false);
    setSelectedCar(null);
  };

  const handleCreateCarSubmit = React.useCallback(
    (
      id: number,
      manufacturer: string,
      model: string,
      image: string,
      productionYear: string,
      horsepower: string,
      price: string,
      createCar: boolean
    ) => {
      if (createCar) {
        onCreateCar(
          uri,
          manufacturer,
          model,
          image,
          productionYear,
          horsepower,
          price
        );
      } else {
        OnUpdateCar(
          uri,
          id,
          manufacturer,
          model,
          image,
          productionYear,
          horsepower,
          price
        );
      }

      setCreateCarVisible(false);
    },
    [onCreateCar, OnUpdateCar]
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
      onCarCreate={handleCarCreate}
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
                      onCarUpdate={handleCarUpdate}
                      onCarDelete={handleCarDelete}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      <CreateCarModal
        modalVisible={createCarVisible}
        onModalVisibility={handleCreateCarVisibililty}
        onCreateCarSubmit={handleCreateCarSubmit}
        title={carModalTitle}
        car={selectedCar}
      />
      <CommonDialog
        title="Are you sure to delete this car?"
        description="This action can not be undone"
        visible={deleteCarVisible}
        onAccept={handleCarDeleteAcceptButton}
        onCancel={handleCarDeleteCancelButton}
        acceptButton="Yes"
        cancelButton="No"
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        message="Action done!"
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      />
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
  onCreateCar: async (
    uri: string,
    manufacturer: string,
    model: string,
    image: string,
    productionYear: string,
    horsepower: string,
    price: string
  ) => {
    await dispatch(
      thunkPostCar(
        uri,
        manufacturer,
        model,
        image,
        productionYear,
        horsepower,
        price
      )
    );
  },
  OnUpdateCar: async (
    uri: string,
    carId: number,
    manufacturer: string,
    model: string,
    image: string,
    productionYear: string,
    horsepower: string,
    price: string
  ) => {
    await dispatch(
      thunkPatchCar(
        uri,
        carId,
        manufacturer,
        model,
        image,
        productionYear,
        horsepower,
        price
      )
    );
  },
  onDeleteCar: async (uri: string, carId: number) => {
    await dispatch(thunkDeleteCar(uri, carId));
  },
});

const mapStateToProps = (state: any) => {
  return {
    cars: state.cars.list,
    loading: state.cars.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CarDetails from '../../components/car-details';
import Header from '../../features/header';

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
}));

const Comparison = (props: { cars: any }) => {
  const classes = useStyles();
  const [currentTheme, setCurrentTheme] = useState('light');
  const { cars } = props;

  const handleSelectedTheme = React.useCallback((theme) => {
    setCurrentTheme(theme);
  }, []);

  const listItems = React.useMemo(() => {
    return cars.map((car: any) => {
      if (car.selectedToCompare) {
        return (
          <Grid key={car.id} item>
            <CarDetails car={car} currentTheme={currentTheme} />
          </Grid>
        );
      }
      return null;
    });
  }, [cars, currentTheme]);

  const headerTitle = () => {
    return (
      <>
        <IconButton color="inherit">
          <Link
            to="/"
            style={{ color: currentTheme === 'dark' ? 'black' : 'white' }}
          >
            <ArrowBack fontSize="large" />
          </Link>
        </IconButton>
        <Typography variant="subtitle1" className={classes.title}>
          Car's comparisor
        </Typography>
      </>
    );
  };

  return (
    <Header
      title={headerTitle()}
      selectedTheme={handleSelectedTheme}
      hideSearch
      onSearchChange={null}
    >
      <div className={classes.container}>
        <Grid container className={classes.gridContainer} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {listItems}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cars: state.cars.list,
  };
};

export default connect(mapStateToProps)(Comparison);

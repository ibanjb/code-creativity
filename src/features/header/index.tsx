import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, grey } from '@material-ui/core/colors';
import { AppBar, Typography, Switch, Button } from '@material-ui/core';
import SearchBox from '../../components/search-box';

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'flex-end',
  },
  createButton: {
    marginRight: 20,
  },
}));

export default function Header(props: {
  children: React.ReactNode;
  title: React.ReactNode;
  selectedTheme: Function;
  hideSearch?: boolean;
  onSearchChange: any;
  onCreateCarClick?: any;
  onCarCreate?: Function;
}) {
  const {
    children,
    title,
    selectedTheme,
    hideSearch,
    onSearchChange,
    onCarCreate,
  } = props;
  const classes = useStyles();
  const [currentPalette, setPalette] = useState(false);
  const palletType = currentPalette ? 'dark' : 'light';
  const mainPrimary = currentPalette ? grey[400] : indigo[500];
  const mainSecondary = currentPalette ? grey[50] : indigo[500];
  const customTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimary,
      },
      secondary: {
        main: mainSecondary,
      },
    },
  });
  const handleThemeChange = () => {
    setPalette(!currentPalette);
    selectedTheme(!currentPalette ? 'dark' : 'light');
  };

  const handleCreateCarClick = React.useCallback(() => {
    if (onCarCreate) {
      onCarCreate();
    }
  }, [onCarCreate]);

  return (
    <div
      data-testid="header-container"
      style={{ backgroundColor: currentPalette ? '#eeeeee' : '#e3f2fd' }}
    >
      <ThemeProvider theme={customTheme}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            {title}
            <div className={classes.createButton}>
              <Button variant="contained" onClick={handleCreateCarClick}>
                Add new car
              </Button>
            </div>
            <Typography variant="subtitle2">Change palette</Typography>
            <Switch checked={currentPalette} onChange={handleThemeChange} />
            {!hideSearch && <SearchBox onSearchChange={onSearchChange} />}
          </Toolbar>
        </AppBar>
        {children}
      </ThemeProvider>
    </div>
  );
}

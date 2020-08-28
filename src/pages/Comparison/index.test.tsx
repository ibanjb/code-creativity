import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import allReducers from '../../redux/reducers';
import Comparison from './index';

let props = {};

const renderComponent = (changedProps = {}) => {
  props = { ...props, ...changedProps };
  const store = createStore(allReducers);
  return render(
    <Provider store={store}>
      <Router>
        <Comparison {...props} />
      </Router>
    </Provider>
  );
};

test('renders learn react link', () => {
  const { getByText } = renderComponent();
  const linkElement = getByText('Change palette');
  expect(linkElement).toBeInTheDocument();
});

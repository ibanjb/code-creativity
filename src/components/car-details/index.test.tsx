import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CarDetails from './index';

describe('CarDetails component', () => {
  let props: any = {};
  let carMock = {
    id: 1,
    make: 'alfa-romeo',
    model: 'spider',
    selectedToCompare: false,
    img_url: 'http://www.images.com/1.jpg',
  };

  const renderComponent = (changedProps = {}) => {
    props = { ...props, ...changedProps };
    return render(<CarDetails {...props} />);
  };

  beforeEach(() => {
    props.car = carMock;
    props.onCarSelected = jest.fn();
    props.onCarUnselected = jest.fn();
    props.currentTheme = '';
    props.isFullList = true;
  });

  it('renders the car details with the expected description', () => {
    carMock.selectedToCompare = true;
    const { queryByTestId } = renderComponent({ car: carMock });
    expect(queryByTestId('car-details-card')).toBeInTheDocument();
  });

  it('renders a check icon if the car was selected', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('car-details-check-icon')).toBeInTheDocument();
  });

  it('calls "handleAddToCompareButton" prop on add to compare button click', () => {
    carMock.selectedToCompare = false;
    const { queryByTestId } = renderComponent({ car: carMock });
    fireEvent.click(queryByTestId('car-details-add-button'));
    expect(props.onCarSelected).toHaveBeenCalledTimes(1);
  });

  it('calls "handleAddToCompareButton" prop on add to compare button click', () => {
    carMock.selectedToCompare = true;
    const { queryByTestId } = renderComponent({ car: carMock });
    fireEvent.click(queryByTestId('car-details-remove-button'));
    expect(props.onCarUnselected).toHaveBeenCalledTimes(1);
  });
});

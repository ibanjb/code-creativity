import React from 'react';
import { render } from '@testing-library/react';
import CarModal from './index';

describe('CarModal component', () => {
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
    return render(<CarModal {...props} />);
  };

  beforeEach(() => {
    props.car = carMock;
    props.modalVisible = true;
    props.onModalVisibility = jest.fn();
    props.onCreateCarSubmit = jest.fn();
    props.title = '';
    props.car = undefined;
  });

  it('renders the car modal', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('create-car-modal')).toBeInTheDocument();
  });

  it('does not render the car modal', () => {
    const { queryByTestId } = renderComponent({ modalVisible: false });
    expect(queryByTestId('create-car-modal')).not.toBeInTheDocument();
  });
});

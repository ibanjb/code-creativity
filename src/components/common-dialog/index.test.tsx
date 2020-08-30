import React from 'react';
import { render } from '@testing-library/react';
import CommonDialog from './index';

describe('CommonDialog component', () => {
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
    return render(<CommonDialog {...props} />);
  };

  beforeEach(() => {
    props.visible = true;
    props.onCancel = jest.fn();
    props.onAccept = jest.fn();
    props.title = 'title';
    props.description = 'description';
    props.acceptButton = 'accept';
    props.cancelButton = 'cancel';
  });

  it('renders the car modal', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('common-dialog-id')).toBeInTheDocument();
  });

  it('does not render the car modal', () => {
    const { queryByTestId } = renderComponent({ visible: false });
    expect(queryByTestId('common-dialog-id')).not.toBeInTheDocument();
  });
});

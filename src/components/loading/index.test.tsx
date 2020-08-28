import React from 'react';
import { render } from '@testing-library/react';
import Loading from './index';

describe('Loading component', () => {
  const renderComponent = () => {
    return render(<Loading />);
  };

  it('renders the component', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('loading-circular-progress')).toBeInTheDocument();
  });
});

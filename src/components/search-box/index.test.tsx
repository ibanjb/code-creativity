import React from 'react';
import { render } from '@testing-library/react';
import SearchBox from './index';

describe('SearchBox component', () => {
  let props: any = {};

  const renderComponent = (changedProps = {}) => {
    props = { ...props, ...changedProps };
    return render(<SearchBox {...props} />);
  };

  beforeEach(() => {
    props.onSearchChange = jest.fn();
  });

  it('renders the component', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('search-box-input')).toBeInTheDocument();
  });
});

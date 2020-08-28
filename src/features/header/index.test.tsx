import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './index';

describe('Header component', () => {
  let props: any = {};

  const renderComponent = (changedProps = {}) => {
    props = { ...props, ...changedProps };
    return render(<Header {...props} />);
  };

  beforeEach(() => {
    props.children = null;
    props.title = null;
    props.selectedTheme = jest.fn();
    props.hideSearch = false;
    props.onSearchChange = jest.fn();
  });

  it('renders the component', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('header-container')).toBeInTheDocument();
  });
});

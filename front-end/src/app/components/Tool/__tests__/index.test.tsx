import React from 'react';
import { render } from '@testing-library/react';

import { Tool } from '..';

describe('<Tool  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Tool />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

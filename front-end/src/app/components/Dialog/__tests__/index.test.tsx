import React from 'react';
import { render } from '@testing-library/react';

import { Dialog } from '..';

describe('<Dialog  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Dialog />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

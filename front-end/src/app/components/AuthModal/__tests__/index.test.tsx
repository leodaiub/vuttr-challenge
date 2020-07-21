import React from 'react';
import { render } from '@testing-library/react';

import { AuthModal } from '..';

describe('<AuthModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AuthModal />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

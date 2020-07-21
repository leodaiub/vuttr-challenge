import React from 'react';
import { render } from '@testing-library/react';

import { ToolsModal } from '..';

describe('<ToolsModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ToolsModal />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

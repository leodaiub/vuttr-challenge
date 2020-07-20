import React from 'react';
import { render } from '@testing-library/react';

import { ToolsHeader } from '..';

describe('<ToolsHeader  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ToolsHeader />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

/**
 *
 * Asynchronously loads the component for Tool
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Tool = lazyLoad(
  () => import('./index'),
  module => module.Tool,
);

/**
 *
 * Asynchronously loads the component for Tools
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Tools = lazyLoad(
  () => import('./index'),
  module => module.Tools,
);

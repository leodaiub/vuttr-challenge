import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.tools || initialState;

export const selectTools = createSelector(
  [selectDomain],
  toolsState => toolsState,
);

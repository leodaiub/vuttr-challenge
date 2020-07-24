import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { toast } from 'react-toastify';
import { i18n, translations } from 'locales/i18n';
import i18next from 'i18next';

// The initial state of the Tools container
export const initialState: ContainerState = {
  tools: [],
  loading: false,
  error: '',
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    loadTools(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    toolsError(state, action: PayloadAction<any>) {
      toast.error(i18next.t('Whoops, something went wrong...'));
      state.error = action.payload;
      state.loading = false;
    },
    toolsLoaded(state, action: PayloadAction<any>) {
      state.tools = action.payload;
      state.loading = false;
    },

    createTool(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    toolCreated(state, action: PayloadAction<any>) {
      state.tools[0].unshift(action.payload);
      state.tools[1]++;
      state.loading = false;
    },
    toolCreateError(state, action: PayloadAction<any>) {
      toast.error(i18next.t('Whoops, something went wrong...'));
      state.error = action.payload;
      state.loading = false;
    },

    editTool(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    toolEdited(state, action: PayloadAction<any>) {
      let tool = state.tools[0].findIndex(
        tool => tool.id === action.payload.id,
      );
      state.tools[0][tool] = action.payload;
      state.loading = false;
    },
    toolEditError(state, action: PayloadAction<any>) {
      toast.error(i18next.t('Whoops, something went wrong...'));
      state.error = action.payload;
      state.loading = false;
    },

    deleteTool(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    toolDeleted(state, action: PayloadAction<any>) {
      state.tools[0] = state.tools[0].filter(
        tool => tool.id !== action.payload.id,
      );
      state.tools[1] = state.tools[1] -= 1;
      state.loading = false;
    },
    toolDeleteError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = toolsSlice;

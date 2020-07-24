import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { toast } from 'react-toastify';
import i18next from 'i18next';

// The initial state of the Auth container
export const initialState: ContainerState = {
  authenticated: false,
  user: {},
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth(state) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        state.loading = false;
        state.authenticated = true;
        state.user = JSON.parse(user);
      }
    },
    login(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    loggedIn(state, action: PayloadAction<any>) {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload.user;
    },
    register(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    registered(state, action: PayloadAction<any>) {
      state.loading = false;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.authenticated = false;
      state.user = {};
    },
    loading(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    errorRegistering(state, action: PayloadAction<any>) {
      toast.error(i18next.t('Whoops, something went wrong...'));
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authSlice;

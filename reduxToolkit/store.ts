import { configureStore } from '@reduxjs/toolkit';
import quotationsReducer from './slice/quotationsSlice';

const store = configureStore({
  reducer: {
	quotations: quotationsReducer,
  },
});

export default store;

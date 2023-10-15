import { configureStore } from "@reduxjs/toolkit";
import cloudApi from "./api/cloudApi";
import singersSlice from "./api/singersSlice";
import rankSlice from "./api/rankSlice";

const store = configureStore({
  reducer: {
    [cloudApi.reducerPath]: cloudApi.reducer,
    [singersSlice.name]: singersSlice.reducer,
    [rankSlice.name]: rankSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cloudApi.middleware)
  }
});

export default store;
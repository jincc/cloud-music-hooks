import { configureStore } from "@reduxjs/toolkit";
import cloudApi from "./api/cloudApi";
import singersSlice from "./api/singersSlice";
import rankSlice from "./api/rankSlice";
import recommendSlice from "./api/recommendSlice";
import searchSlice from "./api/searchSlice";

const store = configureStore({
  reducer: {
    [cloudApi.reducerPath]: cloudApi.reducer,
    [singersSlice.name]: singersSlice.reducer,
    [rankSlice.name]: rankSlice.reducer,
    [recommendSlice.name]: recommendSlice.reducer,
    [searchSlice.name]: searchSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cloudApi.middleware)
  }
});

export default store;
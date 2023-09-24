import { configureStore } from "@reduxjs/toolkit";
import cloudApi from "./api/cloudApi";

const store = configureStore({
  reducer: cloudApi.reducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cloudApi.middleware)
  }
});

export default store;
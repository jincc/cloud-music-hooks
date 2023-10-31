import { configureStore } from "@reduxjs/toolkit";
import cloudApi from "./api/cloudApi";
import singersSlice from "./api/singersSlice";
import rankSlice from "./api/rankSlice";
import recommendSlice from "./api/recommendSlice";
import searchSlice from "./api/searchSlice";
import albumSlice from "./api/albumSlice";
import singerDetailSlice from "./api/singerDetailSlice";
import playerSlice from "./api/playerSlice";

const store = configureStore({
  reducer: {
    [cloudApi.reducerPath]: cloudApi.reducer,
    [singersSlice.name]: singersSlice.reducer,
    [rankSlice.name]: rankSlice.reducer,
    [recommendSlice.name]: recommendSlice.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [albumSlice.name]: albumSlice.reducer,
    [singerDetailSlice.name]: singerDetailSlice.reducer,
    [playerSlice.name]: playerSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cloudApi.middleware)
  }
});

export default store;
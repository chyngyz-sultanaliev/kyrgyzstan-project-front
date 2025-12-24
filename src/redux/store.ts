import { configureStore } from "@reduxjs/toolkit";
import { tourApi } from "@/shared/api/tourApi";
import { carApi } from "@/shared/api/carApi";
import { hotelApi } from "@/shared/api/hotelApi";
import { newsApi } from "@/shared/api/news";

import { tourCategoryApi } from "@/shared/api/tourCategoryApi";
import { carCategoryApi } from "@/shared/api/carCategoryApi";
import { hotelCategoryApi } from "@/shared/api/hotelCategoryApi";
import { profileApi } from "@/shared/api/profileApi";
import { api } from "./api";
import { reviewApi } from "@/shared/api/reviewApi";
import { favoriteApi } from "@/shared/api/favoriteApi";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [api.reducerPath]: api.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,

    [tourCategoryApi.reducerPath]: tourCategoryApi.reducer,
    [carCategoryApi.reducerPath]: carCategoryApi.reducer,
    [hotelCategoryApi.reducerPath]: hotelCategoryApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(tourApi.middleware)
      .concat(newsApi.middleware)
      .concat(carApi.middleware)
      .concat(hotelApi.middleware)
      .concat(tourCategoryApi.middleware)
      .concat(carCategoryApi.middleware)
      .concat(hotelCategoryApi.middleware)
      .concat(profileApi.middleware)
      .concat(reviewApi.middleware)
      .concat(favoriteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

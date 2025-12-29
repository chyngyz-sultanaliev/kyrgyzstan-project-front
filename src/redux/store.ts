import { configureStore } from "@reduxjs/toolkit";
import { tourApi } from "@/shared/api/tourApi";
import { carApi } from "@/shared/api/carApi";
import { hotelApi } from "@/shared/api/hotelApi";
import { newsApi } from "@/shared/api/newsApi";
import { tourCategoryApi } from "@/shared/api/tourCategoryApi";
import { carCategoryApi } from "@/shared/api/carCategoryApi";
import { hotelCategoryApi } from "@/shared/api/hotelCategoryApi";
import { profileApi } from "@/shared/api/profileApi";
import { tourReviewApi } from "@/shared/api/tourReviewApi"; // ✅
import { api } from "./api";
import { hotelReviewApi } from "@/shared/api/hotelReviewApi";
import { favoriteApi } from "@/shared/api/favoriteApi";
import { tourDayApi } from "@/shared/api/tourDayApi";
import { carReviewApi } from "@/shared/api/carReviewApi";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [tourDayApi.reducerPath]: tourDayApi.reducer,
    [api.reducerPath]: api.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [tourCategoryApi.reducerPath]: tourCategoryApi.reducer,
    [carCategoryApi.reducerPath]: carCategoryApi.reducer,
    [hotelCategoryApi.reducerPath]: hotelCategoryApi.reducer,
    [hotelReviewApi.reducerPath]: hotelReviewApi.reducer,
    [tourReviewApi.reducerPath]: tourReviewApi.reducer,
    [carReviewApi.reducerPath]: carReviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(carReviewApi.middleware)
      .concat(tourApi.middleware)
      .concat(newsApi.middleware)
      .concat(carApi.middleware)
      .concat(hotelApi.middleware)
      .concat(tourDayApi.middleware)
      .concat(tourCategoryApi.middleware)
      .concat(carCategoryApi.middleware)
      .concat(hotelCategoryApi.middleware)
      .concat(profileApi.middleware)
      .concat(hotelReviewApi.middleware)
      .concat(favoriteApi.middleware)
      .concat(tourReviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

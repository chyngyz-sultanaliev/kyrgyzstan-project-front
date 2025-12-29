import React from "react";
import Welcome from "./Welcome";
import Popular from "./Popular";
import { hotelCategoryApi } from "@/shared/api/hotelCategoryApi";
import { hotelApi } from "@/shared/api/hotelApi";
import { store } from "@/redux/store";

const Hotel = async () => {
  const category = await store
    .dispatch(hotelCategoryApi.endpoints.getHotelCategories.initiate())
    .unwrap();
  const popular = await store
    .dispatch(hotelApi.endpoints.getHotels.initiate())
    .unwrap();
  return (
    <div>
      <Welcome category={category} />
      <Popular popular={popular} />
    </div>
  );
};

export default Hotel;

import Category from "@/components/pages/hotel/Category";
import { store } from "@/redux/store";
import { Hotel, hotelApi } from "@/shared/api/hotelApi";
import { HotelCategory, hotelCategoryApi } from "@/shared/api/hotelCategoryApi";


const page = async () => {
  const category = await store
    .dispatch(hotelCategoryApi.endpoints.getHotelCategories.initiate())
    .unwrap();
    const hotel = await store.dispatch(hotelApi.endpoints.getHotels.initiate()).unwrap();
  return <Category category={category} hotel={hotel}/>;
};

export default page;

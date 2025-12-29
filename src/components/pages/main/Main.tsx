import { store } from "@/redux/store";
import Car from "./Car";
import Hotel from "./Hotel";
import News from "./News";
import Welcome from "./Welcome";
import { TourCategory, tourCategoryApi } from "@/shared/api/tourCategoryApi";

const Main = async () => {
  const data = await store
    .dispatch(tourCategoryApi.endpoints.getTourCategories.initiate())
    .unwrap();

  return (
    <>
      <Welcome data={data as TourCategory[]} />
      <Hotel />
      <Car />
      <News />
    </>
  );
};

export default Main;

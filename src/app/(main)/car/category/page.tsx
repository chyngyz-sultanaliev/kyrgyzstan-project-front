"use client";
import Category from "@/components/pages/car/Category";
import { ReduxToolkitQuery } from "@/providers/ReduxToolkitQuery";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const page = () => {
  return (
    <>
      <ReduxToolkitQuery>
        <Category />
      </ReduxToolkitQuery>
    </>
  );
};

export default page;

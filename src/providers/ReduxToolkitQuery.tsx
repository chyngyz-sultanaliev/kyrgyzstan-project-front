"use client";
import { store } from "@/store/store";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface IReduxToolkitQueryProps {
  children: ReactNode;
}

export const ReduxToolkitQuery: FC<IReduxToolkitQueryProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

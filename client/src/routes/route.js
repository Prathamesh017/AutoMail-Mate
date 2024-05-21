import React from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
export const publicRoutes = [
  {
    path: "/",
    element: <Home/>
  },
];
export const protectedRoutes=[
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
]

export const AppRoutes = () => {
  const token=localStorage.getItem("token");
  const routes = token ? [...protectedRoutes,...publicRoutes] : publicRoutes;

  return routes;
};
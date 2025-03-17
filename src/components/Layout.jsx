import Header from "./Header";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Outlet } from "react-router-dom";
import { UserProgressContextProvider } from "../store/UserProgressContext";

export default function Layout() {
  return (
    <UserProgressContextProvider>
      <Header />
      <Cart />
      <Checkout />
      <Outlet /> {/* This will render either Mainpage or CategoryMeals */}
    </UserProgressContextProvider>
  );
}

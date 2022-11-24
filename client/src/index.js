import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import getUserFromCache from "./utils/getUserFromCache";
import { useDispatch } from "react-redux";
import { setCart } from "./redux/action";
import axios from "axios";

import {
    Home,
    Product,
    Products,
    AboutPage,
    ContactPage,
    Cart,
    Login,
    Register,
    Checkout,
    PageNotFound,
} from "./pages";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
      const user = getUserFromCache();
      if (user) {
        axios.post(process.env.REACT_APP_SERVER_URL + '/api/getCart', { username: user })
          .then(res => {
            dispatch(setCart(res.data));
          })
          .catch(err => {
            console.log(err);
          })
      }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/product/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

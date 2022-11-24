import React from "react";
import { Navbar, Main, Product, Footer } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/action";
import axios from "axios";
import getUserFromCache from "../utils/getUserFromCache";

function Home() {
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
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home
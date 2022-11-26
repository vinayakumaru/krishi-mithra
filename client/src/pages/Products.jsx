import React ,{ useEffect } from 'react'
import { Footer, Navbar, Product } from "../components"

const Products = () => {

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <>
      <Navbar />
      <Product />
      <Footer />
    </>
  )
}

export default Products
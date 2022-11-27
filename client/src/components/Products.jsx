import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import storage from "../firebase-config"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";

const ImageFirebase = ({ imageName }) => {
  const [imageURL, setimageURL] = useState(null);
  useEffect(() => {
    getDownloadURL(ref(storage, `images/${imageName}`))
      .then((url) => {
        setimageURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageName]);

  return (
    <>
      {
        imageURL ?
          <img
            className="card-img-top p-3"
            src={imageURL}
            alt="Card"
            height={300}
          /> :
          <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 mt-2" >
            <Skeleton height={300} width={265} />
          </div >

      }
    </>

  );
}


const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    setLoading(true);
    axios.get(process.env.REACT_APP_SERVER_URL + "/api/products")
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Insectiside")}>Insectiside</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Fungicide")}>Fungicide</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Herbicide")}>Herbicide</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Seed Treatment")}>Seed Treatment</button>
        </div>

        {filter.map((product,index) => {
          return (
            <div id={product.product_id} key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.product_id}>
                <ImageFirebase imageName={product.image} />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.product_name.lenght
                      ? product.product_name.substring(0, 15) + "..."
                      : product.product_name
                    }
                  </h5>
                  <p className="card-text">
                    {product.product_des.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li key={"price"} className="list-group-item lead">₹ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/product/" + product.product_id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;

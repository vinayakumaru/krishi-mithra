import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import storage from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";

const ImageFirebase = ({ imageName, height, width }) => {
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
            alt={"Product"}
            width={width}
            height={height}
          /> :
          <div className="card-img-top p-3" >
            <Skeleton height={height} width={width} />
          </div >

      }
    </>

  );
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {

    setLoading(true);
    setLoading2(true);

    axios.post(process.env.REACT_APP_SERVER_URL + '/api/getProductById', { product_id: id })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);

        axios.post(process.env.REACT_APP_SERVER_URL + '/api/getProductsByCategory', { category: response.data.category })
          .then((response) => {
            setSimilarProducts(response.data);
            setLoading2(false);
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <ImageFirebase imageName={product.image} height={"300px"} width={"350px"} />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.product_name}</h1>
              <p className="lead">
                {/* {product.rating && product.rating.rate}{" "} */}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">₹{product.price}</h3>
              <p className="lead">{product.product_des}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                item.product_id !== id &&
                <div key={item.product_id} className="card mx-4 text-center">
                  <ImageFirebase imageName={item.image} height={"200px"} width={"150px"} />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.product_name.lenght
                        ? item.product_name.substring(0, 15) + "..."
                        : item.product_name
                      }
                    </h5>
                  </div>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.product_id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

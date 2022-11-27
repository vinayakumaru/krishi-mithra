import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Navbar } from '../components';
import getUserFromCache from '../utils/getUserFromCache';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import storage from "../firebase-config";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OrdersPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = getUserFromCache();
    if (user) {
      axios.post(process.env.REACT_APP_SERVER_URL + '/api/getOrders', { username: user })
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [])

  const ImageFirebase = ({ imageName }) => {
    const [imageURL, setimageURL] = useState('');
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
      <img
        src={imageURL}
        alt={"product"}
        width={200}
        height={200}
      />
    );
  }

  
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <h1 className="text-center">My orders</h1>
        <hr />
        <Stack spacing={2}
          style={{
            marginTop: '40px',
          }}
        >
            {products.map((product) => {
              return (
                <Item key={product._id}>
                  <div className="row"
                    style={{
                      paddingBottom: '20px',
                      paddingTop: '20px',
                    }}
                  >
                    <div className="col-md-4">
                      <ImageFirebase imageName={product.image} />
                    </div>
                    <div className="col-md-8"
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: 'column',
                        fontSize: '17px',
                      }}
                    >
                      <h2>{product.product_name}</h2>
                      <br />
                      <p><b>Price:</b> ₹{product.price}</p>
                      <p><b>Quantity:</b> {product.qty}</p>
                      <p><b>Status:</b> {product.status === "pending" ? "Yet to be Delivered" : "Delivery"}</p>
                    </div>
                  </div>  
                </Item>
              )
            })}
          </Stack>
      </div>
    </>
  );
}

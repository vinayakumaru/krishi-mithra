import React from "react";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import state_list from "../utils/stateList";
import PaymentDialog from "../components/PaymentDialog";
import PaymentSuccessDialog from "../components/PaymentSuccessDialog";
import axios from "axios";
import getUserFromCache from "../utils/getUserFromCache";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const [Name, setName] = React.useState("");
    const [PhoneNumber, setPhoneNumber] = React.useState("");
    const [Address, setAddress] = React.useState("");
    const [City, setCity] = React.useState("");
    const [StateAddress, setStateAddress] = React.useState("Karnataka");
    const [Pincode, setPincode] = React.useState("");
    const [PaymentMethod, setPaymentMethod] = React.useState("UPI");
    const [UpiID, setUpiID] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [transactionId, setTransactionId] = React.useState("3445534");

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setOpen(true);
      axios.post(process.env.REACT_APP_SERVER_URL + "/api/checkout", {username: getUserFromCache(),Name, PhoneNumber, Address, City, StateAddress, Pincode, PaymentMethod,amount: Math.round(subtotal + shipping)})
        .then(res => {
          setTimeout(() => {
            setOpen(false);
            setTransactionId(res.data);
            setOpenSuccess(true);
          }, 5000);
        })
        .catch(err => {
          console.log(err);
        });
    };

    return (
      <>
        <div className="container pt-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>₹{shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>₹{Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="Name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          placeholder="Harry Potter"
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid name is required.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="number" className="form-label">
                          Phone number
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="number"
                          value={PhoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="99########"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid phone number.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Banashankari 3rd Stage"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          placeholder="Banashankari"
                          value={City}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          City required.
                        </div>
                      </div>
                      <div className="col-md-5 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select
                          className="form-select"
                          id="state"
                          value={StateAddress}
                          onChange={(e) => setStateAddress(e.target.value)}
                        >
                          {state_list.map((item, index) => {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="pincode" className="form-label">
                          Pincode
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="pincode"
                          placeholder="56####"
                          value={Pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Pincode required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>
                    <div className="row gy-3 py-3">
                      <div className="col-md-5 my-1">
                        <select
                          className="form-select"
                          id="paymentMethod"
                          value={PaymentMethod}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value)
                            setUpiID("")
                          }}
                        >
                          <option value={"UPI"}>UPI</option>
                          <option value={"CASH"}>CASH</option>
                        </select>
                      </div>
                      <div className="col-md-6 my-1"
                        style={{
                          display: PaymentMethod === "UPI" ? "unset" : "none",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="UPI"
                          placeholder="99######89@paytm"
                          value={UpiID}
                          onChange={(e) => setUpiID(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          UPI ID required.
                        </div>
                      </div>
                    </div>


                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary"
                      type="submit"
                    >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaymentDialog open={open}/>
        <PaymentSuccessDialog 
          open={openSuccess} 
          setOpen={setOpenSuccess} 
          amount={Math.round(subtotal + shipping)}
          phoneNumber={PhoneNumber}
          UpiID={UpiID}
          transactionId={transactionId}
          />
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container mt-3 pt-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Checkout;

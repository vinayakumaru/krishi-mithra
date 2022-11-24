import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import getUserFromCache from "../utils/getUserFromCache";
import removeUserFromCache from "../utils/removeUserFromCache";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/action";


const Navbar = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.handleCart)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(getUserFromCache() ? true : false);
    return (
        <nav className="navbar navbar-expand-lg py-2 sticky-top"
            style={{ backgroundColor: "#13C869" }}>
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Krishi Mithra</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {isUserLoggedIn ? null : <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>}
                        {isUserLoggedIn ? null : <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                        {isUserLoggedIn ? <NavLink to="/" className="btn btn-outline-dark m-2"
                            onClick={() => {
                                removeUserFromCache();
                                setIsUserLoggedIn(false);
                                dispatch(clearCart());
                            }}
                        ><i className="fa-solid fa-right-from-bracket"></i> Logout</NavLink> : null}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
    const navigate = new useNavigate();
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/api/userLogin", { username, password })
            .then((res) => {
              if (
                res.data.username === username &&
                res.data.password === password
              ) {
                const token = new Cookies();
                token.set('username', res.data.username, { path: "/", maxAge: 604800 })
                navigate("/");
      
              } else {
                alert("invalid credentials");
              }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Login</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form
                          onSubmit={handleSubmit}
                        >
                            <div class="my-3">
                                <label for="display-4">username address</label>
                                <input
                                    type="username"
                                    class="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) =>
                                        setusername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div class="my-3">
                                <label for="floatingPassword display-4">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>
                                    New Here?{" "}
                                    <Link
                                        to="/register"
                                        className="text-decoration-underline text-info"
                                    >
                                        Register
                                    </Link>{" "}
                                </p>
                            </div>
                            <div className="text-center">
                                <button
                                    class="my-2 mx-auto btn btn-dark"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;

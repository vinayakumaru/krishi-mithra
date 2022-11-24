import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setphone] = useState("");
    const [fname, setfname] = useState("");
    const navigate = new useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const registered = {
            name: fname,
            username: username,
            password: password,
            phone_no: phone,
            mail_id: email,
        };
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/userRegister", registered)
            .then((response) => {
                console.log(response.data);
                setusername("");
                setEmail("");
                setPassword("");
                setphone("");
                setfname("");
                navigate("/login");
            }).catch((err) => {
                alert("username already exists");
            });
    };
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={fname}
                                    onChange={(e) =>
                                        setfname(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Username">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Username"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) =>
                                        setusername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Phone">Phone</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Phone"
                                    placeholder="99########"
                                    style={{ "-webkit-appearance": "none" }}
                                    value={phone}
                                    onChange={(e) =>
                                        setphone(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register
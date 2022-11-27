const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const krishi_mithra_database = require("./krishi_mithra_database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const krishi_mithra_database_instance = new krishi_mithra_database();

app.post("/api/userRegister", (req, res) => {
    krishi_mithra_database_instance.userRegister(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.status(400).send("failure");
        }
    });
});

app.post("/api/userLogin", (req, res) => {
    krishi_mithra_database_instance.checkUser(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.status(400).send("invalid credentials");
        }
    });
});

app.post("/api/sellerRegister", (req, res) => {
    krishi_mithra_database_instance.sellerRegister(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.status(400).send("failure");
        }
    });
});

app.post("/api/sellerLogin", (req, res) => {
    krishi_mithra_database_instance.checkSeller(req.body, (status) => {
        if (status) {
            res.send({
                username: req.body.username,
                password: req.body.password,
            });
        } else {
            res.send({ username: "", password: "" });
        }
    });
});

app.get("/api/products", (_, res) => {
    krishi_mithra_database_instance.getProducts((err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send(result);
    });
});

app.post("/api/getProductsByCategory", (req, res) => {
    krishi_mithra_database_instance.getProductsbyCategory(
        req.body,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send(err.message);
                return;
            }
            res.send(result);
        }
    );
});

app.post("/api/getProductById", (req, res) => {
    krishi_mithra_database_instance.getProductById(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send(result[0]);
    });
});

app.post("/api/getCart", (req, res) => {
    krishi_mithra_database_instance.getCart(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send(result);
    });
});

app.post("/api/updateCart", (req, res) => {
    krishi_mithra_database_instance.updateCart(req.body, (err, _) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send("Updated cart successfully");
    });
});

app.post("/api/deleteFromCart", (req, res) => {
    krishi_mithra_database_instance.deleteFromCart(req.body, (err, _) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send("Deleted from cart successfully");
    });
});

app.post("/api/checkout", (req, res) => {
    data = req.body;
    transactionId = Math.floor(Math.random() * 100000000);
    krishi_mithra_database_instance.checkout(
        { ...data, transactionId },
        (err, _) => {
            if (err) {
                console.log(err);
                res.status(400).send(err.message);
                return;
            }
            krishi_mithra_database_instance.emptyCart(req.body, (err, _) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err.message);
                    return;
                }
                res.send(`${transactionId}`);
            });
        }
    );
});

app.post("/api/getOrders", (req, res) => {
    krishi_mithra_database_instance.getOrders(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
            return;
        }
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    krishi_mithra_database_instance.connect();
});

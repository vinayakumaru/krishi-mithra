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
            res.send("failure");
        }
    });
});

app.post("/api/userLogin", (req, res) => {
    krishi_mithra_database_instance.checkUser(req.body, (status) => {
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

app.post("/api/sellerRegister",(req, res) => {
    krishi_mithra_database_instance.sellerRegister(req.body, (status)=> {
        if(status) {
            res.send("success");
        }
        else{
            res.send("failure");
        }
    });
});

app.post("/api/sellerLogin",(req,res) => {
    krishi_mithra_database_instance.checkSeller(req.body,(status)=> {
        if(status) {
            res.send({
                username: req.body.username,
                password: req.body.password,
            });
        }
        else{
            res.send({username: "", password: "" })
        }
    })
})

app.post("/api/products",(res)=>{
    krishi_mithra_database_instance.getProducts((status)=> {
        if(status) {
            res.send({})
        }
    })
})

app.post("/api/getProductsByCategory",(req,res)=>{
    krishi_mithra_database_instance.getProductsbyCategory(req.body ,(status)=> {
        if (status) {
            res.send({})
        }
    })
})

app.post("api/cart",(req,res)=>{
    krishi_mithra_database_instance.addToCart(req.body , (status) =>{
        if (status){
            res.send({})
        }
    })
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    krishi_mithra_database_instance.connect();
});

const mysql = require("mysql");

class krishi_mithra {
    constructor() {
        this.pool = null;
    }

    connect() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            database: "krishi_mithra",
        });

        this.pool.query("select * from Admin", (err, _) => {
            if (err) {
                console.log("unable to connect database");
                return;
            }
            console.log("connected to database");
        });
    }

    userRegister({ name, username, password, phone_no, mail_id }, callback) {
        this.pool.query(
            `INSERT INTO customer (name, username, password, phone_no, mail_id) VALUES ('${name}','${username}','${password}',${phone_no},'${mail_id}')`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                callback(true);
            }
        );
    }

    sellerRgister({
        dealer_name,
        GST_lic_no,
        Agri_lic_no,
        dealer_address,
        phone_no,
    }) {
        this.pool.query(
            `insert into dealer (Dealer_Name, GST_lic_no, Agri_lic_no, Dealer_address, phone_no) values ('${dealer_name},${GST_lic_no},${Agri_lic_no},${dealer_address},${phone_no}')`,
            (err, result) => {
                if (err) {
                    console.log(err, sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully registered");
            }
        );
    }

    checkUser({ username, password }, callback) {
        this.pool.query(
            `select username,password from customer where username='${username}' and password='${password}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    checkSeller({ dealer_id, password }, callback) {
        this.pool.query(
            `select dealer_id,password from dealer where dealer_id='${dealer_id}' and password='${password}`,
            (err, result) => {
                if (err) {
                    console.log(err, sqlMessage);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    getProfile(username, callback) {
        this.pool.query(
            `select * from customer where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getProducts(callback) {
        this.pool.query(`select * from product`, callback);
    }

    getProductsbyCategory({category}, callback) {
        this.pool.query(`select * from product where category = '${category}'`,callback);
    }

    getProductById({product_id}, callback) {
        this.pool.query(`select * from product where product_id = '${product_id}'`,callback);
    }

    getCart({username},callback){
        this.pool.query(`select product.product_id,product_name,category,manufacturer,manufacture_date,exp_date,product_des,price,avl_qty,seller_id,image,qty from cart join product on cart.product_id = product.product_id where username = '${username}'`,callback);
    }

    updateCart({product_id,username,qty},callback){
        this.pool.query(`REPLACE INTO cart (product_id, username, qty) VALUES ('${product_id}','${username}',${qty})`,callback);
    }

    deleteFromCart({product_id,username},callback){
        this.pool.query(`delete from cart where product_id = '${product_id}' and username = '${username}'`,callback);
    }

    placeOrder({username},callback){
        this.pool.query(`insert into orders (username,product_id,qty) select username,product_id,qty from cart where username = '${username}'`,callback);
    }

    checkout({username, Name, PhoneNumber, Address, City, StateAddress, Pincode, PaymentMethod, transactionId,amount},callback){
        this.pool.query(`CALL checkout('${username}','${Name}','${PhoneNumber}','${Address}','${City}','${StateAddress}',${Pincode},'${PaymentMethod}',${transactionId},${amount})`,callback);
    }
}

module.exports = krishi_mithra;

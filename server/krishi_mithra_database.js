const mysql = require("mysql");

class krishi_mithra {
    constructor() {
        this.pool = null;
    }
    
    connect(){
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            database: "krishi_mithra",
        });

        this.pool.query(
            'select * from Admin',
            (err, _) => {
                if (err) {
                    console.log("unable to connect database");
                    return;
                }
                console.log("connected to database");
            }
        );
    }

    userRegister(
        {
            name,
            username,
            password,
            phone_no,
            mail_id
        },
        callback
    ) {
        this.pool.query(
            `INSERT INTO customer (name, username, password, phone_no, mail_id) VALUES ('${name},${username},${password},${phone_no},${mail_id}')`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully registered");
                callback(true);
            }
        );
    }

    sellerRgister(
        {
            dealer_name,
            GST_lic_no,
            Agri_lic_no,
            dealer_address,
            phone_no
        }
    ){
        this.pool.query(
            `insert into dealer (Dealer_Name, GST_lic_no, Agri_lic_no, Dealer_address, phone_no) values ('${dealer_name},${GST_lic_no},${Agri_lic_no},${dealer_address},${phone_no}')`,
            (err,result) => {
                if(err) {
                    console.log(err,sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully registered")
            }
        )

    }

    checkUser({username,password},callback){
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
        )
    }
    
    checkSeller({dealer_id,password},callback){
        this.pool.query(
            `select dealer_id,password from dealer where dealer_id='${dealer_id}' and password='${password}`,
            (err,result) => {
                if(err) {
                    console.log(err,sqlMessage);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        )
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

    getProducts(callback){
        this.pool.query(
            `select * from product`,
            (err,result) =>{
                if (err){
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getProductsbyCategory(category,callback){
        this.pool.query(
            `select * from product where category = ${category}`,
            (err,result)=>{
                if (err){
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    addToCart({username,p_id,qty},callback){
        this.pool.query(
            `INSERT INTO cart (p_id,product_name,price_per_peice) SELECT p.product_id,p.product_name,p.price  from product as p`,
            (err,result) => {
                if(err){
                    console.log(err);
                    callback([]);
                    return;
                }
                else{
                    this.pool.query(
                        `INSERT into cart(qty,total_amount,username) VALUES (${qty}, (qty * price_per_peice),${username} ) WHERE p_id = ${p_id}`
                    )
                }
            }
            )    
    }

    
    


}




module.exports = krishi_mithra;

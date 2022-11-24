const mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
});

createDatabase();

function createDatabase(){
    pool.query("CREATE DATABASE IF NOT EXISTS krishi_mithra", (err, result) => {
        if (err) throw err;
        console.log("database created");
        setupTable();
    });
};

function setupTable() {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        database: "krishi_mithra",
    });

    setupAdminTable();
    setupCustomerTable();
    setupDealerTable();
    setupCartTable();
    setupOrderTable();
    setupProductTable();
    setupPaymentTable();
    setupAddressTable();
    setupInvoiceTable();

};

function setupAdminTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS admin (Adm_id int AUTO_INCREMENT PRIMARY KEY, Admin_name varchar(20) unique, name varchar(20), password varchar(100),mail_id varchar(30), mobile_no int unique)",
        (err, result) => {
            if (err) throw err;
            console.log("admin table created");
        }
    );
};

function setupCustomerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS customer (cust_id int AUTO_INCREMENT primary key,name varchar(20), username varchar(20) unique,password varchar(100),phone_no bigint(11), mail_id varchar(30))",
        (err, result) => {
            if (err) throw err;
            console.log("customer table created");
        }
    );
};

function setupDealerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS dealer (dealer_id int AUTO_INCREMENT PRIMARY KEY,Dealer_Name varchar(50),password varchar(50), GST_lic_no varchar(16) unique, Agri_lic_no varchar(20) unique,Dealer_address varchar(200),phone_no int)",
        (err, result) => {
            if (err) throw err;
            console.log("dealer table created");
        }
    );
};

function setupProductTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS Product (product_id int auto_increment primary key,product_name varchar(50), category varchar(50),manufacturer varchar(100),manufacture_date date,exp_date date,product_des varchar(200),price float, avl_qty int,seller_id varchar(10) )",
        (err, result) => {
            if (err) throw err;
            console.log("Product table created");
        }
    );
};

function setupOrderTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS orders (order_id int AUTO_INCREMENT PRIMARY Key, product_id int, price float,product_name varchar(50),category varchar(50),exp_date date,qty int,total_price float,payment_remarks varchar(20))",
        (err, result) => {
            if (err) throw err;
            console.log("orders table created");
        }
    );
}

function setupCartTable(){
    pool.query(
        "create table if not exists cart (cart_id int AUTO_INCREMENT PRIMARY KEY,product_id varchar(20),username varchar(20),qty int)",
        (err,result) => {
            if (err) throw err;
            console.log("Cart table created");
        }
    )
}

function setupPaymentTable(){
    pool.query(
        "create table if not exists payment_info(transaction_id int auto_increment primary key,date_time timestamp,payment_mode varchar(20),amount float,order_id int,payment_interface varchar(20),remarks varchar(20))",
        (err,result) => {
            if(err) throw err;
            console.log("payment teble created");
        }
    )
}

function setupAddressTable(){
    pool.query (
        "create table if not exists Address(cust_id int primary key,pincode int ,address_line1 varchar(50),address_line2 varchar(50),addressline3 varchar(50),city varchar(20),district varchar(20),state varchar(20),phone_num int )",
        (err,result) => {
            if(err) throw err;
            console.log("address table created")
        }
    )
}

function setupInvoiceTable(){
    pool.query(
        "create table if not exists Invoice_table(invoice_id int auto_increment primary key,seller_id int ,cust_id int,seller_add varchar(200),product_id int,product_name varchar(50),price_per_pice float, qty int,total_amt float,terms_and_conditions varchar(500) )",
        (err,result) => {
            if(err) throw err;
            console.log ("invoice table created")
        }
    )
}
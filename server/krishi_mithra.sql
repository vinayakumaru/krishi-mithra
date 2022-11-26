-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2022 at 06:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `krishi_mithra`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkout` (IN `username` VARCHAR(20), IN `Name` VARCHAR(20), IN `PhoneNumber` VARCHAR(20), IN `Address` VARCHAR(200), IN `City` VARCHAR(50), IN `StateAddress` VARCHAR(50), IN `Pincode` INT, IN `PaymentMethod` VARCHAR(20), IN `transactionId` INT, IN `amount` INT)   BEGIN
DECLARE addressId int;
DECLARE done INT DEFAULT FALSE;
Declare v1 varchar(20);
Declare v2 int;
Declare v3 varchar(20);
Declare v4 int;
DECLARE cur CURSOR FOR SELECT product.product_id,product.price,product.exp_date,cart.qty FROM cart JOIN product ON product.product_id = cart.product_id WHERE cart.username = username;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

SET addressId = FLOOR(RAND()*100000000);
SET foreign_key_checks = 0;

INSERT INTO address VALUES(addressId,username,Name,PhoneNumber,Address,City,StateAddress,Pincode);

INSERT INTO payment_info(transaction_id,payment_mode,amount,payment_status) VALUES(transactionId,PaymentMethod,amount,"success");



OPEN cur;
	read_loop: LOOP
		FETCH cur INTO v1,v2,v3,v4;
		IF done THEN
		LEAVE read_loop;
        END IF;
		INSERT INTO orders(product_id, price, exp_date, qty, payment_id, status, addressId) VALUES (v1,v2,v3,v4,transactionId,"pending",addressId);
    END LOOP;
CLOSE cur;

SET foreign_key_checks = 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressId`, `username`, `name`, `phone`, `address`, `city`, `state`, `pincode`) VALUES
(29064635, 'vinaykumar', 'Vinaya Kumar U', 35325, 'S/O Sharadha Anugraha Devasabettu Chara', 'Hebri', 'Karnataka', 576112);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Adm_id` int(11) NOT NULL,
  `Admin_name` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mail_id` varchar(30) DEFAULT NULL,
  `mobile_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `product_id`, `username`, `qty`) VALUES
(101, 'HER301', 'vinaykumar', 1),
(102, 'FUN205', 'vinaykumar', 1),
(103, 'FUN204', 'vinaykumar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone_no` bigint(11) DEFAULT NULL,
  `mail_id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `name`, `username`, `password`, `phone_no`, `mail_id`) VALUES
(9, 'Vinaya Kumar U', 'vinaykumar', '123456', 8123501022, 'vinaykumaru605@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `dealer`
--

CREATE TABLE `dealer` (
  `dealer_id` int(11) NOT NULL,
  `Dealer_Name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `GST_lic_no` varchar(16) DEFAULT NULL,
  `Agri_lic_no` varchar(20) DEFAULT NULL,
  `Dealer_address` varchar(200) DEFAULT NULL,
  `phone_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_table`
--

CREATE TABLE `invoice_table` (
  `invoice_id` int(11) NOT NULL,
  `seller_id` int(11) DEFAULT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `seller_add` varchar(200) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `price_per_pice` float DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total_amt` float DEFAULT NULL,
  `terms_and_conditions` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `exp_date` varchar(20) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `addressId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `price`, `exp_date`, `qty`, `payment_id`, `status`, `addressId`) VALUES
(22, 'HER301', 2300, 'Aug-23', 1, 77106224, 'pending', 29064635),
(23, 'FUN205', 1500, 'Jul-24', 1, 77106224, 'pending', 29064635),
(24, 'FUN204', 1659, 'Aug-24', 1, 77106224, 'pending', 29064635);

-- --------------------------------------------------------

--
-- Table structure for table `payment_info`
--

CREATE TABLE `payment_info` (
  `transaction_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_mode` varchar(20) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_info`
--

INSERT INTO `payment_info` (`transaction_id`, `date_time`, `payment_mode`, `amount`, `payment_status`) VALUES
(77106224, '2022-11-26 16:24:44', 'UPI', 5489, 'success');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` varchar(15) NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `manufacture_date` varchar(15) DEFAULT NULL,
  `exp_date` varchar(15) DEFAULT NULL,
  `product_des` varchar(200) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `avl_qty` int(11) DEFAULT NULL,
  `seller_id` varchar(10) DEFAULT NULL,
  `image` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `category`, `manufacturer`, `manufacture_date`, `exp_date`, `product_des`, `price`, `avl_qty`, `seller_id`, `image`) VALUES
('FUN201', 'Caviet', 'Fungicide', 'Syngenta', '20-07-2022', 'Jul-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1899, 30, '29KARTL200', 'Caviet.jpg'),
('FUN202', 'Dimension EC', 'Fungicide', 'Bayer Crop science', '01-07-2002', 'Jul-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1700, 20, '27TNWHO500', 'Dimension_EC.jpg'),
('FUN203', 'Hexzol Gold', 'Fungicide', 'UPL', '05-08-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1600, 20, '28MHWHO900', 'Hexzol_Gold.jpg'),
('FUN204', 'Sulfex', 'Fungicide', 'Dow Agrisciences', '07-06-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1659, 30, '28MHWHO900', 'Sulfex.jpg'),
('FUN205', 'Swadheen', 'Fungicide', 'Syngenta', '15-07-2022', 'Jul-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1500, 80, '29KAWHO300', 'Swadheen.jpg'),
('HER301', 'Casanova', 'Herbicide', 'Bayer Crop science', '10-08-2022', 'Aug-23', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2300, 30, '27TNWHO500', 'Casanova.jpg'),
('HER302', 'D Cel', 'Herbicide', 'UPL', '05-08-2022', 'Aug-23', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2200, 30, '28MHWHO900', 'D_Cel.jpg'),
('HER303', 'Excel Mera 71', 'Herbicide', 'ADAMA', '12-08-2022', 'Aug-23', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1800, 40, '25RJWHO700', 'Excel_Mera_71.jpg'),
('HER304', 'Glycel', 'Herbicide', 'ADAMA', '12-08-2022', 'Aug-23', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1999, 40, '25RJWHO700', 'Glycel.jpg'),
('HER305', 'Junoon', 'Herbicide', 'Sumitomo Chemical', '01-08-2022', 'Aug-23', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1900, 10, '20HRWHO600', 'Junoon.jpg'),
('INS101', 'flash', 'Insectiside', 'Syngenta', '12-07-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus', 2200, 40, '29KARTL200', 'Flash.jpg'),
('INS102', 'Celcron', 'Insectiside', 'Syngenta', '12-07-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2000, 40, '29KAWHO300', 'Celcron.jpg'),
('INS103', 'Celquin', 'Insectiside', 'Bayer Crop science', '21-07-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1899, 25, '30KLRTL600', 'Celquin.jpg'),
('INS104', 'Deltex', 'Insectiside', 'BASF', '01-08-2022', 'Sep-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2000, 25, '29TLRTL500', 'Deltex.jpg'),
('INS105', 'Excel Acetcel', 'Insectiside', 'UPL', '30-08-2022', 'Sep-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1799, 70, '28MHWHO900', 'Excel_acetcel.jpg'),
('ST401', 'Seedcel', 'Seed Treatment', 'Syngenta', '18-07-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2799, 25, '29KARTL200', 'Seedcel.jpg'),
('ST402', 'Seedex', 'Seed Treatment', 'Syngenta', '18-07-2022', 'Aug-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2550, 25, '29KARTL200', 'Seedex.jpg'),
('ST403', 'Vitavax-200', 'Seed Treatment', 'Bayer Crop science', '10-08-2022', 'Sep-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1900, 30, '27TNWHO500', 'Vitavax_200.jpg'),
('ST404', 'Stiletto', 'Seed Treatment', 'UPL', '05-08-2022', 'Sep-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 2300, 30, '28MHWHO900', 'Stiletto.jpg'),
('ST405', 'Maxim 4FS', 'Seed Treatment', 'Valent', '10-08-2022', 'Sep-24', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nobis, temporibus ipsam quo ullam repellendus', 1899, 30, '27MPWHO800', 'Maxim_4FS.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Adm_id`),
  ADD UNIQUE KEY `Admin_name` (`Admin_name`),
  ADD UNIQUE KEY `mobile_no` (`mobile_no`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `product_id` (`product_id`,`username`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `dealer`
--
ALTER TABLE `dealer`
  ADD PRIMARY KEY (`dealer_id`),
  ADD UNIQUE KEY `GST_lic_no` (`GST_lic_no`),
  ADD UNIQUE KEY `Agri_lic_no` (`Agri_lic_no`);

--
-- Indexes for table `invoice_table`
--
ALTER TABLE `invoice_table`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `payment_info`
--
ALTER TABLE `payment_info`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Adm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dealer`
--
ALTER TABLE `dealer`
  MODIFY `dealer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_table`
--
ALTER TABLE `invoice_table`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

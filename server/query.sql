DELIMITER $$
DROP PROCEDURE IF EXISTS checkout $$
CREATE PROCEDURE checkout(IN username VARCHAR(20),IN Name VARCHAR(20),IN PhoneNumber VARCHAR(20),IN Address VARCHAR(200),IN City VARCHAR(50),IN StateAddress VARCHAR(50),IN Pincode INT,IN PaymentMethod VARCHAR(20),IN transactionId INT,IN amount INT)
BEGIN
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

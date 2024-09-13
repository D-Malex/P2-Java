CREATE DATABASE monk_db;
USE monk_db;

GRANT ALL PRIVILEGES ON monk_db.* TO 'root'@'remote_ip' IDENTIFIED BY 'admin';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'root'@'remote_ip';

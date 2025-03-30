-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Mar 30, 2025 at 03:48 PM
-- Server version: 10.11.11-MariaDB-ubu2204
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recycle-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `Category_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Category_ID`, `CategoryName`) VALUES
(1, 'Normal');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `Cus_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` int(11) NOT NULL,
  `WalletAddress` varchar(255) NOT NULL,
  `Balance` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Cus_ID`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Cus_ID`, `Name`, `Surname`, `PhoneNumber`, `Username`, `Password`, `WalletAddress`, `Balance`) VALUES
(16, 'Athicha', 'Leksansern', '123-456-7890', 'tonkaew131', 12345678, '0x353D34Af2e303870e3436cE1F6a56EFF84eafc54', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE IF NOT EXISTS `orderdetail` (
  `Order_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `EarnedCredit` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Order_ID`,`Product_ID`),
  KEY `Product_ID` (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `Order_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Cus_ID` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `Cus_ID` (`Cus_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
CREATE TABLE IF NOT EXISTS `Product` (
  `Product_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `CreditPerUnit` decimal(10,2) NOT NULL,
  `Category_ID` int(11) NOT NULL,
  PRIMARY KEY (`Product_ID`),
  KEY `Category_ID` (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`Product_ID`, `ProductName`, `CreditPerUnit`, `Category_ID`) VALUES
(1, 'Milk', 22.00, 1),
(2, 'Cereal', 45.00, 1),
(3, 'Banana', 9.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-2824mVs000N6Kk167X9hutCYMDhXRFl', 1743433914, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('-zd8gV8IiPXNFYoHcYndX-4RiSd2_5to', 1743436101, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('0ATVDJDCmSZrpHVaOheD7-5HVxaz2eTs', 1743434922, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('106Vvs6G4B4AaMC4nVBwN7Mo-eABSMQv', 1743434015, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('2dQIAqLp_DOp6QcmLC0gpt6-f6D1xEfl', 1743434895, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3j95bKlTR05xBtaUnYjFZbJ9qo5kiiGN', 1743434899, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3pklbXZGma4a9opuguYjYvf3Nr_Gk2LV', 1743433717, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3rLoghBymi-udxuKP66OHKEF1YM2TSFb', 1743435257, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('4rtmGcj3ey9igE86UFsoXHQKSuwYhWrB', 1743435711, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('5Ec-RVTKxGKHrzmxnpSIKRPGebhFGgw6', 1743435849, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('5JmSa3aUldW0RQGzmtcfqDZpMzltoke2', 1743435351, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('5j_Si3RRBLDO1tMI-b8VxTZidwVEJW0w', 1743435406, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('6H7RG3E4lIlxPIHg3K9EjHG3EBF8KG8J', 1743435052, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('7wUtMgaJvUqpQdg4tpe0cS0uf4mWmk0h', 1743433723, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('AunIXRED09i-geOZ6g8YjJtiOekGp5YD', 1743434162, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('BM92JQwZ50wcAOYLwky1d_KoduPk_NSk', 1743435405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('CVuIt7byVZQYFoZUo4ezUsI-B60hoUah', 1743433986, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('DgRACi4nl8FyaHMso9ZNEsxPYFXp0gHs', 1743434189, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('FxthCPdW2SK95stOYPZIOJRB2mQ48nPf', 1743435310, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('HHKulN6mD2ZF6jH1U7bsfbBuaFmVLImM', 1743434951, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('HNA08A3FJP2dN95RfzmeH_93cg0DOkFk', 1743434174, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('HPPI5dcsVzA6qoxMxsvGf5mTL-5ippy8', 1743435414, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('HRraP-9vOaV7P3ll5KYgHSSi2jaYDO7v', 1743436101, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"cusId\":16,\"username\":\"tonkaew131\",\"name\":\"Athicha\",\"surname\":\"Leksansern\",\"phoneNumber\":\"123-456-7890\",\"walletAddress\":\"0x353D34Af2e303870e3436cE1F6a56EFF84eafc54\"}}'),
('JA1hV2GKE0_G83mU9gHkyU-j3Zv7vkUA', 1743434192, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('JVUY_02BLeabF52WfM7JmKLp4j1dX8EM', 1743435037, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('KLet1rCrSnbDLlfJ_7WHlS2pQLqYhO4V', 1743434138, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Q_gF4TstlsP_6O1OW8kxYTCEVWha291R', 1743435156, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Qzob6J_ysT09lpBCaTvxn_N39MonsgmI', 1743434029, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('RRVIUjyYwpxLvwC4-oPdgF5Xr0KrIp0h', 1743435256, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('T3TyJW1PwBioOHpslHgaPzbOJImGkwaW', 1743435215, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('T6p6jx2M3BLbh_gSwK89ZEGIr2uKF5Nj', 1743435290, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('TAC0Kb7ePtkb-sLjeOfUnm8m-1zjc1t-', 1743435577, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('UF2EKhuVyyPnDCt0s_5sXE4jdgDiJwSo', 1743433991, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('VndBNm25J5HfmrI5ApJJIzn6uy8cS2FW', 1743434014, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('WtGDwkTOYStFh3iDhUQvC3u9vuMcuVtR', 1743434954, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('ZcCBZuOj16ClcnutbhINMYe2LEQkt8i6', 1743434889, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('ZwtSUG6RbjzG7uwnlSzXGVw7QLyTGrMg', 1743435258, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('_XlWcDEcYvr-Nsod7N_LzD3IcqgfiWIH', 1743435865, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('aaB3vVZlobDsWsDpffVlWPzpTjPAUOti', 1743434073, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('b5pcEvUmtWOeBYh6BEBUEV6JjgRLPFmd', 1743435892, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('dDO6PtJtm_ld93JnG5_1sEvld_CQz3vv', 1743435236, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('fKctLbbLePAQV6vVorP6h-esMIImUdcr', 1743433984, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('fjX8G7IHW5gzy4j1TReOG7CjogPKYfqU', 1743435051, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('g5_CUGei9lgs3gA_x9YvecGDapR0s8Ef', 1743435290, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('gWI0s8EQylAzVSF7miauTU6bLG3Slz8w', 1743435292, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('ij4GkRoa1d3Rg4rgCvj1yR-n6Hauhko1', 1743434933, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('j6YGc8q5rRSATlpFGmzrhlbiTe48vOfb', 1743435142, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('l2Pkz5DZhs9xecbKeC6rAgY1UlihH1eQ', 1743435136, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('l6aJffUBb3pR58vR73Ita6kgv8hWxgzt', 1743433706, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('lPAkzuYMtPSRiHVbhudFN-CWIXDpn131', 1743435388, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('m252BdpfPkWvdTPjX9gZY8iswfaPp8ti', 1743434025, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('m3OgeXj7RNeHAkTelhIpRzQUu0_cdrnq', 1743435357, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('n2j1hRw562tDdHn3XxfwqH-PbloReJ2p', 1743435234, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('n2tz_tKhGdfbbi7CMBX795CPrR1poXbf', 1743435354, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('n60BbKh1l_QmNq_BCX64e_rTNNEC10-z', 1743434175, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('nBLFft5fW05r_Qdx-VyjbMcWiQenzzRs', 1743434175, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('nl9innawP4J2hlyQbwekwwwng3_Fa3om', 1743434668, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('o17-o9y8UQ73WWUmEWYvJaz3UDKNZjje', 1743434924, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('p7lA25N7e8PLYhfmRwIGfZauBNbn-oW7', 1743435002, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('qb7G5cL62EQubIHYJSIk5B-jt8fc9cIZ', 1743434141, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('quGWgrTBgIFyXKhM0eFe4OuPEnUhKUDA', 1743435240, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('rXnYrFUTIivFW1oXnVU_TLIh6EuBGhUL', 1743435709, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('rlqzrs1Oubk_sXW9YbgjheGRKz0KQb73', 1743435214, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('tCEqqbuGjKjU_s4YNd2ZjfcMF0Db92OY', 1743434915, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('uJaJ5Gw7K1RObeaAADB1fYhMOaX782wq', 1743435003, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('uVEmxMt2TM1XvG1RGov1uSIrTtGNWs26', 1743435036, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('uwMus79Dh2V5peQ5dIZr0kdODsMka2w6', 1743434186, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('v5ffZ_l1WRiDWn0J3LAmp4AM-ATufi7p', 1743435231, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('wdSEkHQlq2vL0B-6kKfXlRiQPXhClXt1', 1743434915, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('wr9fSZZnnvHZvayrSnHXPWA3f7O0hTw6', 1743434951, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('zgVJluNm2itPkx1wsnsgrM6Ci6jeUPEu', 1743435365, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `Product` (`Product_ID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Cus_ID`) REFERENCES `customer` (`Cus_ID`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `category` (`Category_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

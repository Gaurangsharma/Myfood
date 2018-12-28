-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: myfood
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admintable`
--

DROP TABLE IF EXISTS `admintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admintable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(50) DEFAULT NULL,
  `pwd` varchar(25) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admintable`
--

LOCK TABLES `admintable` WRITE;
/*!40000 ALTER TABLE `admintable` DISABLE KEYS */;
INSERT INTO `admintable` VALUES (6,'2018-12-27 12:20:50','ankit@gmail.com','abcde','Ankit Agrawal');
/*!40000 ALTER TABLE `admintable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(50) DEFAULT NULL,
  `pwd` varchar(25) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'2018-12-27 12:21:14','ankit@gmail.com','abcde','Ankit Agrawal');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `restid` int(10) unsigned DEFAULT NULL,
  `itemname` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myorder`
--

DROP TABLE IF EXISTS `myorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `myorder` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `customerid` int(10) unsigned DEFAULT NULL,
  `restid` int(10) unsigned DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `promocodeid` int(10) unsigned DEFAULT NULL,
  `deliverytype` int(10) unsigned DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `otpid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myorder`
--

LOCK TABLES `myorder` WRITE;
/*!40000 ALTER TABLE `myorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `myorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdone`
--

DROP TABLE IF EXISTS `orderdone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderdone` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `customerid` int(10) unsigned DEFAULT NULL,
  `restid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `location` timestamp NULL DEFAULT NULL,
  `promocodeid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdone`
--

LOCK TABLES `orderdone` WRITE;
/*!40000 ALTER TABLE `orderdone` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordermetadata`
--

DROP TABLE IF EXISTS `ordermetadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ordermetadata` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `orderid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordermetadata`
--

LOCK TABLES `ordermetadata` WRITE;
/*!40000 ALTER TABLE `ordermetadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordermetadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `otp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `orderid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocode`
--

DROP TABLE IF EXISTS `promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `promocode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(4) DEFAULT '1',
  `name` varchar(50) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocode`
--

LOCK TABLES `promocode` WRITE;
/*!40000 ALTER TABLE `promocode` DISABLE KEYS */;
/*!40000 ALTER TABLE `promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `openingtime` varchar(8) DEFAULT NULL,
  `closingtime` varchar(8) DEFAULT NULL,
  `openingdays` int(11) DEFAULT NULL,
  `license` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (2,'2018-12-27 12:22:10','','restaurant@gmail.com','upload_9f328230789f97f3374260d1e01d8116','Holi Gate','1','11:00','20:30',114,'123LLm',NULL),(3,'2018-12-27 12:23:36','','restaurant@gmail.com','upload_2f68a2bef0e89d13d4b2c5b776cb8e6c','Holi Gate','1','11:00','20:30',114,'123LLm',NULL),(4,'2018-12-28 09:05:01','','gaurang@gmail.com','upload_1edc829617a24bef626d00243044c228','Krishna Nagar','1','01:33','01:33',103,'5688451',NULL);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rider`
--

DROP TABLE IF EXISTS `rider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rider` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) DEFAULT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `adhaar` varchar(12) DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rider`
--

LOCK TABLES `rider` WRITE;
/*!40000 ALTER TABLE `rider` DISABLE KEYS */;
INSERT INTO `rider` VALUES (4,'2018-12-27 12:24:13','undefined','b','','46544','upload_1bf8903050ab1df6fdf61878d52d69c5');
/*!40000 ALTER TABLE `rider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riderorder`
--

DROP TABLE IF EXISTS `riderorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `riderorder` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `riderid` int(10) unsigned DEFAULT NULL,
  `orderid` int(10) unsigned DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `distance` decimal(10,2) DEFAULT NULL,
  `otpid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riderorder`
--

LOCK TABLES `riderorder` WRITE;
/*!40000 ALTER TABLE `riderorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `riderorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `rating` decimal(10,2) DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `subname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'2018-12-27 12:23:36','','restaurant@gmail.com','abcde'),(3,'2018-12-28 09:05:01','','gaurang@gmail.com','abcde');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rest`
--

DROP TABLE IF EXISTS `user_rest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_rest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) unsigned DEFAULT NULL,
  `rest_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rest`
--

LOCK TABLES `user_rest` WRITE;
/*!40000 ALTER TABLE `user_rest` DISABLE KEYS */;
INSERT INTO `user_rest` VALUES (1,'2018-12-27 12:23:36',2,3),(2,'2018-12-28 09:05:01',3,4);
/*!40000 ALTER TABLE `user_rest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-28 15:18:55

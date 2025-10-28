-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: dulzuras
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `ciudad` varchar(50) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `acepta` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `documento` (`documento`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Actor Colombiano','920545','actualizado@example.com','123456','Bogotá','Calle 123 #45-67',0),(15,'Jac Tore','1127443','33223illov@gmail.com','mmm22','Chile','CRA 15 # 15-05',0),(16,'Sebas Tore','55555555','Sebasv@gmail.com','M.ssss2','Chile','CRA 15 # 15-05',0),(17,'Marvin Morillo Muñoz','9202202169','maro992@gmail.com','1.1234','Bogotá','CRA 101a # 12a-50',0),(18,'MaTIASN JOSE','92EEE2169','mEEE992@gmail.com','1.332334','Bogotá','CRA 11a # 12a-50',0),(19,'marvin muñoz','1111221111','kkoakorn992@gmail.com','1231212www','bogota','1',0),(20,'Lei Amado','10161888176','leamado@gmail.com','L.amad123','Cali','1',0),(21,'David Amado','140876765','da_Ama@hotmail.com','D.amad0987','Medellin','1',0),(22,'Milton Morillo','1000776829','milt@hotmail.com','900087yh1','Huila','Cra 55 #3-7',0),(23,'Tatina Montenegro','92877765','Tatia@yahoo.es','tte43533h','Honduras','Cl 34 # 55-1',0),(24,'Richar Conde A','0009775446','Richi@yahoo.com','99239i1j3md','Caldas','CL 2 # 4-5',0),(25,'Jon Molano','9990393373','Molanoj@hotmail.es','sdsjd777','Cartagena','Cra 12 # 4-8',0),(26,'Rios jose','1088776541','Rios@gmail.es','2333522rt','Cartagena','Cra 55 # 1-0',0),(27,'MiDiana','527776545','DAmor@gmail.com','110098uy','Cali','Cra 5 # 1 - 21',1),(28,'Manuel pirazan NS','11111110000009','Manu@hotmail.com','Yolo123','Bogotá','DG 12 # 3-4',1),(29,'Richi Jaramillo','2009002229','Richi2@yahoo.com','9204043339','Sanntander','CL 100 # 100-100',1),(32,'diaana amado','929292929','dia@gmail.com','lasdlmdad','neiva','carrera 101 a # 2a-40',1),(33,'marvin martin morillo muñoz','527776622222','maroak2@gmail.com','asdadasdadadad','Bogotá','carrera 6 # 24a-40',1),(34,'fernanda amado amado','02288821','AmadoFer@gmail.com','123456','Santander','TV 4 #  5-6',1),(35,'JAIRO TORO','7777777','777@GMAIL.COM','123456|','CALI','CL 5 # 5-5',1),(36,'marvin muñoz 222','123456','akorn992@gmail.com','123456','bogota','carrera 101 a # 24a-40',1),(37,'PRUEBA DE PERFIL','3339393939','PRUEBA@PERFIL.COM','123456','GOLIA','carrera 1 a # 24a-40',1),(38,'PRUEBA PERFIL 2','1234443','P2@GMAIL.COM','123456','BOGOTA','Carrera 1a, Bogotá, Bogotá, Colombia',1),(39,'PRUEBA 3 LOGIN','123123123','LOGI@GMAIL.COM','123123123123','BOGOTA','Carrera 101a, Bogotá, Bogotá, Colombia',1),(45,'David Trujillo','123456700000','123456@gmail.com','123456','Cali','cra 11A # 1- 34',1),(51,'marvin muñoz s','1234567','makorn2@gmail.com','123456','bogota','carrera 101 a # 24a-40',1),(54,'Marvin Martin Morillo Muñoz','123456789','maro54@gmail.com','123456','BOGOTA','Carrera 101a, Bogotá, Bogotá, Colombia',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-28  0:38:58

-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: working_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `code` text,
  `country` text,
  `countries_id` int DEFAULT NULL,
  `continent` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES ('AW','Aruba',1,'North America'),('AF','Afghanistan',2,'Asia'),('AO','Angola',3,'Africa'),('AI','Anguilla',4,'North America'),('AX','Åland Islands',5,'Europe'),('AL','Albania',6,'Europe'),('AD','Andorra',7,'Europe'),('AE','United Arab Emirates',8,'Asia'),('AR','Argentina',9,'South America'),('AM','Armenia',10,'Asia'),('AS','American Samoa',11,'Oceania'),('AQ','Antarctica',12,'Antarctica'),('TF','French Southern and Antarctic Lands',13,'Antarctica'),('AG','Antigua and Barbuda',14,'North America'),('AU','Australia',15,'Oceania'),('AT','Austria',16,'Europe'),('AZ','Azerbaijan',17,'Asia'),('BI','Burundi',18,'Africa'),('BE','Belgium',19,'Europe'),('BJ','Benin',20,'Africa'),('BF','Burkina Faso',21,'Africa'),('BD','Bangladesh',22,'Asia'),('BG','Bulgaria',23,'Europe'),('BH','Bahrain',24,'Asia'),('BS','Bahamas',25,'North America'),('BA','Bosnia and Herzegovina',26,'Europe'),('BL','Saint Barthélemy',27,'North America'),('BY','Belarus',28,'Europe'),('BZ','Belize',29,'North America'),('BM','Bermuda',30,'North America'),('BO','Bolivia',31,'South America'),('BR','Brazil',32,'South America'),('BB','Barbados',33,'North America'),('BN','Brunei',34,'Asia'),('BT','Bhutan',35,'Asia'),('BV','Bouvet Island',36,'Antarctica'),('BW','Botswana',37,'Africa'),('CF','Central African Republic',38,'Africa'),('CA','Canada',39,'North America'),('CC','Cocos (Keeling) Islands',40,'Asia'),('CH','Switzerland',41,'Europe'),('CL','Chile',42,'South America'),('CN','China',43,'Asia'),('CI','Ivory Coast',44,'Africa'),('CM','Cameroon',45,'Africa'),('CD','DR Congo',46,'Africa'),('CG','Republic of the Congo',47,'Africa'),('CK','Cook Islands',48,'Oceania'),('CO','Colombia',49,'South America'),('KM','Comoros',50,'Africa'),('CV','Cape Verde',51,'Africa'),('CR','Costa Rica',52,'North America'),('CU','Cuba',53,'North America'),('CW','Curaçao',54,'North America'),('CX','Christmas Island',55,'Asia'),('KY','Cayman Islands',56,'North America'),('CY','Cyprus',57,'Asia'),('CZ','Czechia',58,'Europe'),('DE','Germany',59,'Europe'),('DJ','Djibouti',60,'Africa'),('DM','Dominica',61,'North America'),('DK','Denmark',62,'Europe'),('DO','Dominican Republic',63,'North America'),('DZ','Algeria',64,'Africa'),('EC','Ecuador',65,'South America'),('EG','Egypt',66,'Africa'),('ER','Eritrea',67,'Africa'),('EH','Western Sahara',68,'Africa'),('ES','Spain',69,'Europe'),('EE','Estonia',70,'Europe'),('ET','Ethiopia',71,'Africa'),('FI','Finland',72,'Europe'),('FJ','Fiji',73,'Oceania'),('FK','Falkland Islands',74,'South America'),('FR','France',75,'Europe'),('FO','Faroe Islands',76,'Europe'),('FM','Micronesia',77,'Oceania'),('GA','Gabon',78,'Africa'),('GB','United Kingdom',79,'Europe'),('GE','Georgia',80,'Asia'),('GG','Guernsey',81,'Europe'),('GH','Ghana',82,'Africa'),('GI','Gibraltar',83,'Europe'),('GN','Guinea',84,'Africa'),('GP','Guadeloupe',85,'North America'),('GM','Gambia',86,'Africa'),('GW','Guinea-Bissau',87,'Africa'),('GQ','Equatorial Guinea',88,'Africa'),('GR','Greece',89,'Europe'),('GD','Grenada',90,'North America'),('GL','Greenland',91,'North America'),('GT','Guatemala',92,'North America'),('GF','French Guiana',93,'South America'),('GU','Guam',94,'Oceania'),('GY','Guyana',95,'South America'),('HK','Hong Kong',96,'Asia'),('HM','Heard Island and McDonald Islands',97,'Antarctica'),('HN','Honduras',98,'North America'),('HR','Croatia',99,'Europe'),('HT','Haiti',100,'North America'),('HU','Hungary',101,'Europe'),('ID','Indonesia',102,'Asia'),('IM','Isle of Man',103,'Europe'),('IN','India',104,'Asia'),('IO','British Indian Ocean Territory',105,'Asia'),('IE','Ireland',106,'Europe'),('IR','Iran',107,'Asia'),('IQ','Iraq',108,'Asia'),('IS','Iceland',109,'Europe'),('IL','Israel',110,'Asia'),('IT','Italy',111,'Europe'),('JM','Jamaica',112,'North America'),('JE','Jersey',113,'Europe'),('JO','Jordan',114,'Asia'),('JP','Japan',115,'Asia'),('KZ','Kazakhstan',116,'Asia'),('KE','Kenya',117,'Africa'),('KG','Kyrgyzstan',118,'Asia'),('KH','Cambodia',119,'Asia'),('KI','Kiribati',120,'Oceania'),('KN','Saint Kitts and Nevis',121,'North America'),('KR','South Korea',122,'Asia'),('XK','Kosovo',123,'Europe'),('KW','Kuwait',124,'Asia'),('LA','Laos',125,'Asia'),('LB','Lebanon',126,'Asia'),('LR','Liberia',127,'Africa'),('LY','Libya',128,'Africa'),('LC','Saint Lucia',129,'North America'),('LI','Liechtenstein',130,'Europe'),('LK','Sri Lanka',131,'Asia'),('LS','Lesotho',132,'Africa'),('LT','Lithuania',133,'Europe'),('LU','Luxembourg',134,'Europe'),('LV','Latvia',135,'Europe'),('MO','Macau',136,'Asia'),('MF','Saint Martin',137,'North America'),('MA','Morocco',138,'Africa'),('MC','Monaco',139,'Europe'),('MD','Moldova',140,'Europe'),('MG','Madagascar',141,'Africa'),('MV','Maldives',142,'Asia'),('MX','Mexico',143,'North America'),('MH','Marshall Islands',144,'Oceania'),('MK','Macedonia',145,'Europe'),('ML','Mali',146,'Africa'),('MT','Malta',147,'Europe'),('MM','Myanmar',148,'Asia'),('ME','Montenegro',149,'Europe'),('MN','Mongolia',150,'Asia'),('MP','Northern Mariana Islands',151,'Oceania'),('MZ','Mozambique',152,'Africa'),('MR','Mauritania',153,'Africa'),('MS','Montserrat',154,'North America'),('MQ','Martinique',155,'North America'),('MU','Mauritius',156,'Africa'),('MW','Malawi',157,'Africa'),('MY','Malaysia',158,'Asia'),('YT','Mayotte',159,'Africa'),('NA','Namibia',160,'Africa'),('NC','New Caledonia',161,'Oceania'),('NE','Niger',162,'Africa'),('NF','Norfolk Island',163,'Oceania'),('NG','Nigeria',164,'Africa'),('NI','Nicaragua',165,'North America'),('NU','Niue',166,'Oceania'),('NL','Netherlands',167,'Europe'),('NO','Norway',168,'Europe'),('NP','Nepal',169,'Asia'),('NR','Nauru',170,'Oceania'),('NZ','New Zealand',171,'Oceania'),('OM','Oman',172,'Asia'),('PK','Pakistan',173,'Asia'),('PA','Panama',174,'North America'),('PN','Pitcairn Islands',175,'Oceania'),('PE','Peru',176,'South America'),('PH','Philippines',177,'Asia'),('PW','Palau',178,'Oceania'),('PG','Papua New Guinea',179,'Oceania'),('PL','Poland',180,'Europe'),('PR','Puerto Rico',181,'North America'),('KP','North Korea',182,'Asia'),('PT','Portugal',183,'Europe'),('PY','Paraguay',184,'South America'),('PS','Palestine',185,'Asia'),('PF','French Polynesia',186,'Oceania'),('QA','Qatar',187,'Asia'),('RE','Réunion',188,'Africa'),('RO','Romania',189,'Europe'),('RU','Russia',190,'Asia'),('RW','Rwanda',191,'Africa'),('SA','Saudi Arabia',192,'Asia'),('SD','Sudan',193,'Africa'),('SN','Senegal',194,'Africa'),('SG','Singapore',195,'Asia'),('GS','South Georgia',196,'Antarctica'),('SJ','Svalbard and Jan Mayen',197,'Europe'),('SB','Solomon Islands',198,'Oceania'),('SL','Sierra Leone',199,'Africa'),('SV','El Salvador',200,'North America'),('SM','San Marino',201,'Europe'),('SO','Somalia',202,'Africa'),('PM','Saint Pierre and Miquelon',203,'North America'),('RS','Serbia',204,'Europe'),('SS','South Sudan',205,'Africa'),('ST','São Tomé and Príncipe',206,'Africa'),('SR','Suriname',207,'South America'),('SK','Slovakia',208,'Europe'),('SI','Slovenia',209,'Europe'),('SE','Sweden',210,'Europe'),('SZ','Swaziland',211,'Africa'),('SX','Sint Maarten',212,'North America'),('SC','Seychelles',213,'Africa'),('SY','Syria',214,'Asia'),('TC','Turks and Caicos Islands',215,'North America'),('TD','Chad',216,'Africa'),('TG','Togo',217,'Africa'),('TH','Thailand',218,'Asia'),('TJ','Tajikistan',219,'Asia'),('TK','Tokelau',220,'Oceania'),('TM','Turkmenistan',221,'Asia'),('TL','Timor-Leste',222,'Asia'),('TO','Tonga',223,'Oceania'),('TT','Trinidad and Tobago',224,'North America'),('TN','Tunisia',225,'Africa'),('TR','Turkey',226,'Asia'),('TV','Tuvalu',227,'Oceania'),('TW','Taiwan',228,'Asia'),('TZ','Tanzania',229,'Africa'),('UG','Uganda',230,'Africa'),('UA','Ukraine',231,'Europe'),('UM','United States Minor Outlying Islands',232,'North America'),('UY','Uruguay',233,'South America'),('US','United States',234,'North America'),('UZ','Uzbekistan',235,'Asia'),('VA','Vatican City',236,'Europe'),('VC','Saint Vincent and the Grenadines',237,'North America'),('VE','Venezuela',238,'South America'),('VG','British Virgin Islands',239,'North America'),('VI','United States Virgin Islands',240,'North America'),('VN','Vietnam',241,'Asia'),('VU','Vanuatu',242,'Oceania'),('WF','Wallis and Futuna',243,'Oceania'),('WS','Samoa',244,'Oceania'),('YE','Yemen',245,'Asia'),('ZA','South Africa',246,'Africa'),('ZM','Zambia',247,'Africa'),('ZW','Zimbabwe',248,'Africa');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-30  0:17:34

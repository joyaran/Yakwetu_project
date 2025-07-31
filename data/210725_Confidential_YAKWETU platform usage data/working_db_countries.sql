-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 139.162.148.75    Database: working_db
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

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
  `country` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES ('AW','Aruba'),('AF','Afghanistan'),('AO','Angola'),('AI','Anguilla'),('AX','Åland Islands'),('AL','Albania'),('AD','Andorra'),('AE','United Arab Emirates'),('AR','Argentina'),('AM','Armenia'),('AS','American Samoa'),('AQ','Antarctica'),('TF','French Southern and Antarctic Lands'),('AG','Antigua and Barbuda'),('AU','Australia'),('AT','Austria'),('AZ','Azerbaijan'),('BI','Burundi'),('BE','Belgium'),('BJ','Benin'),('BF','Burkina Faso'),('BD','Bangladesh'),('BG','Bulgaria'),('BH','Bahrain'),('BS','Bahamas'),('BA','Bosnia and Herzegovina'),('BL','Saint Barthélemy'),('BY','Belarus'),('BZ','Belize'),('BM','Bermuda'),('BO','Bolivia'),('BR','Brazil'),('BB','Barbados'),('BN','Brunei'),('BT','Bhutan'),('BV','Bouvet Island'),('BW','Botswana'),('CF','Central African Republic'),('CA','Canada'),('CC','Cocos (Keeling) Islands'),('CH','Switzerland'),('CL','Chile'),('CN','China'),('CI','Ivory Coast'),('CM','Cameroon'),('CD','DR Congo'),('CG','Republic of the Congo'),('CK','Cook Islands'),('CO','Colombia'),('KM','Comoros'),('CV','Cape Verde'),('CR','Costa Rica'),('CU','Cuba'),('CW','Curaçao'),('CX','Christmas Island'),('KY','Cayman Islands'),('CY','Cyprus'),('CZ','Czechia'),('DE','Germany'),('DJ','Djibouti'),('DM','Dominica'),('DK','Denmark'),('DO','Dominican Republic'),('DZ','Algeria'),('EC','Ecuador'),('EG','Egypt'),('ER','Eritrea'),('EH','Western Sahara'),('ES','Spain'),('EE','Estonia'),('ET','Ethiopia'),('FI','Finland'),('FJ','Fiji'),('FK','Falkland Islands'),('FR','France'),('FO','Faroe Islands'),('FM','Micronesia'),('GA','Gabon'),('GB','United Kingdom'),('GE','Georgia'),('GG','Guernsey'),('GH','Ghana'),('GI','Gibraltar'),('GN','Guinea'),('GP','Guadeloupe'),('GM','Gambia'),('GW','Guinea-Bissau'),('GQ','Equatorial Guinea'),('GR','Greece'),('GD','Grenada'),('GL','Greenland'),('GT','Guatemala'),('GF','French Guiana'),('GU','Guam'),('GY','Guyana'),('HK','Hong Kong'),('HM','Heard Island and McDonald Islands'),('HN','Honduras'),('HR','Croatia'),('HT','Haiti'),('HU','Hungary'),('ID','Indonesia'),('IM','Isle of Man'),('IN','India'),('IO','British Indian Ocean Territory'),('IE','Ireland'),('IR','Iran'),('IQ','Iraq'),('IS','Iceland'),('IL','Israel'),('IT','Italy'),('JM','Jamaica'),('JE','Jersey'),('JO','Jordan'),('JP','Japan'),('KZ','Kazakhstan'),('KE','Kenya'),('KG','Kyrgyzstan'),('KH','Cambodia'),('KI','Kiribati'),('KN','Saint Kitts and Nevis'),('KR','South Korea'),('XK','Kosovo'),('KW','Kuwait'),('LA','Laos'),('LB','Lebanon'),('LR','Liberia'),('LY','Libya'),('LC','Saint Lucia'),('LI','Liechtenstein'),('LK','Sri Lanka'),('LS','Lesotho'),('LT','Lithuania'),('LU','Luxembourg'),('LV','Latvia'),('MO','Macau'),('MF','Saint Martin'),('MA','Morocco'),('MC','Monaco'),('MD','Moldova'),('MG','Madagascar'),('MV','Maldives'),('MX','Mexico'),('MH','Marshall Islands'),('MK','Macedonia'),('ML','Mali'),('MT','Malta'),('MM','Myanmar'),('ME','Montenegro'),('MN','Mongolia'),('MP','Northern Mariana Islands'),('MZ','Mozambique'),('MR','Mauritania'),('MS','Montserrat'),('MQ','Martinique'),('MU','Mauritius'),('MW','Malawi'),('MY','Malaysia'),('YT','Mayotte'),('NA','Namibia'),('NC','New Caledonia'),('NE','Niger'),('NF','Norfolk Island'),('NG','Nigeria'),('NI','Nicaragua'),('NU','Niue'),('NL','Netherlands'),('NO','Norway'),('NP','Nepal'),('NR','Nauru'),('NZ','New Zealand'),('OM','Oman'),('PK','Pakistan'),('PA','Panama'),('PN','Pitcairn Islands'),('PE','Peru'),('PH','Philippines'),('PW','Palau'),('PG','Papua New Guinea'),('PL','Poland'),('PR','Puerto Rico'),('KP','North Korea'),('PT','Portugal'),('PY','Paraguay'),('PS','Palestine'),('PF','French Polynesia'),('QA','Qatar'),('RE','Réunion'),('RO','Romania'),('RU','Russia'),('RW','Rwanda'),('SA','Saudi Arabia'),('SD','Sudan'),('SN','Senegal'),('SG','Singapore'),('GS','South Georgia'),('SJ','Svalbard and Jan Mayen'),('SB','Solomon Islands'),('SL','Sierra Leone'),('SV','El Salvador'),('SM','San Marino'),('SO','Somalia'),('PM','Saint Pierre and Miquelon'),('RS','Serbia'),('SS','South Sudan'),('ST','São Tomé and Príncipe'),('SR','Suriname'),('SK','Slovakia'),('SI','Slovenia'),('SE','Sweden'),('SZ','Swaziland'),('SX','Sint Maarten'),('SC','Seychelles'),('SY','Syria'),('TC','Turks and Caicos Islands'),('TD','Chad'),('TG','Togo'),('TH','Thailand'),('TJ','Tajikistan'),('TK','Tokelau'),('TM','Turkmenistan'),('TL','Timor-Leste'),('TO','Tonga'),('TT','Trinidad and Tobago'),('TN','Tunisia'),('TR','Turkey'),('TV','Tuvalu'),('TW','Taiwan'),('TZ','Tanzania'),('UG','Uganda'),('UA','Ukraine'),('UM','United States Minor Outlying Islands'),('UY','Uruguay'),('US','United States'),('UZ','Uzbekistan'),('VA','Vatican City'),('VC','Saint Vincent and the Grenadines'),('VE','Venezuela'),('VG','British Virgin Islands'),('VI','United States Virgin Islands'),('VN','Vietnam'),('VU','Vanuatu'),('WF','Wallis and Futuna'),('WS','Samoa'),('YE','Yemen'),('ZA','South Africa'),('ZM','Zambia'),('ZW','Zimbabwe');
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

-- Dump completed on 2025-07-21 23:18:54

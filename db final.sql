-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: mahatourism2
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `iata_code` varchar(3) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iata_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES ('ATQ','Sri Guru Ram Dass Jee International Airport','Amritsar'),('BHO','Bhopal Airport','Bhopal'),('BLR','Kempegowda International Airport','Bangalore'),('BOM','Chhatrapati Shivaji Maharaj International Airport','Mumbai'),('CCU','Netaji Subhas Chandra Bose International Airport','Kolkata'),('COK','Cochin International Airport','Kochi'),('DEL','Indira Gandhi International Airport','Delhi'),('GOI','Goa International Airport','Dabolim'),('HYD','Rajiv Gandhi International Airport','Hyderabad'),('IXA','Agartala Airport','Agartala'),('IXB','Bagdogra Airport','Siliguri'),('IXC','Chandigarh International Airport','Chandigarh'),('IXD','Allahabad Airport','Allahabad'),('IXE','Mangalore International Airport','Mangalore'),('IXG','Belagavi Airport','Belagavi'),('IXJ','Jammu Airport','Jammu'),('IXM','Madurai Airport','Madurai'),('IXN','Nagaon Airport','Nagaon'),('IXW','Dibrugarh Airport','Dibrugarh'),('JAI','Jaipur International Airport','Jaipur'),('KUU','Kochi International Airport','Kochi'),('LKO','Chaudhary Charan Singh International Airport','Lucknow'),('MAA','Chennai International Airport','Chennai'),('PNQ','Pune International Airport','Pune'),('RJS','Jaisalmer Airport','Jaisalmer'),('RPR','Raipur Airport','Raipur'),('SBH','Sambalpur Airport','Sambalpur'),('SBY','Surat International Airport','Surat'),('SXR','Sheikh ul-Alam International Airport','Srinagar'),('TRV','Trivandrum International Airport','Thiruvananthapuram'),('UDR','Maharana Pratap Airport','Udaipur'),('VGA','Vijayawada Airport','Vijayawada');
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `destination_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `category` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `open_hours` varchar(100) DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`destination_id`),
  KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'Aga Khan Palace','Historical palace and memorial','Pune, Maharashtra',1,'Nagar Road, Pune, Maharashtra 411006','9:00 AM - 5:30 PM',25.00,'https://www.mkgandhi.org/images/agakhan.jpg',18.547810,73.897910),(2,'Ajanta Caves','Ancient Buddhist rock-cut caves','Aurangabad, Maharashtra',2,'Ajanta, Maharashtra 431117','9:00 AM - 5:30 PM',40.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/AJANTA_CAVES_-_C.SHELARE_%282%29.jpg/500px-AJANTA_CAVES_-_C.SHELARE_%282%29.jpg',20.551981,75.703033),(3,'Alibaug Beach','Popular beach destination','Alibaug, Maharashtra',3,'Alibaug, Maharashtra 402201','24 hours',0.00,'https://media2.thrillophilia.com/images/photos/000/036/475/original/1526845151_1493447573-anjarle-beach1-jpg.jpeg?w=753&h=450&dpr=1.5',18.641346,72.872200),(4,'Bhaja Caves','Ancient Buddhist caves','Pune, Maharashtra',2,'Bhaja, Maharashtra 410406','8:00 AM - 6:00 PM',15.00,'https://upload.wikimedia.org/wikipedia/commons/0/08/The_Bhaje_Caves_05.jpg',18.732759,73.482362),(5,'Bhandardara','Hill station and reservoir','Ahmednagar, Maharashtra',4,'Bhandardara, Maharashtra 422604','24 hours',10.00,'https://hblimg.mmtcdn.com/content/hubble/img/Bhandardara/mmt/destination/m_Bhandardara_l_568_852.jpg',19.531940,73.753220),(6,'Bibi Ka Maqbara','Mughal architecture monument','Aurangabad, Maharashtra',1,'Begumpura, Aurangabad, Maharashtra 431004','8:00 AM - 6:00 PM',25.00,'https://dynamic-media-cdn.tripadvisor.com/media/photo-s/02/90/9a/86/filename-img-1930-jpg.jpg?w=600&h=-1&s=1',19.901678,75.318594),(7,'Chand Minar','Historic tower','Daulatabad, Maharashtra',1,'Daulatabad Fort, Maharashtra 431002','9:00 AM - 5:00 PM',20.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Daultabad_Fort.jpg/375px-Daultabad_Fort.jpg',19.942848,75.217082),(8,'Daulatabad Fort','Ancient hill fortress','Aurangabad, Maharashtra',1,'Daulatabad, Maharashtra 431002','9:00 AM - 5:00 PM',25.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Daulatabad_Fort_a_view.JPG/1920px-Daulatabad_Fort_a_view.JPG',19.943151,75.217874),(9,'Elephanta Caves','UNESCO World Heritage Site','Mumbai, Maharashtra',2,'Gharapuri Island, Mumbai, Maharashtra 400094','9:00 AM - 5:30 PM',40.00,'https://as2.ftcdn.net/v2/jpg/01/95/01/29/1000_F_195012919_4lyauB006OGTVuSOs9y0TQdufnUEofci.jpg',18.963444,72.931337),(10,'Gateway of India','Historic arch monument','Mumbai, Maharashtra',1,'Apollo Bandar, Mumbai, Maharashtra 400001','24 hours',0.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/900px-Mumbai_03-2016_30_Gateway_of_India.jpg',18.921984,72.834654),(11,'Karla Caves','Buddhist rock-cut shrines','Pune, Maharashtra',2,'Karla, Maharashtra 410405','8:00 AM - 6:00 PM',15.00,'https://cdn1.tripoto.com/media/filter/nl/img/2380291/Image/1697696653_karla_caves_banner.jpg.webp',18.747431,73.476280),(12,'Kolhapur','Historic city with temples','Kolhapur, Maharashtra',5,'Kolhapur, Maharashtra 416001','24 hours',0.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/1280px-Mahalaxmi_Temple%2C_Kolhapur.jpg',16.705500,74.243256),(13,'Lohagad Fort','Historic hill fort','Pune, Maharashtra',1,'Lohagad, Maharashtra 410406','9:00 AM - 6:00 PM',20.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ganesh_Darwaja_Lohagad.jpg/800px-Ganesh_Darwaja_Lohagad.jpg',18.708963,73.475662),(14,'Lonar Crater Lake','Meteor impact crater lake','Buldhana, Maharashtra',4,'Lonar, Maharashtra 443302','6:00 AM - 6:00 PM',20.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Lonar_Crater_Lake.jpg/1920px-Lonar_Crater_Lake.jpg',19.976528,76.508884),(15,'Lonavala','Hill station','Pune, Maharashtra',4,'Lonavala, Maharashtra 410401','24 hours',0.00,'https://upload.wikimedia.org/wikipedia/commons/d/dd/Lonavalamh.jpg',18.753481,73.409019),(16,'Mahabaleshwar','Popular hill station','Satara, Maharashtra',4,'Mahabaleshwar, Maharashtra 412806','24 hours',0.00,'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ab/40/f8/very-beautiful-hill-station.jpg?w=1200&h=-1&s=1',17.924699,73.641968),(17,'Maldhok Sanctuary','Bird sanctuary','Solapur, Maharashtra',6,'Maldhok, Maharashtra 413304','6:00 AM - 6:00 PM',30.00,'https://d3pc1xvrcw35tl.cloudfront.net/images/420x315/maldhok_20171017350.jpg',17.901842,75.524308),(18,'Matheran','Car-free hill station','Raigad, Maharashtra',4,'Matheran, Maharashtra 410102','24 hours',0.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Echo_Point_Matheran1.jpg/1199px-Echo_Point_Matheran1.jpg',18.982908,73.269226),(19,'Murud-Janjira Fort','Sea fort','Raigad, Maharashtra',1,'Murud, Maharashtra 402401','8:00 AM - 6:00 PM',25.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fort_Janjira_Unconquered.JPG/960px-Fort_Janjira_Unconquered.JPG',18.299845,72.964370),(20,'Panchgani','Hill station','Satara, Maharashtra',4,'Panchgani, Maharashtra 412805','24 hours',0.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Panchghani_Hill.jpg/375px-Panchghani_Hill.jpg',17.927433,73.804403),(21,'Panhala Fort','Historic fort','Kolhapur, Maharashtra',1,'Panhala, Maharashtra 416201','9:00 AM - 6:00 PM',20.00,'https://as1.ftcdn.net/v2/jpg/06/61/36/62/1000_F_661366269_KBlChZNpbT97pHcW8jFnnJZZ0PdXs7lc.jpg',16.812148,74.107321),(22,'Raigad Fort','Historic mountain fortress','Raigad, Maharashtra',1,'Raigad, Maharashtra 402305','8:00 AM - 6:00 PM',25.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Raigad_fort_towers.jpg/1000px-Raigad_fort_towers.jpg',18.233973,73.437965),(23,'Shani Shingnapur','Religious site','Ahmednagar, Maharashtra',7,'Shani Shingnapur, Maharashtra 413702','5:00 AM - 9:00 PM',0.00,'https://cdn1.tripoto.com/media/filter/nl/img/2380291/Image/1697296122_attr_wiki_963.jpg.webp',19.375583,74.845795),(24,'Shaniwar Wada','Historic fortification','Pune, Maharashtra',1,'Shaniwar Peth, Pune, Maharashtra 411030','8:00 AM - 6:30 PM',25.00,'https://static.toiimg.com/thumb/92863964/Shaniwar-Wada-Fort-Pune.jpg?width=636&height=358&resize=4',18.519615,73.855149),(25,'Shirdi','Religious pilgrimage site','Ahmednagar, Maharashtra',7,'Shirdi, Maharashtra 423109','24 hours',0.00,'https://sai.org.in/sites/default/files/DSC_7968.JPG',19.765819,74.476400),(26,'Sinhagad Fort','Mountain fortress','Pune, Maharashtra',1,'Sinhagad, Maharashtra 411025','24 hours',20.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Sinhgad_entrance.jpg/500px-Sinhgad_entrance.jpg',18.366215,73.754165),(27,'Sula Vineyards','Winery','Nashik, Maharashtra',8,'Gat 36/2, Govardhan Village, Nashik, Maharashtra 422222','11:00 AM - 10:00 PM',50.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sula_Vineyards_Updated_View.jpg/1920px-Sula_Vineyards_Updated_View.jpg',19.938967,73.797545),(28,'Tadoba National Park','Tiger reserve','Chandrapur, Maharashtra',6,'Tadoba, Maharashtra 442401','6:00 AM - 6:00 PM',150.00,'https://mytadoba.mahaforest.gov.in/frontAssets/assets/images/blog/image-tiger-2.jpg',20.260223,79.410225),(29,'Trimbakeshwar Temple','Sacred Shiva temple','Nashik, Maharashtra',7,'Trimbak, Maharashtra 422212','5:30 AM - 9:00 PM',10.00,'https://t3.ftcdn.net/jpg/03/60/60/38/240_F_360603867_cXOPmx34zTUXx4scBwJhp3t1D8vaZSZ1.jpg',19.932442,73.529948),(30,'Vijaydurg Fort','Coastal fortress','Sindhudurg, Maharashtra',1,'Vijaydurg, Maharashtra 416806','9:00 AM - 6:00 PM',25.00,'https://imgs.search.brave.com/yK5x374Vgb3-UF8Xu88AVqSPXBJ5VZ-MrMOrRQSHmyw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzlmL0Jhc3Rpb25z/X29mX3ZpamF5ZHVy/Zy5qcGc',16.561853,73.330496);
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `price_range` varchar(50) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Conrad Pune','aga_khan_palace','7 Mangaldas Road, Sangamvadi, Pune, Maharashtra 411001',4.60,'?9000-?15000','+912067166666','reservations.pune@conradhotels.com','https://www.hilton.com/en/hotels/pnqcici-conrad-pune/','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',18.530913,73.876884),(2,'Novotel Pune Nagar Road','aga_khan_palace','Weikfield IT Park, Pune Nagar Road, Pune, Maharashtra 411014',4.30,'?5000-?8000','+912066814444','h8088@accor.com','https://all.accor.com/hotel/6833/index.en.shtml?','https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',18.547769,73.891090),(3,'VITS Hotel Aurangabad','ajanta_caves','Vedant Nagar, Airport Road, Aurangabad, Maharashtra 431003',4.20,'?3500-?6000','+912406603030','reservation@vitsaurangabad.com','https://www.vitshotels.com/aurangabad/','https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',19.867676,75.398191),(4,'WelcomHotel Rama International','ajanta_caves','R-3, Chikalthana, MIDC, Airport Road, Aurangabad, Maharashtra 431210',4.40,'?4500-?8000','+912406625555','reservations.rama@itchotels.in','https://www.itchotels.com/in/en/welcomhotelaurangabad','https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089',19.872890,75.399421),(5,'Radisson Blu Resort & Spa Alibaug','alibaug_beach','Survey No. 96/1, Alibaug-Pen Road, Gondhalpada, Veshvi, Alibaug, Maharashtra 402208',4.50,'?12000-?20000','+912141302000','reservations.alibaug@radisson.com','https://www.radissonhotels.com/en-us/hotels/radisson-blu-resort-alibaug','https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',18.673462,72.908402),(6,'U Tropicana Alibaug','alibaug_beach','Chondi Naka, Mapgaon Road, Alibaug, Maharashtra 402201',4.30,'?8000-?15000','+912141302888','reserve@utropicanaalibaug.com','https://www.utropicanaalibaug.com/','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',18.641921,72.876543),(7,'The Dukes Retreat','bhaja','Khandala-Lonavala Road, Khandala, Maharashtra 410301',4.10,'?6000-?10000','+912169273300','reservations@dukesretreat.com','https://www.dukesretreat.com/','https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920',18.758562,73.373833),(8,'Della Resort','bhaja','Della Adventure, 177/178, Kunegaon, Lonavala, Maharashtra 410401',4.50,'?9000-?18000','+912114698000','reservations@dellaresorts.com','https://www.dellaresorts.com/','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074',18.756780,73.455062),(9,'MTDC Resort Bhandardara','bhandardara','Bhandardara Dam, Bhandardara, Maharashtra 422604',3.80,'?2500-?4500','+917588482831','bhandardaramtdc@maharashtratourism.gov.in','https://www.maharashtratourism.gov.in/mtdc-resorts/bhandardara','https://images.unsplash.com/photo-1519449556851-5720b33024e7?q=80&w=2071',19.542734,73.753537),(10,'Anandvan Resort','bhandardara','Shendi, Bhandardara, Maharashtra 422604',4.40,'?7000-?12000','+912562263513','info@anandvanresort.com','https://www.anandvanresort.com/','https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?q=80&w=2071',19.544982,73.751245),(11,'Lemon Tree Hotel Aurangabad','bibikamaqbara','8-N-12, CIDCO, Rauza Bagh, Aurangabad, Maharashtra 431003',4.20,'?4000-?7000','+912406603030','hi.ar@lemontreehotels.com','https://www.lemontreehotels.com/lemon-tree-hotel/aurangabad/aurangabad.aspx','https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070',19.923815,75.318336),(12,'Vivanta Aurangabad','bibikamaqbara','8-N-12, CIDCO, Dr. Rafiq Zakaria Marg, Rauza Bagh, Aurangabad, Maharashtra 431003',4.50,'?6000-?12000','+912406663737','vivanta.aurangabad@tajhotels.com','https://www.vivantahotels.com/en-in/vivanta-aurangabad-maharashtra/','https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070',19.924561,75.319872),(13,'The Ambassador Ajanta','chand_minar','Maliwada, Jalna Road, Cidco N-1, Aurangabad, Maharashtra 431003',4.00,'?3500-?6000','+912402484848','reservations@ambassadorajanta.com','https://www.ambassadorindia.com/ambassador-ajanta-aurangabad/','https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1935',19.914365,75.350281),(14,'VITS Aurangabad','chand_minar','Vedant Nagar, Airport Road, Aurangabad, Maharashtra 431003',4.10,'?4000-?7000','+912406603030','reservation@vitsaurangabad.com','https://www.vitshotels.com/aurangabad/','https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=1950',19.867676,75.398191),(15,'JW Marriott Hotel Pune','shaniwar_wada','Senapati Bapat Road, Pune, Maharashtra 411053',4.70,'?12000-?20000','+912066833333','pune.reservation@marriott.com','https://www.marriott.com/en-us/hotels/pnqmc-jw-marriott-hotel-pune/overview/','https://images.unsplash.com/jw_marriott_pune.jpg',18.519876,73.855432),(16,'The Pride Hotel Pune','shaniwar_wada','5, University Road, Shivajinagar, Pune, Maharashtra 411005',4.30,'?5000-?9000','+912067047777','reservation.pune@pridehotel.com','https://www.pridehotel.com/pune/the-pride-hotel-pune/','https://images.unsplash.com/pride_pune.jpg',18.521234,73.857654),(17,'St. Laurn The Spiritual Resort','shirdi','Ahmednagar Manmad Highway, Shirdi, Maharashtra 423109',4.50,'?5000-?9000','+912423304999','reservation@stlaurn.com','https://www.stlaurn.com/shirdi','https://images.unsplash.com/st_laurn.jpg',19.765432,74.478901),(18,'Hotel Sai Palace','shirdi','Pimpalwadi Road, Shirdi, Maharashtra 423109',4.30,'?4000-?7000','+912423255678','info@saiplacehotel.com','https://www.saiplacehotel.com/','https://images.unsplash.com/sai_palace.jpg',19.767654,74.480123),(19,'Fort JennyRaja Resort','sinhagad','Sinhagad Road, Near Sinhagad Fort, Pune, Maharashtra 411025',4.10,'?4500-?7500','+919370220087','info@fortjennyrajaresort.com','http://www.fortjennyrajaresort.com/','https://images.unsplash.com/jenny_raja.jpg',18.366789,73.755432),(20,'MTDC Resort Sinhagad','sinhagad','Near Sinhagad Fort, Pune, Maharashtra 411025',3.80,'?2000-?3500','+912024271560','sinhagadmtdc@maharashtratourism.gov.in','https://www.maharashtratourism.gov.in/mtdc-resorts/sinhagad','https://images.unsplash.com/mtdc_sinhagad.jpg',18.368901,73.757654),(21,'The Source at Sula','sula_vineyards','Sula Vineyards, Gat No. 36/2, Govardhan, Off Gangapur-Savargaon Road, Nashik, Maharashtra 422222',4.60,'?10000-?18000','+912532302091','reservations@sulawines.com','https://sulavineyards.com/source-rooms.php','https://images.unsplash.com/the_source.jpg',20.001234,73.778901),(22,'Beyond by Sula','sula_vineyards','Sula Vineyards, Gat No. 36/2, Govardhan, Off Gangapur-Savargaon Road, Nashik, Maharashtra 422222',4.50,'?8000-?15000','+912532302091','reservations@sulawines.com','https://sulavineyards.com/stay-with-us-beyond.php','https://images.unsplash.com/beyond_sula.jpg',20.001234,73.778901),(23,'Svasara Jungle Lodge','tadoba_park','Village Dhada, Chimur Taluka, Chandrapur District, Maharashtra 442401',4.50,'?15000-?25000','+917243254313','info@svasararesorts.com','https://www.svasararesorts.com','https://images.unsplash.com/svasara_lodge.jpg',20.287500,79.388200),(24,'Irai Safari Retreat','tadoba_park','Moharli Gate, Tadoba Andhari Tiger Reserve, Maharashtra 441212',4.40,'?8000-?12000','+918806562022','reservations@iraisafariretreat.com','https://www.iraisafariretreat.com','https://images.unsplash.com/irai_safari.jpg',20.257300,79.396800),(25,'Hotel Kailas','trimbakeshwar_temple','Dindori Road, Near Temple, Trimbak, Maharashtra 422212',4.30,'?2500-?4000','+912594234240','hotelkailas@gmail.com','https://www.hotelkailas.com','https://images.unsplash.com/hotel_kailas.jpg',19.932800,73.530900),(26,'MTDC Resort Trimbakeshwar','trimbakeshwar_temple','Near Trimbakeshwar Temple, Trimbak, Maharashtra 422212',4.20,'?2000-?3500','+912594233115','reservations@maharashtratourism.gov.in','https://www.mtdc.co/en/','https://images.unsplash.com/mtdc_trimbak.jpg',19.932000,73.530500),(27,'Blue Ocean Resort','vijaydurg','Near Vijaydurg Fort, Vijaydurg, Sindhudurg, Maharashtra 416805',4.10,'?3500-?5500','+912365240061','info@blueoceanresort.in','https://www.blueoceanresort.in','https://images.unsplash.com/blue_ocean.jpg',16.563200,73.331600),(28,'MTDC Resort Vijaydurg','vijaydurg','Vijaydurg-Kharepatan Road, Vijaydurg, Maharashtra 416805',4.00,'?2000-?4000','+912365240225','mtdcvijaydurg@maharashtratourism.gov.in','https://www.mtdc.co/en/','https://images.unsplash.com/mtdc_vijaydurg.jpg',16.565400,73.333400),(29,'Conrad Pune','aga_khan_palace','7 Mangaldas Road, Sangamvadi, Pune, Maharashtra 411001',4.60,'?9000-?15000','+912067166666','reservations.pune@conradhotels.com','https://www.hilton.com/en/hotels/pnqcici-conrad-pune/','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',18.530913,73.876884),(30,'Novotel Pune Nagar Road','aga_khan_palace','Weikfield IT Park, Pune Nagar Road, Pune, Maharashtra 411014',4.30,'?5000-?8000','+912066814444','h8088@accor.com','https://all.accor.com/hotel/6833/index.en.shtml?','https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',18.547769,73.891090),(31,'VITS Hotel Aurangabad','ajanta_caves','Vedant Nagar, Airport Road, Aurangabad, Maharashtra 431003',4.20,'?3500-?6000','+912406603030','reservation@vitsaurangabad.com','https://www.vitshotels.com/aurangabad/','https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',19.867676,75.398191),(32,'WelcomHotel Rama International','ajanta_caves','R-3, Chikalthana, MIDC, Airport Road, Aurangabad, Maharashtra 431210',4.40,'?4500-?8000','+912406625555','reservations.rama@itchotels.in','https://www.itchotels.com/in/en/welcomhotelaurangabad','https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089',19.872890,75.399421),(33,'Radisson Blu Resort & Spa Alibaug','alibaug_beach','Survey No. 96/1, Alibaug-Pen Road, Gondhalpada, Veshvi, Alibaug, Maharashtra 402208',4.50,'?12000-?20000','+912141302000','reservations.alibaug@radisson.com','https://www.radissonhotels.com/en-us/hotels/radisson-blu-resort-alibaug','https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',18.673462,72.908402),(34,'U Tropicana Alibaug','alibaug_beach','Chondi Naka, Mapgaon Road, Alibaug, Maharashtra 402201',4.30,'?8000-?15000','+912141302888','reserve@utropicanaalibaug.com','https://www.utropicanaalibaug.com/','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',18.641921,72.876543),(35,'The Dukes Retreat','bhaja','Khandala-Lonavala Road, Khandala, Maharashtra 410301',4.10,'?6000-?10000','+912169273300','reservations@dukesretreat.com','https://www.dukesretreat.com/','https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920',18.758562,73.373833),(36,'Della Resort','bhaja','Della Adventure, 177/178, Kunegaon, Lonavala, Maharashtra 410401',4.50,'?9000-?18000','+912114698000','reservations@dellaresorts.com','https://www.dellaresorts.com/','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074',18.756780,73.455062),(37,'MTDC Resort Bhandardara','bhandardara','Bhandardara Dam, Bhandardara, Maharashtra 422604',3.80,'?2500-?4500','+917588482831','bhandardaramtdc@maharashtratourism.gov.in','https://www.maharashtratourism.gov.in/mtdc-resorts/bhandardara','https://images.unsplash.com/photo-1519449556851-5720b33024e7?q=80&w=2071',19.542734,73.753537),(38,'Anandvan Resort','bhandardara','Shendi, Bhandardara, Maharashtra 422604',4.40,'?7000-?12000','+912562263513','info@anandvanresort.com','https://www.anandvanresort.com/','https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?q=80&w=2071',19.544982,73.751245),(39,'Lemon Tree Hotel Aurangabad','bibikamaqbara','8-N-12, CIDCO, Rauza Bagh, Aurangabad, Maharashtra 431003',4.20,'?4000-?7000','+912406603030','hi.ar@lemontreehotels.com','https://www.lemontreehotels.com/lemon-tree-hotel/aurangabad/aurangabad.aspx','https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070',19.923815,75.318336),(40,'Vivanta Aurangabad','bibikamaqbara','8-N-12, CIDCO, Dr. Rafiq Zakaria Marg, Rauza Bagh, Aurangabad, Maharashtra 431003',4.50,'?6000-?12000','+912406663737','vivanta.aurangabad@tajhotels.com','https://www.vivantahotels.com/en-in/vivanta-aurangabad-maharashtra/','https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070',19.924561,75.319872),(41,'The Ambassador Ajanta','chand_minar','Maliwada, Jalna Road, Cidco N-1, Aurangabad, Maharashtra 431003',4.00,'?3500-?6000','+912402484848','reservations@ambassadorajanta.com','https://www.ambassadorindia.com/ambassador-ajanta-aurangabad/','https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1935',19.914365,75.350281),(42,'VITS Aurangabad','chand_minar','Vedant Nagar, Airport Road, Aurangabad, Maharashtra 431003',4.10,'?4000-?7000','+912406603030','reservation@vitsaurangabad.com','https://www.vitshotels.com/aurangabad/','https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=1950',19.867676,75.398191),(43,'Conrad Pune','aga_khan_palace','7 Mangaldas Road, Sangamvadi, Pune, Maharashtra 411001',4.60,'?9000-?15000','+912067166666','reservations.pune@conradhotels.com','https://www.hilton.com/en/hotels/pnqcici-conrad-pune/','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',18.530913,73.876884),(44,'Novotel Pune Nagar Road','aga_khan_palace','Weikfield IT Park, Pune Nagar Road, Pune, Maharashtra 411014',4.30,'?5000-?8000','+912066814444','h8088@accor.com','https://all.accor.com/hotel/6833/index.en.shtml?','https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',18.547769,73.891090);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inclusions`
--

DROP TABLE IF EXISTS `inclusions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inclusions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inclusions`
--

LOCK TABLES `inclusions` WRITE;
/*!40000 ALTER TABLE `inclusions` DISABLE KEYS */;
/*!40000 ALTER TABLE `inclusions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL,
  `description` text,
  `visit_duration` int DEFAULT NULL,
  `category` enum('Historical','Beach','Temple','Fort','Cave','Nature','Vineyard','Park','Other') NOT NULL,
  `recommended_time_of_day` enum('Morning','Afternoon','Evening','Any') DEFAULT 'Any',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `location_name` (`location_name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary`
--

LOCK TABLES `itinerary` WRITE;
/*!40000 ALTER TABLE `itinerary` DISABLE KEYS */;
INSERT INTO `itinerary` VALUES (1,'aga_khan_palace','Historical monument and museum in Pune that served as a prison for Mahatma Gandhi',120,'Historical','Morning',18.54790000,73.90030000,25.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(2,'ajanta_caves','UNESCO World Heritage site with 30 Buddhist cave monuments dating from 2nd century BCE to 650 CE',240,'Cave','Morning',20.55190000,75.70330000,40.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(3,'alibaug_beach','Popular beach destination near Mumbai with beautiful coastline and water activities',180,'Beach','Evening',18.64180000,72.87190000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(4,'bhaja','Ancient Buddhist caves dating back to 2nd century BC with intricate carvings',120,'Cave','Morning',18.73200000,73.48270000,15.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(5,'bhandardara','Scenic hill station with Arthur Lake and Randha Falls',300,'Nature','Any',19.54670000,73.75530000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(6,'bibikamaqbara','Mausoleum of Aurangzeb\'s wife that resembles the Taj Mahal',90,'Historical','Afternoon',19.90330000,75.31830000,20.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(7,'chand_minar','Ancient tower in Daulatabad Fort with Persian architectural influence',60,'Historical','Afternoon',19.94310000,75.21820000,10.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(8,'daulatabad','Ancient hill fortress with remarkable defensive systems',180,'Fort','Morning',19.94310000,75.21820000,25.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(9,'elephanta_caves','UNESCO World Heritage site with ancient cave temples dedicated to Lord Shiva',180,'Cave','Morning',18.96330000,72.93110000,40.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(10,'gateway_india','Iconic monument in Mumbai built to commemorate the visit of King George V and Queen Mary',60,'Historical','Evening',18.92200000,72.83470000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(11,'karla','Rock-cut Buddhist cave shrines dating back to 2nd century BC',120,'Cave','Morning',18.78550000,73.47620000,15.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(12,'kolhapur','Historic city with Mahalakshmi Temple and New Palace Museum',240,'Historical','Any',16.70500000,74.24330000,30.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(13,'lohagad','Historic hill fort with strategic importance during Maratha empire',150,'Fort','Morning',18.71470000,73.47910000,15.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(14,'lonar','Crater lake formed by a meteorite impact, surrounded by forest and temples',180,'Nature','Morning',19.97600000,76.50800000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(15,'lonavala','Popular hill station with scenic views, caves and waterfalls',300,'Nature','Any',18.75460000,73.40650000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(16,'mahabaleshwar','Hill station with panoramic viewpoints, strawberry farms and boating lakes',360,'Nature','Any',17.92310000,73.64140000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(17,'maldhok','Grassland sanctuary known for Great Indian Bustard conservation',180,'Nature','Morning',18.26460000,75.28100000,20.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(18,'matheran','Car-free hill station with numerous viewpoints and colonial architecture',360,'Nature','Any',18.98770000,73.26790000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(19,'murudjanjira','Sea fort with massive walls and unique rounded structure',150,'Fort','Morning',18.29930000,72.96410000,20.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(20,'panchgani','Hill station with table land, caves and strawberry farms',240,'Nature','Any',17.92460000,73.80090000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(21,'panhala','Historic fort with significant role in Maratha history',180,'Fort','Morning',16.81080000,74.11090000,15.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(22,'raigad','Mountain fortress and capital of the Maratha Empire under Shivaji',240,'Fort','Morning',18.23360000,73.44130000,30.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(23,'shani','Temple town featuring the famous Shani Shingnapur temple',120,'Temple','Morning',19.87610000,74.91300000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(24,'shaniwar_wada','Historic fortified residence of the Peshwas in Pune',120,'Historical','Afternoon',18.51950000,73.85530000,25.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(25,'shirdi','Religious town renowned for Sai Baba temple and pilgrimage site',180,'Temple','Any',19.76450000,74.47660000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(26,'sinhagad','Mountain fortress with historical significance in Maratha history',180,'Fort','Morning',18.36590000,73.75490000,20.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(27,'sula_vineyards','Leading winery offering tours, tastings and resort experiences',150,'Vineyard','Afternoon',19.98980000,73.77950000,50.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(28,'tadoba_park','Maharashtra\'s largest national park known for tiger sightings',300,'Park','Morning',20.23100000,79.39260000,100.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(29,'trimbakeshwar_temple','Ancient Hindu temple dedicated to Lord Shiva, one of the 12 Jyotirlingas',120,'Temple','Morning',19.93220000,73.53070000,0.00,'2025-03-22 10:46:59','2025-03-22 10:46:59'),(30,'vijaydurg','Coastal fort with naval significance, known as the \"Victory Fort\"',150,'Fort','Morning',16.56190000,73.33230000,15.00,'2025-03-22 10:46:59','2025-03-22 10:46:59');
/*!40000 ALTER TABLE `itinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_accommodations`
--

DROP TABLE IF EXISTS `package_accommodations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_accommodations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `star_rating` decimal(2,1) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_accommodations_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_accommodations`
--

LOCK TABLES `package_accommodations` WRITE;
/*!40000 ALTER TABLE `package_accommodations` DISABLE KEYS */;
INSERT INTO `package_accommodations` VALUES (1,1,'Pune, Maharashtra Resort','Pune, Maharashtra',3.6,'https://example.com/hotels/pune,_maharashtra_hotel.jpg'),(2,2,'Aurangabad, Maharashtra Resort','Aurangabad, Maharashtra',4.3,'https://example.com/hotels/aurangabad,_maharashtra_hotel.jpg'),(3,3,'Alibaug, Maharashtra Resort','Alibaug, Maharashtra',3.4,'https://example.com/hotels/alibaug,_maharashtra_hotel.jpg'),(4,4,'Lonavala, Maharashtra Resort','Lonavala, Maharashtra',3.3,'https://example.com/hotels/lonavala,_maharashtra_hotel.jpg'),(5,5,'Ahmednagar, Maharashtra Resort','Ahmednagar, Maharashtra',3.1,'https://example.com/hotels/ahmednagar,_maharashtra_hotel.jpg'),(6,6,'Aurangabad, Maharashtra Resort','Aurangabad, Maharashtra',4.7,'https://example.com/hotels/aurangabad,_maharashtra_hotel.jpg'),(7,7,'Daulatabad, Maharashtra Resort','Daulatabad, Maharashtra',3.1,'https://example.com/hotels/daulatabad,_maharashtra_hotel.jpg'),(8,8,'Aurangabad, Maharashtra Resort','Aurangabad, Maharashtra',4.6,'https://example.com/hotels/aurangabad,_maharashtra_hotel.jpg'),(9,9,'Mumbai, Maharashtra Resort','Mumbai, Maharashtra',4.7,'https://example.com/hotels/mumbai,_maharashtra_hotel.jpg'),(10,10,'Mumbai, Maharashtra Resort','Mumbai, Maharashtra',4.8,'https://example.com/hotels/mumbai,_maharashtra_hotel.jpg'),(11,11,'Lonavala, Maharashtra Resort','Lonavala, Maharashtra',4.6,'https://example.com/hotels/lonavala,_maharashtra_hotel.jpg'),(12,12,'Kolhapur, Maharashtra Resort','Kolhapur, Maharashtra',3.7,'https://example.com/hotels/kolhapur,_maharashtra_hotel.jpg'),(13,13,'Lonavala, Maharashtra Resort','Lonavala, Maharashtra',3.6,'https://example.com/hotels/lonavala,_maharashtra_hotel.jpg'),(14,14,'Buldhana, Maharashtra Resort','Buldhana, Maharashtra',3.8,'https://example.com/hotels/buldhana,_maharashtra_hotel.jpg'),(15,15,'Lonavala, Maharashtra Resort','Lonavala, Maharashtra',3.5,'https://example.com/hotels/lonavala,_maharashtra_hotel.jpg'),(16,16,'Satara, Maharashtra Resort','Satara, Maharashtra',5.0,'https://example.com/hotels/satara,_maharashtra_hotel.jpg'),(17,17,'Solapur, Maharashtra Resort','Solapur, Maharashtra',3.5,'https://example.com/hotels/solapur,_maharashtra_hotel.jpg'),(18,18,'Raigad, Maharashtra Resort','Raigad, Maharashtra',3.4,'https://example.com/hotels/raigad,_maharashtra_hotel.jpg'),(19,19,'Raigad, Maharashtra Resort','Raigad, Maharashtra',3.4,'https://example.com/hotels/raigad,_maharashtra_hotel.jpg'),(20,20,'Satara, Maharashtra Resort','Satara, Maharashtra',3.8,'https://example.com/hotels/satara,_maharashtra_hotel.jpg'),(21,21,'Kolhapur, Maharashtra Resort','Kolhapur, Maharashtra',3.9,'https://example.com/hotels/kolhapur,_maharashtra_hotel.jpg'),(22,22,'Raigad, Maharashtra Resort','Raigad, Maharashtra',3.0,'https://example.com/hotels/raigad,_maharashtra_hotel.jpg'),(23,23,'Ahmednagar, Maharashtra Resort','Ahmednagar, Maharashtra',4.4,'https://example.com/hotels/ahmednagar,_maharashtra_hotel.jpg'),(24,24,'Pune, Maharashtra Resort','Pune, Maharashtra',4.2,'https://example.com/hotels/pune,_maharashtra_hotel.jpg'),(25,25,'Ahmednagar, Maharashtra Resort','Ahmednagar, Maharashtra',4.5,'https://example.com/hotels/ahmednagar,_maharashtra_hotel.jpg'),(26,26,'Pune, Maharashtra Resort','Pune, Maharashtra',3.2,'https://example.com/hotels/pune,_maharashtra_hotel.jpg'),(27,27,'Nashik, Maharashtra Resort','Nashik, Maharashtra',3.4,'https://example.com/hotels/nashik,_maharashtra_hotel.jpg'),(28,28,'Chandrapur, Maharashtra Resort','Chandrapur, Maharashtra',4.2,'https://example.com/hotels/chandrapur,_maharashtra_hotel.jpg'),(29,29,'Nashik, Maharashtra Resort','Nashik, Maharashtra',3.8,'https://example.com/hotels/nashik,_maharashtra_hotel.jpg'),(30,30,'Sindhudurg, Maharashtra Resort','Sindhudurg, Maharashtra',3.4,'https://example.com/hotels/sindhudurg,_maharashtra_hotel.jpg');
/*!40000 ALTER TABLE `package_accommodations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_activities`
--

DROP TABLE IF EXISTS `package_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `day` int NOT NULL,
  `activity` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_activities_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_activities`
--

LOCK TABLES `package_activities` WRITE;
/*!40000 ALTER TABLE `package_activities` DISABLE KEYS */;
INSERT INTO `package_activities` VALUES (1,1,1,'Arrival at Pune, Maharashtra'),(2,2,1,'Arrival at Aurangabad, Maharashtra'),(3,3,1,'Arrival at Alibaug, Maharashtra'),(4,4,1,'Arrival at Lonavala, Maharashtra'),(5,5,1,'Arrival at Ahmednagar, Maharashtra'),(6,6,1,'Arrival at Aurangabad, Maharashtra'),(7,7,1,'Arrival at Daulatabad, Maharashtra'),(8,8,1,'Arrival at Aurangabad, Maharashtra'),(9,9,1,'Arrival at Mumbai, Maharashtra'),(10,10,1,'Arrival at Mumbai, Maharashtra'),(11,11,1,'Arrival at Lonavala, Maharashtra'),(12,12,1,'Arrival at Kolhapur, Maharashtra'),(13,13,1,'Arrival at Lonavala, Maharashtra'),(14,14,1,'Arrival at Buldhana, Maharashtra'),(15,15,1,'Arrival at Lonavala, Maharashtra'),(16,16,1,'Arrival at Satara, Maharashtra'),(17,17,1,'Arrival at Solapur, Maharashtra'),(18,18,1,'Arrival at Raigad, Maharashtra'),(19,19,1,'Arrival at Raigad, Maharashtra'),(20,20,1,'Arrival at Satara, Maharashtra'),(21,21,1,'Arrival at Kolhapur, Maharashtra'),(22,22,1,'Arrival at Raigad, Maharashtra'),(23,23,1,'Arrival at Ahmednagar, Maharashtra'),(24,24,1,'Arrival at Pune, Maharashtra'),(25,25,1,'Arrival at Ahmednagar, Maharashtra'),(26,26,1,'Arrival at Pune, Maharashtra'),(27,27,1,'Arrival at Nashik, Maharashtra'),(28,28,1,'Arrival at Chandrapur, Maharashtra'),(29,29,1,'Arrival at Nashik, Maharashtra'),(30,30,1,'Arrival at Sindhudurg, Maharashtra'),(32,1,2,'Sightseeing in Pune, Maharashtra'),(33,2,2,'Sightseeing in Aurangabad, Maharashtra'),(34,3,2,'Sightseeing in Alibaug, Maharashtra'),(35,4,2,'Sightseeing in Lonavala, Maharashtra'),(36,5,2,'Sightseeing in Ahmednagar, Maharashtra'),(37,6,2,'Sightseeing in Aurangabad, Maharashtra'),(38,7,2,'Sightseeing in Daulatabad, Maharashtra'),(39,8,2,'Sightseeing in Aurangabad, Maharashtra'),(40,9,2,'Sightseeing in Mumbai, Maharashtra'),(41,10,2,'Sightseeing in Mumbai, Maharashtra'),(42,11,2,'Sightseeing in Lonavala, Maharashtra'),(43,12,2,'Sightseeing in Kolhapur, Maharashtra'),(44,13,2,'Sightseeing in Lonavala, Maharashtra'),(45,14,2,'Sightseeing in Buldhana, Maharashtra'),(46,15,2,'Sightseeing in Lonavala, Maharashtra'),(47,16,2,'Sightseeing in Satara, Maharashtra'),(48,17,2,'Sightseeing in Solapur, Maharashtra'),(49,18,2,'Sightseeing in Raigad, Maharashtra'),(50,19,2,'Sightseeing in Raigad, Maharashtra'),(51,20,2,'Sightseeing in Satara, Maharashtra'),(52,21,2,'Sightseeing in Kolhapur, Maharashtra'),(53,22,2,'Sightseeing in Raigad, Maharashtra'),(54,23,2,'Sightseeing in Ahmednagar, Maharashtra'),(55,24,2,'Sightseeing in Pune, Maharashtra'),(56,25,2,'Sightseeing in Ahmednagar, Maharashtra'),(57,26,2,'Sightseeing in Pune, Maharashtra'),(58,27,2,'Sightseeing in Nashik, Maharashtra'),(59,28,2,'Sightseeing in Chandrapur, Maharashtra'),(60,29,2,'Sightseeing in Nashik, Maharashtra'),(61,30,2,'Sightseeing in Sindhudurg, Maharashtra');
/*!40000 ALTER TABLE `package_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_exclusions`
--

DROP TABLE IF EXISTS `package_exclusions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_exclusions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_exclusions_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_exclusions`
--

LOCK TABLES `package_exclusions` WRITE;
/*!40000 ALTER TABLE `package_exclusions` DISABLE KEYS */;
INSERT INTO `package_exclusions` VALUES (1,1,'Personal Expenses'),(2,2,'Extra Meals'),(3,3,'Personal Expenses'),(4,4,'Extra Meals'),(5,5,'Souvenirs'),(6,6,'Travel Insurance'),(7,7,'Souvenirs'),(8,8,'Travel Insurance'),(9,9,'Extra Meals'),(10,10,'Extra Meals'),(11,11,'Personal Expenses'),(12,12,'Travel Insurance'),(13,13,'Extra Meals'),(14,14,'Personal Expenses'),(15,15,'Personal Expenses'),(16,16,'Personal Expenses'),(17,17,'Personal Expenses'),(18,18,'Extra Meals'),(19,19,'Personal Expenses'),(20,20,'Souvenirs'),(21,21,'Personal Expenses'),(22,22,'Extra Meals'),(23,23,'Personal Expenses'),(24,24,'Extra Meals'),(25,25,'Personal Expenses'),(26,26,'Personal Expenses'),(27,27,'Travel Insurance'),(28,28,'Extra Meals'),(29,29,'Travel Insurance'),(30,30,'Souvenirs');
/*!40000 ALTER TABLE `package_exclusions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_faqs`
--

DROP TABLE IF EXISTS `package_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_faqs_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_faqs`
--

LOCK TABLES `package_faqs` WRITE;
/*!40000 ALTER TABLE `package_faqs` DISABLE KEYS */;
INSERT INTO `package_faqs` VALUES (1,1,'What is the best time to visit?','The best time to visit Pune, Maharashtra is between October and March.'),(2,2,'What is the best time to visit?','The best time to visit Aurangabad, Maharashtra is between October and March.'),(3,3,'What is the best time to visit?','The best time to visit Alibaug, Maharashtra is between October and March.'),(4,4,'What is the best time to visit?','The best time to visit Lonavala, Maharashtra is between October and March.'),(5,5,'What is the best time to visit?','The best time to visit Ahmednagar, Maharashtra is between October and March.'),(6,6,'What is the best time to visit?','The best time to visit Aurangabad, Maharashtra is between October and March.'),(7,7,'What is the best time to visit?','The best time to visit Daulatabad, Maharashtra is between October and March.'),(8,8,'What is the best time to visit?','The best time to visit Aurangabad, Maharashtra is between October and March.'),(9,9,'What is the best time to visit?','The best time to visit Mumbai, Maharashtra is between October and March.'),(10,10,'What is the best time to visit?','The best time to visit Mumbai, Maharashtra is between October and March.'),(11,11,'What is the best time to visit?','The best time to visit Lonavala, Maharashtra is between October and March.'),(12,12,'What is the best time to visit?','The best time to visit Kolhapur, Maharashtra is between October and March.'),(13,13,'What is the best time to visit?','The best time to visit Lonavala, Maharashtra is between October and March.'),(14,14,'What is the best time to visit?','The best time to visit Buldhana, Maharashtra is between October and March.'),(15,15,'What is the best time to visit?','The best time to visit Lonavala, Maharashtra is between October and March.'),(16,16,'What is the best time to visit?','The best time to visit Satara, Maharashtra is between October and March.'),(17,17,'What is the best time to visit?','The best time to visit Solapur, Maharashtra is between October and March.'),(18,18,'What is the best time to visit?','The best time to visit Raigad, Maharashtra is between October and March.'),(19,19,'What is the best time to visit?','The best time to visit Raigad, Maharashtra is between October and March.'),(20,20,'What is the best time to visit?','The best time to visit Satara, Maharashtra is between October and March.'),(21,21,'What is the best time to visit?','The best time to visit Kolhapur, Maharashtra is between October and March.'),(22,22,'What is the best time to visit?','The best time to visit Raigad, Maharashtra is between October and March.'),(23,23,'What is the best time to visit?','The best time to visit Ahmednagar, Maharashtra is between October and March.'),(24,24,'What is the best time to visit?','The best time to visit Pune, Maharashtra is between October and March.'),(25,25,'What is the best time to visit?','The best time to visit Ahmednagar, Maharashtra is between October and March.'),(26,26,'What is the best time to visit?','The best time to visit Pune, Maharashtra is between October and March.'),(27,27,'What is the best time to visit?','The best time to visit Nashik, Maharashtra is between October and March.'),(28,28,'What is the best time to visit?','The best time to visit Chandrapur, Maharashtra is between October and March.'),(29,29,'What is the best time to visit?','The best time to visit Nashik, Maharashtra is between October and March.'),(30,30,'What is the best time to visit?','The best time to visit Sindhudurg, Maharashtra is between October and March.'),(32,1,'Are meals included?','Meals are not included. You can explore local cuisine.'),(33,2,'Are meals included?','Breakfast is included in the package.'),(34,3,'Are meals included?','Meals are not included. You can explore local cuisine.'),(35,4,'Are meals included?','Breakfast is included in the package.'),(36,5,'Are meals included?','Breakfast is included in the package.'),(37,6,'Are meals included?','Breakfast is included in the package.'),(38,7,'Are meals included?','Meals are not included. You can explore local cuisine.'),(39,8,'Are meals included?','Breakfast is included in the package.'),(40,9,'Are meals included?','Meals are not included. You can explore local cuisine.'),(41,10,'Are meals included?','Breakfast is included in the package.'),(42,11,'Are meals included?','Breakfast is included in the package.'),(43,12,'Are meals included?','Breakfast is included in the package.'),(44,13,'Are meals included?','Meals are not included. You can explore local cuisine.'),(45,14,'Are meals included?','Breakfast is included in the package.'),(46,15,'Are meals included?','Breakfast is included in the package.'),(47,16,'Are meals included?','Meals are not included. You can explore local cuisine.'),(48,17,'Are meals included?','Meals are not included. You can explore local cuisine.'),(49,18,'Are meals included?','Meals are not included. You can explore local cuisine.'),(50,19,'Are meals included?','Breakfast is included in the package.'),(51,20,'Are meals included?','Meals are not included. You can explore local cuisine.'),(52,21,'Are meals included?','Breakfast is included in the package.'),(53,22,'Are meals included?','Breakfast is included in the package.'),(54,23,'Are meals included?','Breakfast is included in the package.'),(55,24,'Are meals included?','Meals are not included. You can explore local cuisine.'),(56,25,'Are meals included?','Breakfast is included in the package.'),(57,26,'Are meals included?','Breakfast is included in the package.'),(58,27,'Are meals included?','Breakfast is included in the package.'),(59,28,'Are meals included?','Meals are not included. You can explore local cuisine.'),(60,29,'Are meals included?','Breakfast is included in the package.'),(61,30,'Are meals included?','Breakfast is included in the package.');
/*!40000 ALTER TABLE `package_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_images`
--

DROP TABLE IF EXISTS `package_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_images_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_images`
--

LOCK TABLES `package_images` WRITE;
/*!40000 ALTER TABLE `package_images` DISABLE KEYS */;
INSERT INTO `package_images` VALUES (1,1,'https://example.com/images/pune,_maharashtra.jpg'),(2,2,'https://example.com/images/aurangabad,_maharashtra.jpg'),(3,3,'https://example.com/images/alibaug,_maharashtra.jpg'),(4,4,'https://example.com/images/lonavala,_maharashtra.jpg'),(5,5,'https://example.com/images/ahmednagar,_maharashtra.jpg'),(6,6,'https://example.com/images/aurangabad,_maharashtra.jpg'),(7,7,'https://example.com/images/daulatabad,_maharashtra.jpg'),(8,8,'https://example.com/images/aurangabad,_maharashtra.jpg'),(9,9,'https://example.com/images/mumbai,_maharashtra.jpg'),(10,10,'https://example.com/images/mumbai,_maharashtra.jpg'),(11,11,'https://example.com/images/lonavala,_maharashtra.jpg'),(12,12,'https://example.com/images/kolhapur,_maharashtra.jpg'),(13,13,'https://example.com/images/lonavala,_maharashtra.jpg'),(14,14,'https://example.com/images/buldhana,_maharashtra.jpg'),(15,15,'https://example.com/images/lonavala,_maharashtra.jpg'),(16,16,'https://example.com/images/satara,_maharashtra.jpg'),(17,17,'https://example.com/images/solapur,_maharashtra.jpg'),(18,18,'https://example.com/images/raigad,_maharashtra.jpg'),(19,19,'https://example.com/images/raigad,_maharashtra.jpg'),(20,20,'https://example.com/images/satara,_maharashtra.jpg'),(21,21,'https://example.com/images/kolhapur,_maharashtra.jpg'),(22,22,'https://example.com/images/raigad,_maharashtra.jpg'),(23,23,'https://example.com/images/ahmednagar,_maharashtra.jpg'),(24,24,'https://example.com/images/pune,_maharashtra.jpg'),(25,25,'https://example.com/images/ahmednagar,_maharashtra.jpg'),(26,26,'https://example.com/images/pune,_maharashtra.jpg'),(27,27,'https://example.com/images/nashik,_maharashtra.jpg'),(28,28,'https://example.com/images/chandrapur,_maharashtra.jpg'),(29,29,'https://example.com/images/nashik,_maharashtra.jpg'),(30,30,'https://example.com/images/sindhudurg,_maharashtra.jpg');
/*!40000 ALTER TABLE `package_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_inclusions`
--

DROP TABLE IF EXISTS `package_inclusions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_inclusions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_inclusions_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_inclusions`
--

LOCK TABLES `package_inclusions` WRITE;
/*!40000 ALTER TABLE `package_inclusions` DISABLE KEYS */;
INSERT INTO `package_inclusions` VALUES (1,1,'Flight','directions-bus'),(2,2,'Hotel','flight'),(3,3,'Hotel','directions-bus'),(4,4,'Flight','hotel'),(5,5,'Hotel','directions-bus'),(6,6,'Transport','hotel'),(7,7,'Hotel','directions-bus'),(8,8,'Hotel','hotel'),(9,9,'Hotel','hotel'),(10,10,'Hotel','hotel'),(11,11,'Transport','hotel'),(12,12,'Flight','hotel'),(13,13,'Transport','flight'),(14,14,'Flight','directions-bus'),(15,15,'Transport','directions-bus'),(16,16,'Hotel','directions-bus'),(17,17,'Transport','hotel'),(18,18,'Hotel','hotel'),(19,19,'Hotel','hotel'),(20,20,'Flight','hotel'),(21,21,'Hotel','hotel'),(22,22,'Flight','hotel'),(23,23,'Flight','hotel'),(24,24,'Hotel','flight'),(25,25,'Hotel','flight'),(26,26,'Hotel','directions-bus'),(27,27,'Transport','flight'),(28,28,'Transport','flight'),(29,29,'Hotel','hotel'),(30,30,'Flight','flight');
/*!40000 ALTER TABLE `package_inclusions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_itinerary`
--

DROP TABLE IF EXISTS `package_itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_itinerary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `day` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_itinerary_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_itinerary`
--

LOCK TABLES `package_itinerary` WRITE;
/*!40000 ALTER TABLE `package_itinerary` DISABLE KEYS */;
INSERT INTO `package_itinerary` VALUES (1,1,1,'Arrival at Pune, Maharashtra','Reach Pune, Maharashtra, check-in to hotel, and relax'),(2,2,1,'Arrival at Aurangabad, Maharashtra','Reach Aurangabad, Maharashtra, check-in to hotel, and relax'),(3,3,1,'Arrival at Alibaug, Maharashtra','Reach Alibaug, Maharashtra, check-in to hotel, and relax'),(4,4,1,'Arrival at Lonavala, Maharashtra','Reach Lonavala, Maharashtra, check-in to hotel, and relax'),(5,5,1,'Arrival at Ahmednagar, Maharashtra','Reach Ahmednagar, Maharashtra, check-in to hotel, and relax'),(6,6,1,'Arrival at Aurangabad, Maharashtra','Reach Aurangabad, Maharashtra, check-in to hotel, and relax'),(7,7,1,'Arrival at Daulatabad, Maharashtra','Reach Daulatabad, Maharashtra, check-in to hotel, and relax'),(8,8,1,'Arrival at Aurangabad, Maharashtra','Reach Aurangabad, Maharashtra, check-in to hotel, and relax'),(9,9,1,'Arrival at Mumbai, Maharashtra','Reach Mumbai, Maharashtra, check-in to hotel, and relax'),(10,10,1,'Arrival at Mumbai, Maharashtra','Reach Mumbai, Maharashtra, check-in to hotel, and relax'),(11,11,1,'Arrival at Lonavala, Maharashtra','Reach Lonavala, Maharashtra, check-in to hotel, and relax'),(12,12,1,'Arrival at Kolhapur, Maharashtra','Reach Kolhapur, Maharashtra, check-in to hotel, and relax'),(13,13,1,'Arrival at Lonavala, Maharashtra','Reach Lonavala, Maharashtra, check-in to hotel, and relax'),(14,14,1,'Arrival at Buldhana, Maharashtra','Reach Buldhana, Maharashtra, check-in to hotel, and relax'),(15,15,1,'Arrival at Lonavala, Maharashtra','Reach Lonavala, Maharashtra, check-in to hotel, and relax'),(16,16,1,'Arrival at Satara, Maharashtra','Reach Satara, Maharashtra, check-in to hotel, and relax'),(17,17,1,'Arrival at Solapur, Maharashtra','Reach Solapur, Maharashtra, check-in to hotel, and relax'),(18,18,1,'Arrival at Raigad, Maharashtra','Reach Raigad, Maharashtra, check-in to hotel, and relax'),(19,19,1,'Arrival at Raigad, Maharashtra','Reach Raigad, Maharashtra, check-in to hotel, and relax'),(20,20,1,'Arrival at Satara, Maharashtra','Reach Satara, Maharashtra, check-in to hotel, and relax'),(21,21,1,'Arrival at Kolhapur, Maharashtra','Reach Kolhapur, Maharashtra, check-in to hotel, and relax'),(22,22,1,'Arrival at Raigad, Maharashtra','Reach Raigad, Maharashtra, check-in to hotel, and relax'),(23,23,1,'Arrival at Ahmednagar, Maharashtra','Reach Ahmednagar, Maharashtra, check-in to hotel, and relax'),(24,24,1,'Arrival at Pune, Maharashtra','Reach Pune, Maharashtra, check-in to hotel, and relax'),(25,25,1,'Arrival at Ahmednagar, Maharashtra','Reach Ahmednagar, Maharashtra, check-in to hotel, and relax'),(26,26,1,'Arrival at Pune, Maharashtra','Reach Pune, Maharashtra, check-in to hotel, and relax'),(27,27,1,'Arrival at Nashik, Maharashtra','Reach Nashik, Maharashtra, check-in to hotel, and relax'),(28,28,1,'Arrival at Chandrapur, Maharashtra','Reach Chandrapur, Maharashtra, check-in to hotel, and relax'),(29,29,1,'Arrival at Nashik, Maharashtra','Reach Nashik, Maharashtra, check-in to hotel, and relax'),(30,30,1,'Arrival at Sindhudurg, Maharashtra','Reach Sindhudurg, Maharashtra, check-in to hotel, and relax'),(32,1,2,'Explore Pune, Maharashtra','Full day sightseeing in Pune, Maharashtra'),(33,2,2,'Explore Aurangabad, Maharashtra','Full day sightseeing in Aurangabad, Maharashtra'),(34,3,2,'Explore Alibaug, Maharashtra','Full day sightseeing in Alibaug, Maharashtra'),(35,4,2,'Explore Lonavala, Maharashtra','Full day sightseeing in Lonavala, Maharashtra'),(36,5,2,'Explore Ahmednagar, Maharashtra','Full day sightseeing in Ahmednagar, Maharashtra'),(37,6,2,'Explore Aurangabad, Maharashtra','Full day sightseeing in Aurangabad, Maharashtra'),(38,7,2,'Explore Daulatabad, Maharashtra','Full day sightseeing in Daulatabad, Maharashtra'),(39,8,2,'Explore Aurangabad, Maharashtra','Full day sightseeing in Aurangabad, Maharashtra'),(40,9,2,'Explore Mumbai, Maharashtra','Full day sightseeing in Mumbai, Maharashtra'),(41,10,2,'Explore Mumbai, Maharashtra','Full day sightseeing in Mumbai, Maharashtra'),(42,11,2,'Explore Lonavala, Maharashtra','Full day sightseeing in Lonavala, Maharashtra'),(43,12,2,'Explore Kolhapur, Maharashtra','Full day sightseeing in Kolhapur, Maharashtra'),(44,13,2,'Explore Lonavala, Maharashtra','Full day sightseeing in Lonavala, Maharashtra'),(45,14,2,'Explore Buldhana, Maharashtra','Full day sightseeing in Buldhana, Maharashtra'),(46,15,2,'Explore Lonavala, Maharashtra','Full day sightseeing in Lonavala, Maharashtra'),(47,16,2,'Explore Satara, Maharashtra','Full day sightseeing in Satara, Maharashtra'),(48,17,2,'Explore Solapur, Maharashtra','Full day sightseeing in Solapur, Maharashtra'),(49,18,2,'Explore Raigad, Maharashtra','Full day sightseeing in Raigad, Maharashtra'),(50,19,2,'Explore Raigad, Maharashtra','Full day sightseeing in Raigad, Maharashtra'),(51,20,2,'Explore Satara, Maharashtra','Full day sightseeing in Satara, Maharashtra'),(52,21,2,'Explore Kolhapur, Maharashtra','Full day sightseeing in Kolhapur, Maharashtra'),(53,22,2,'Explore Raigad, Maharashtra','Full day sightseeing in Raigad, Maharashtra'),(54,23,2,'Explore Ahmednagar, Maharashtra','Full day sightseeing in Ahmednagar, Maharashtra'),(55,24,2,'Explore Pune, Maharashtra','Full day sightseeing in Pune, Maharashtra'),(56,25,2,'Explore Ahmednagar, Maharashtra','Full day sightseeing in Ahmednagar, Maharashtra'),(57,26,2,'Explore Pune, Maharashtra','Full day sightseeing in Pune, Maharashtra'),(58,27,2,'Explore Nashik, Maharashtra','Full day sightseeing in Nashik, Maharashtra'),(59,28,2,'Explore Chandrapur, Maharashtra','Full day sightseeing in Chandrapur, Maharashtra'),(60,29,2,'Explore Nashik, Maharashtra','Full day sightseeing in Nashik, Maharashtra'),(61,30,2,'Explore Sindhudurg, Maharashtra','Full day sightseeing in Sindhudurg, Maharashtra'),(63,1,3,'Departure','Check out from hotel and return journey'),(64,3,3,'Departure','Check out from hotel and return journey'),(65,5,3,'Departure','Check out from hotel and return journey'),(66,6,3,'Departure','Check out from hotel and return journey'),(67,8,3,'Departure','Check out from hotel and return journey'),(68,11,3,'Departure','Check out from hotel and return journey'),(69,12,3,'Departure','Check out from hotel and return journey'),(70,14,3,'Departure','Check out from hotel and return journey'),(71,15,3,'Departure','Check out from hotel and return journey'),(72,17,3,'Departure','Check out from hotel and return journey'),(73,18,3,'Departure','Check out from hotel and return journey'),(74,19,3,'Departure','Check out from hotel and return journey'),(75,20,3,'Departure','Check out from hotel and return journey'),(76,22,3,'Departure','Check out from hotel and return journey'),(77,25,3,'Departure','Check out from hotel and return journey'),(78,30,3,'Departure','Check out from hotel and return journey');
/*!40000 ALTER TABLE `package_itinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `duration_nights` int NOT NULL,
  `duration_days` int NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `discounted_price` decimal(10,2) NOT NULL,
  `discount_percentage` int NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `review_count` int NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,'Explore Aga Khan Palace Historical Tour','Pune, Maharashtra',2,3,14999.00,11999.00,20,4.70,215,'Discover the rich historical significance of Aga Khan Palace, a monument of national importance with deep connections to India\'s freedom struggle.'),(2,'Ajanta Caves Ancient Art Expedition','Aurangabad, Maharashtra',3,4,24999.00,19999.00,20,4.80,312,'Immerse yourself in the breathtaking Buddhist cave paintings and architectural marvels of the UNESCO World Heritage Site Ajanta Caves.'),(3,'Alibaug Beach Retreat','Alibaug, Maharashtra',2,3,16999.00,13499.00,20,4.50,187,'Relax and unwind at the serene coastal destination of Alibaug, known for its pristine beaches and historic coastal forts.'),(4,'Bhaja Caves Cultural Exploration','Lonavala, Maharashtra',1,2,9999.00,7999.00,20,4.60,156,'Explore the ancient Buddhist rock-cut caves of Bhaja, showcasing remarkable architectural and sculptural heritage.'),(5,'Bhandardara Nature Escapade','Ahmednagar, Maharashtra',2,3,17999.00,14399.00,20,4.70,203,'Experience the natural beauty of Bhandardara with its serene lakes, waterfalls, and lush green landscapes.'),(6,'Bibi Ka Maqbara Heritage Tour','Aurangabad, Maharashtra',2,3,15999.00,12799.00,20,4.60,178,'Visit the stunning Bibi Ka Maqbara, often called the \"Taj of the Deccan\", a magnificent Mughal architectural marvel.'),(7,'Chand Minar Historical Expedition','Daulatabad, Maharashtra',1,2,8999.00,7199.00,20,4.50,132,'Explore the impressive Chand Minar, a historic tower located in the magnificent Daulatabad Fort.'),(8,'Daulatabad Fort Adventure','Aurangabad, Maharashtra',2,3,18999.00,15199.00,20,4.70,245,'Discover the impregnable Daulatabad Fort, a masterpiece of medieval military architecture and engineering.'),(9,'Elephanta Caves Maritime Excursion','Mumbai, Maharashtra',1,2,12999.00,10399.00,20,4.60,267,'Explore the UNESCO World Heritage Site of Elephanta Caves, featuring remarkable rock-cut temple caves.'),(10,'Gateway of India Mumbai Experience','Mumbai, Maharashtra',1,2,11999.00,9599.00,20,4.50,312,'Discover the iconic Gateway of India and explore the historic and vibrant surroundings of Mumbai.'),(11,'Karla Caves Buddhist Heritage Tour','Lonavala, Maharashtra',2,3,16999.00,13599.00,20,4.70,189,'Explore the ancient Buddhist rock-cut caves of Karla, featuring magnificent chaitya halls and intricate sculptures.'),(12,'Kolhapur Cultural Odyssey','Kolhapur, Maharashtra',2,3,19999.00,15999.00,20,4.60,176,'Experience the rich cultural heritage of Kolhapur, known for its historic temples, palaces, and traditional crafts.'),(13,'Lohagad Fort Trekking Adventure','Lonavala, Maharashtra',1,2,9999.00,7999.00,20,4.80,215,'Embark on an exciting trek to the historic Lohagad Fort, offering breathtaking views of the Sahyadri mountains.'),(14,'Lonar Crater Geological Expedition','Buldhana, Maharashtra',2,3,17999.00,14399.00,20,4.50,132,'Visit the unique Lonar Crater, a meteorite impact site with extraordinary geological and ecological significance.'),(15,'Lonavala Hill Station Retreat','Lonavala, Maharashtra',2,3,15999.00,12799.00,20,4.70,267,'Enjoy a relaxing getaway in the picturesque hill station of Lonavala, surrounded by lush greenery and scenic landscapes.'),(16,'Mahabaleshwar Mountain Escape','Satara, Maharashtra',3,4,24999.00,19999.00,20,4.80,312,'Experience the natural beauty and pleasant climate of Mahabaleshwar, Maharashtra\'s most popular hill station.'),(17,'Maldhok Wildlife Sanctuary Tour','Solapur, Maharashtra',2,3,16999.00,13599.00,20,4.60,156,'Explore the diverse wildlife and bird species at the Maldhok Wildlife Sanctuary.'),(18,'Matheran Eco-Friendly Getaway','Raigad, Maharashtra',2,3,18999.00,15199.00,20,4.70,245,'Discover the unique charm of Matheran, an eco-sensitive hill station with no motorized vehicles.'),(19,'Murud-Janjira Fort Maritime Adventure','Raigad, Maharashtra',2,3,19999.00,15999.00,20,4.60,187,'Explore the unconquered sea fort of Murud-Janjira, a testament to Maratha naval architecture.'),(20,'Panchgani Hill Station Experience','Satara, Maharashtra',2,3,17999.00,14399.00,20,4.70,203,'Enjoy the scenic beauty and pleasant climate of Panchgani, a charming hill station near Mahabaleshwar.'),(21,'Panhala Fort Historical Tour','Kolhapur, Maharashtra',1,2,11999.00,9599.00,20,4.50,178,'Visit the largest fort in the Deccan, Panhala Fort, with its rich historical significance and stunning views.'),(22,'Raigad Fort Historic Expedition','Raigad, Maharashtra',2,3,21999.00,17599.00,20,4.80,267,'Explore the historic Raigad Fort, the capital of the Maratha Empire and the coronation site of Chhatrapati Shivaji Maharaj.'),(23,'Shani Shingnapur Spiritual Journey','Ahmednagar, Maharashtra',1,2,8999.00,7199.00,20,4.60,132,'Experience the unique spiritual atmosphere of Shani Shingnapur, a village known for its distinctive religious practices.'),(24,'Shaniwar Wada Heritage Walk','Pune, Maharashtra',1,2,10999.00,8799.00,20,4.50,215,'Discover the historic Shaniwar Wada, the grand palace of the Peshwas in Pune.'),(25,'Shirdi Spiritual Pilgrimage','Ahmednagar, Maharashtra',2,3,14999.00,11999.00,20,4.70,312,'Embark on a spiritual journey to Shirdi, the home of Saint Sai Baba, a significant pilgrimage destination.'),(26,'Sinhagad Fort Trekking Experience','Pune, Maharashtra',1,2,9999.00,7999.00,20,4.80,189,'Trek to the historic Sinhagad Fort, a symbol of Maratha valor and offering panoramic views of the surrounding landscape.'),(27,'Sula Vineyards Wine Tour','Nashik, Maharashtra',1,2,12999.00,10399.00,20,4.60,176,'Experience a delightful wine tour at Sula Vineyards, exploring the wine-making process and enjoying wine tastings.'),(28,'Tadoba National Park Wildlife Safari','Chandrapur, Maharashtra',3,4,29999.00,23999.00,20,4.90,245,'Embark on an exciting wildlife safari in Tadoba Andhari Tiger Reserve, one of the best tiger conservation areas.'),(29,'Trimbakeshwar Temple Spiritual Tour','Nashik, Maharashtra',1,2,10999.00,8799.00,20,4.70,203,'Visit the sacred Trimbakeshwar Temple, one of the twelve Jyotirlinga shrines dedicated to Lord Shiva.'),(30,'Vijaydurg Fort Coastal Heritage','Sindhudurg, Maharashtra',2,3,20999.00,16799.00,20,4.60,156,'Explore the historic Vijaydurg Fort, a magnificent sea fort that showcases the naval prowess of the Maratha Empire.');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Amit','Singh','amitrajputdeonia00@gmail.com','$2b$10$H7bofjEc1.EU4wo26mQ/geU5LywjWovJYjxytcAWJtDvSb71McbPK','9906690319',NULL),(2,'Anooj','Shete','anoojshete@gmail.com','$2b$10$ocEtltrDxZNC/LHJ8hwfy.BXd1bCgJfx96aSJzYDQi0YleMBwDGUC','7385776309',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 23:59:33

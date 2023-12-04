CREATE DATABASE  IF NOT EXISTS `courseRegistration` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `courseRegistration`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: db-management.c5bdqeiszfup.us-east-2.rds.amazonaws.com    Database: courseRegistration
-- ------------------------------------------------------
-- Server version	8.0.33

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `courseSubjects`
--

DROP TABLE IF EXISTS `courseSubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseSubjects` (
  `subjectID` varchar(60) NOT NULL,
  `subjectName` varchar(60) NOT NULL,
  `subjectCourses` json DEFAULT NULL,
  PRIMARY KEY (`subjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseSubjects`
--

LOCK TABLES `courseSubjects` WRITE;
/*!40000 ALTER TABLE `courseSubjects` DISABLE KEYS */;
INSERT INTO `courseSubjects` VALUES ('CISS','Computer Information Systems','[\"160\", \"201\", \"331\", \"451\", \"402\", \"170\"]'),('CPCS','Computer Science','[\"303\", \"304\", \"305\", \"307\", \"308\", \"309\", \"310\", \"102\", \"202\", \"250\", \"321\", \"420\"]'),('CPEN','Computer Engineering','[\"101\", \"598\", \"516\", \"210\", \"427\", \"320\", \"621\", \"645\", \"667\"]'),('Math','Mathematics','[\"208\", \"497\", \"511\", \"5112\", \"515\", \"521\", \"527\", \"636\", \"689\", \"730\"]');
/*!40000 ALTER TABLE `courseSubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseID` varchar(7) NOT NULL,
  `courseName` varchar(60) NOT NULL,
  `courseSubjectID` varchar(60) DEFAULT NULL,
  `courseTerm` varchar(30) NOT NULL,
  `courseStartTime` time NOT NULL,
  `courseEndTime` time NOT NULL,
  `courseDaysOfWeek` json DEFAULT NULL,
  `courseRoom` varchar(60) NOT NULL,
  `courseLocation` varchar(60) DEFAULT NULL,
  `courseCredits` float(3,2) NOT NULL,
  `courseCareer` varchar(15) NOT NULL,
  `courseInstructor` varchar(20) DEFAULT NULL,
  `prerequisites` json DEFAULT NULL,
  `corequisites` json DEFAULT NULL,
  `courseSeats` int NOT NULL,
  `courseStudents` json DEFAULT NULL,
  `courseWaitList` json DEFAULT NULL,
  PRIMARY KEY (`courseID`),
  KEY `courses_ibfk_1` (`courseSubjectID`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`courseSubjectID`) REFERENCES `courseSubjects` (`subjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('101','Introduction to Computer Engineering','CPEN','Fall 2024','10:00:00','11:30:00','[\"Mon\", \"Wed\"]','101','Main Campus',3.00,'Undergraduate','John Doe','[]','[]',30,'[\"122\", \"123\"]','[]'),('102','Intro to Computing','CPCS','Spring Semester 2024','08:00:00','09:30:00','[\"Tue\", \"Thu\"]','305','Main Campus',3.00,'Undergraduate','Jeff Carter','[\"101\"]',NULL,35,'[\"122\", \"123\", \"38\"]',NULL),('160','JAVA Programming','CISS','Spring Semester 2024','08:00:00','09:30:00','[\"Mon\", \"Wed\", \"Fri\"]','501','Campus 1',3.00,'Undergraduate','John Smith',NULL,'[\"101\"]',60,'[\"122\", \"34\", \"38\"]',NULL),('170','Visual BASIC','CISS','Spring Semester 2024','15:30:00','17:00:00','[\"Mon\", \"Wed\", \"Fri\"]','801','Campus 2',3.00,'Undergraduate','Matthew Wilson',NULL,NULL,60,'[\"122\", \"38\"]',NULL),('201','Networking Basics','CISS','Spring Semester 2024','09:30:00','11:00:00','[\"Tue\", \"Thu\"]','801','Campus 2',3.00,'Undergraduate','Michael Brown',NULL,NULL,60,'[\"125\", \"34\"]',NULL),('202','Data Structures','CPCS','Spring Semester 2024','10:00:00','11:30:00','[\"Mon\", \"Wed\", \"Fri\"]','307','Main Campus',3.00,'Undergraduate','Daniel Hughes',NULL,NULL,3,'[\"130\", \"129\", \"122\"]','[\"123\", \"34\", \"135\"]'),('208','Introduction to Discrete Mathematics','Math','Spring','09:30:00','10:30:00','[\"Monday\", \"Wednesday\", \"Friday\"]','A-102','Campus 3',3.00,'Undergraduate','Micheal Brown',NULL,NULL,50,NULL,NULL),('210','Computational Problem Solving','CPEN','Spring Semester 2024','14:00:00','15:30:00','[\"Mon\", \"Wed\", \"Fri\"]','001','Main Campus',3.00,'Undergraduate','Tim Allen',NULL,NULL,30,'[\"135\"]',NULL),('250','Computer Organization','CPCS','Spring Semester 2024','13:00:00','14:30:00','[\"Tue\", \"Thu\"]','309','Main Campus',3.00,'Undergraduate','Johnson Robertson',NULL,NULL,35,NULL,NULL),('303','Introduction to Database Systems','CPCS','Spring 2022','08:00:00','09:30:00','[\"Mon\", \"Wed\", \"Fri\"]','101','Campus 1',3.00,'Undergraduate','James Davis','[\"CSE201\", \"CSE202\"]','[\"CSE203\"]',60,'[\"s123\", \"s234\", \"s345\"]','[\"s456\", \"s567\"]'),('305','Fundamentals of Software Engineering','CPCS','Spring 2022','10:00:00','11:30:00','[\"Tue\", \"Thu\"]','202','Campus 2',3.00,'Undergraduate','Jane Smith','[\"CSE204\"]','{}',80,'[\"s678\", \"s789\", \"s890\"]','[\"s123\", \"s234\"]'),('307','Web Development','CPCS','Spring 2022','12:00:00','13:30:00','[\"Mon\", \"Wed\"]','303','Campus 3',3.00,'Undergraduate','Amy White','[\"CSE205\", \"CSE206\"]','[]',70,'[\"s345\", \"s456\", \"s87\"]','[]'),('308','Computer Networks','CPCS','Spring 2022','11:30:00','13:00:00','[\"Tue\", \"Thu\"]','103','Campus 1',3.00,'Undergraduate','John Doe','[\"CSE201\", \"CSE202\"]','[\"CSE203\"]',60,'[\"s125\", \"s236\", \"s347\"]','[\"s458\", \"s569\"]'),('309','Artificial Intelligence','CPCS','Fall 2022','13:30:00','15:00:00','[\"Mon\", \"Wed\", \"Fri\"]','104','Campus 1',3.00,'Undergraduate','Sarah Johnson','[\"CSE201\", \"CSE202\"]','[\"CSE203\"]',60,'[\"s126\", \"s237\", \"s348\"]','[\"s459\", \"s580\"]'),('310','Machine Learning','CPCS','Fall 2022','08:00:00','09:30:00','[\"Mon\", \"Wed\", \"Fri\"]','105','Campus 1',3.00,'Undergraduate','Mark Miller','[\"CSE304\", \"CSE306\"]','[]',60,'[\"s127\", \"s238\", \"s349\"]','[\"s460\", \"s571\"]'),('320','Computer Systems','CPEN','Spring Semester 2024','13:00:00','14:30:00','[\"Mon\", \"Wed\", \"Fri\"]','001','Main Campus',3.00,'Undergraduate','James Wilson',NULL,NULL,30,NULL,NULL),('321','Operating Systems','CPCS','Spring Semester 2024','15:00:00','16:30:00','[\"Mon\", \"Wed\"]','311','Main Campus',3.00,'Undergraduate','Candace Owens',NULL,NULL,35,NULL,NULL),('331','Programming for Cybersecurity','CISS','Spring Semester 2024','11:00:00','12:30:00','[\"Mon\", \"Wed\", \"Fri\"]','801','Campus 2',3.00,'Undergraduate','Jessica Lee',NULL,NULL,60,NULL,NULL),('402','Troubleshtg Cmplx IP-bas Netwk','CISS','Spring Semester 2024','14:00:00','15:30:00','[\"Wed\", \"Fri\"]','001','Campus 1',3.00,'Undergraduate','Jennifer Brown',NULL,NULL,60,NULL,NULL),('420','Advanced Algorithms','CPCS','Spring Semester 2024','09:00:00','10:30:00','[\"Tue\", \"Thu\"]','313','Main Campus',3.00,'Graduate','Sun Kim',NULL,NULL,30,NULL,NULL),('427','Computer Networks','CPEN','Spring Semester 2024','16:00:00','17:30:00','[\"Tue\", \"Thu\"]','001','Main Campus',3.00,'Undergraduate','Jose Garcia',NULL,NULL,30,NULL,NULL),('451','Senior Projects I','CISS','Spring Semester 2024','12:30:00','14:00:00','[\"Tue\", \"Thu\"]','801','Campus 2',3.00,'Undergraduate','Rachel Thompson',NULL,NULL,60,NULL,NULL),('497','Indiv Reading: Math','Math','Fall 2023','09:30:00','10:30:00','[\"Tuesday\", \"Thursday\"]','C-303','Campus 3',3.00,'Graduate','Amy White',NULL,NULL,50,NULL,NULL),('511','Abstract Algebra I','Math','Fall 2023','09:30:00','10:30:00','[\"Monday\", \"Wednesday\", \"Friday\"]','A-101','Campus 1',3.00,'Graduate','John Doe',NULL,NULL,50,'[\"39\"]',NULL),('5112','Abstract Algebra I (Online)','Math','Fall 2023','12:30:00','13:30:00','[\"Tuesday\", \"Thursday\"]','Online','Campus 3',3.00,'Graduate','Jane Smith',NULL,NULL,50,NULL,NULL),('515','Combinatorics & Graph Theory','Math','Fall 2023','08:30:00','09:30:00','[\"Tuesday\", \"Thursday\"]','A-103','Campus 1',3.00,'Graduate','Sarah Jones',NULL,NULL,50,'[\"39\"]',NULL),('516','System Simulation','CPEN','Spring Semester 2024','11:00:00','12:30:00','[\"Tue\", \"Thu\"]','001','Main Campus',3.00,'Graduate','Sarah Jones',NULL,NULL,30,NULL,NULL),('521','Advanced Calculus I','Math','Fall 2023','16:30:00','17:30:00','[\"Monday\", \"Wednesday\", \"Friday\"]','A-102','Campus 1',3.00,'Graduate','James Davis',NULL,NULL,50,'[\"39\"]',NULL),('527','Applied Numerical Methods I','Math','Fall 2023','14:30:00','15:30:00','[\"Monday\", \"Wednesday\", \"Friday\"]','C-302','Campus 3',3.00,'Graduate','Michael Brown',NULL,NULL,50,NULL,NULL),('598','ST: Computer Engineering','CPEN','Spring Semester 2024','10:00:00','11:30:00','[\"Mon\", \"Wed\"]','802','Campus A',3.00,'Graduate','Jane Smith','[]','[]',25,'[]','[]'),('621','Advanced Networking','CPEN','Spring Semester 2024','09:00:00','10:30:00','[\"Mon\", \"Wed\"]','303','Main Campus',3.00,'Undergraduate','Paul Newman',NULL,NULL,30,'[\"41\"]',NULL),('636','Adv Combinatorics & Graph Thry','Math','Fall 2023','14:30:00','15:30:00','[\"Monday\", \"Wednesday\", \"Friday\"]','B-201','Campus 2',3.00,'Graduate','David Johnson',NULL,NULL,50,NULL,NULL),('645','Embedded Systems Design','CPEN','Spring Semester 2024','11:00:00','12:30:00','[\"Tue\", \"Thu\"]','404','Main Campus',3.00,'Undergraduate','Steve Martin',NULL,NULL,30,NULL,NULL),('667','Machine Learning for Engineering','CPEN','Spring Semester 2024','13:00:00','14:30:00','[\"Mon\", \"Wed\", \"Fri\"]','501','Main Campus',3.00,'Graduate','Shubh Patel',NULL,NULL,25,NULL,NULL),('689','Adv T: Mathematics','Math','Fall 2023','08:30:00','09:30:00','[\"Tuesday\", \"Thursday\"]','C-301','Campus 3',3.00,'Graduate','Ana Williams',NULL,NULL,50,NULL,NULL),('730','Advanced Num Sol Part Diff Equ','Math','Fall 2023','09:30:00','10:30:00','[\"Tuesday\", \"Thursday\"]','B-202','Campus 2',3.00,'Graduate','Emily Miller',NULL,NULL,50,NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degreePrograms`
--

DROP TABLE IF EXISTS `degreePrograms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degreePrograms` (
  `programID` varchar(60) NOT NULL,
  `programName` varchar(60) NOT NULL,
  `programCourses` json DEFAULT NULL,
  `programRequirements` json DEFAULT NULL,
  PRIMARY KEY (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degreePrograms`
--

LOCK TABLES `degreePrograms` WRITE;
/*!40000 ALTER TABLE `degreePrograms` DISABLE KEYS */;
INSERT INTO `degreePrograms` VALUES ('CISS','Bachelor of Computer Information Systems','[\"160\", \"201\", \"331\", \"451\", \"402\", \"170\"]',NULL),('CPCS','Bachelor of Computer Science','[\"305\", \"307\", \"308\", \"309\", \"310\", \"102\", \"202\", \"250\", \"321\", \"420\"]',NULL),('CPEN','Bachelor of Computer Engineering','[\"101\", \"598\", \"516\", \"210\", \"427\", \"320\", \"621\", \"645\", \"667\"]',NULL),('Math','Bachelor of Mathematics','[\"208\", \"497\", \"511\", \"5112\", \"515\", \"521\", \"527\", \"636\", \"689\", \"730\"]',NULL);
/*!40000 ALTER TABLE `degreePrograms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree_program_courses`
--

DROP TABLE IF EXISTS `degree_program_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree_program_courses` (
  `programID` varchar(60) NOT NULL,
  `courseID` varchar(7) NOT NULL,
  PRIMARY KEY (`programID`,`courseID`),
  KEY `degree_program_courses_ibfk_2` (`courseID`),
  CONSTRAINT `degree_program_courses_ibfk_1` FOREIGN KEY (`programID`) REFERENCES `degreePrograms` (`programID`),
  CONSTRAINT `degree_program_courses_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree_program_courses`
--

LOCK TABLES `degree_program_courses` WRITE;
/*!40000 ALTER TABLE `degree_program_courses` DISABLE KEYS */;
INSERT INTO `degree_program_courses` VALUES ('CPEN','101'),('CPCS','102'),('CISS','160'),('CISS','170'),('CISS','201'),('CPCS','202'),('Math','208'),('CPEN','210'),('CPCS','250'),('CPCS','303'),('CPCS','305'),('CPCS','307'),('CPCS','308'),('CPCS','309'),('CPCS','310'),('CPEN','320'),('CPCS','321'),('CISS','331'),('CISS','402'),('CPCS','420'),('CPEN','427'),('CISS','451'),('Math','497'),('Math','511'),('Math','5112'),('Math','515'),('CPEN','516'),('Math','521'),('Math','527'),('CPEN','598'),('CPEN','621'),('Math','636'),('CPEN','645'),('CPEN','667'),('Math','689'),('Math','730');
/*!40000 ALTER TABLE `degree_program_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `userID` int NOT NULL,
  `facultyName` varchar(30) NOT NULL,
  `facultyTitle` varchar(60) DEFAULT NULL,
  `facultyDepartment` varchar(60) DEFAULT NULL,
  `facultyCoursesTeaching` json DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (4,'James Davis','Professor','Computer Science','[\"201\", \"527\", \"208\"]'),(5,'Sarah Johnson','Associate Professor','Data Science','[\"309\", \"515\"]'),(6,'Mark Miller','Professor','Information Systems','[\"301\", \"302\"]'),(43,'Tim Allen','Professor','Computer Engineering','[\"210\"]'),(44,'Sun Kim','Associate Professor','Computer Science','[\"420\"]'),(45,'Steve Martin','Assistant Professor','Information Technology','[\"645\"]'),(46,'Shubh Patel','Senior Lecturer','Cybersecurity','[\"667\"]'),(47,'Sarah Jones','Lecturer','Software Engineering','[\"515\", \"516\"]'),(48,'Sarah Johnson','Research Professor','Data Science','[\"309\"]'),(49,'Rachel Thompson','Visiting Professor','Human-Computer Interaction','[\"451\"]'),(50,'Paul Newman','Associate Professor','Networking','[\"621\"]'),(51,'Michael Brown','Lecturer','Robotics','[\"208\"]'),(52,'Matthew Wilson','Assistant Professor','Artificial Intelligence','[\"170\"]'),(53,'Mark Miller','Professor','Computer Graphics','[\"310\"]'),(54,'Jose Garcia','Senior Lecturer','Theoretical Computer Science','[\"427\"]'),(55,'Johnson Robertson','Associate Professor','Algorithms','[\"250\"]'),(56,'John Smith','Assistant Professor','Discrete Mathematics','[\"160\"]'),(57,'John Doe','Instructor','Programming Languages','[\"101\", \"308\", \"511\"]'),(58,'Jessica Lee','Professor','Systems Engineering','[\"331\"]'),(59,'Jennifer Brown','Senior Lecturer','Databases','[\"402\"]'),(60,'Jeff Carter','Assistant Professor','Web Development','[\"102\"]'),(61,'Jane Smith','Professor','Operating Systems','[\"305\", \"5112\", \"598\"]'),(62,'James Wilson','Associate Professor','Cloud Computing','[\"320\"]'),(63,'James Davis','Senior Lecturer','Machine Learning','[\"303\", \"521\"]'),(64,'Emily Miller','Assistant Professor','Quantum Computing','[\"730\"]'),(65,'David Johnson','Lecturer','Virtual Reality','[\"636\"]'),(66,'Daniel Hughes','Senior Lecturer','Computer Architecture','[\"202\"]'),(67,'Candace Owens','Associate Professor','Computer Networks','[\"321\"]'),(68,'Ana Williams','Professor','Software Testing','[\"689\"]'),(69,'Amy White','Assistant Professor','Mobile Computing','[\"307\", \"497\"]'),(128,'Placeholder','Placeholder','Placeholder',NULL),(129,'Serena','Professor','Computer Science',NULL),(130,'Placeholder','Placeholder','Placeholder',NULL),(131,'Placeholder','Placeholder','Placeholder',NULL),(132,'yo mama','professor','math',NULL),(133,'Jane James','Professor','Computer Science',NULL),(134,'Placeholder','Placeholder','Placeholder',NULL),(135,'Placeholder','Placeholder','Placeholder',NULL);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_courses`
--

DROP TABLE IF EXISTS `faculty_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_courses` (
  `userID` int NOT NULL,
  `courseID` varchar(7) NOT NULL,
  PRIMARY KEY (`userID`,`courseID`),
  KEY `faculty_courses_ibfk_2` (`courseID`),
  CONSTRAINT `faculty_courses_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `faculty` (`userID`),
  CONSTRAINT `faculty_courses_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_courses`
--

LOCK TABLES `faculty_courses` WRITE;
/*!40000 ALTER TABLE `faculty_courses` DISABLE KEYS */;
INSERT INTO `faculty_courses` VALUES (57,'101'),(60,'102'),(56,'160'),(52,'170'),(4,'201'),(66,'202'),(4,'208'),(51,'208'),(43,'210'),(55,'250'),(63,'303'),(61,'305'),(69,'307'),(57,'308'),(48,'309'),(53,'310'),(62,'320'),(67,'321'),(58,'331'),(59,'402'),(44,'420'),(54,'427'),(49,'451'),(69,'497'),(57,'511'),(61,'5112'),(5,'515'),(47,'515'),(5,'516'),(47,'516'),(63,'521'),(4,'527'),(61,'598'),(50,'621'),(65,'636'),(45,'645'),(46,'667'),(68,'689'),(64,'730');
/*!40000 ALTER TABLE `faculty_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `courseSubjectID` int NOT NULL,
  `courseSubjectName` varchar(30) NOT NULL,
  `courseID` varchar(7) DEFAULT NULL,
  `courseName` varchar(60) DEFAULT NULL,
  `courseCredits` float(3,2) DEFAULT NULL,
  `courseCareer` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`courseSubjectID`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_courses` (
  `userID` int NOT NULL,
  `courseID` varchar(7) NOT NULL,
  PRIMARY KEY (`userID`,`courseID`),
  KEY `student_courses_ibfk_2` (`courseID`),
  CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `students` (`userID`),
  CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `userID` int NOT NULL,
  `studentName` varchar(30) NOT NULL,
  `studentProgram` varchar(60) DEFAULT NULL,
  `coursesPassed` json DEFAULT NULL,
  `coursesTaking` json DEFAULT NULL,
  `coursesWaiting` json DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (34,'Placeholder','Placeholder',NULL,'[\"160\", \"201\"]','[\"202\"]'),(35,'Placeholder','Placeholder',NULL,NULL,NULL),(36,'Jake Darida','asd',NULL,NULL,NULL),(37,'Cody','Computer Science',NULL,NULL,NULL),(38,'Z','Z','[\"101\"]','[\"160\", \"102\", \"170\"]',NULL),(39,'Joe','Computer Science',NULL,'[\"515\", \"511\", \"521\"]',NULL),(40,'Jon Doe','Computer Science',NULL,NULL,NULL),(41,'test','CISS',NULL,'[\"621\"]',NULL),(42,'Jake','CISS',NULL,NULL,NULL),(76,'Joan Alexi','CISS',NULL,NULL,NULL),(77,'Alex Jones','CISS',NULL,NULL,NULL),(78,'Michael Smith','CPEN',NULL,NULL,NULL),(79,'Sophia Johnson','CPSC',NULL,NULL,NULL),(80,'Emily Davis','MATH',NULL,NULL,NULL),(81,'Madison Brown','CISS',NULL,NULL,NULL),(82,'James Wilson','CPEN',NULL,NULL,NULL),(83,'Olivia Martin','CPSC',NULL,NULL,NULL),(84,'Liam Taylor','MATH',NULL,NULL,NULL),(85,'Noah Lee','CISS',NULL,NULL,NULL),(86,'Emma White','CPEN',NULL,NULL,NULL),(87,'Ava Thomas','CPSC',NULL,NULL,NULL),(88,'Oliver Moore','MATH',NULL,NULL,NULL),(89,'Sophie Walker','CISS',NULL,NULL,NULL),(90,'Lucas King','CPEN',NULL,NULL,NULL),(91,'Charlotte Scott','CPSC',NULL,NULL,NULL),(92,'Logan Hill','MATH',NULL,NULL,NULL),(93,'Mia Robinson','CISS',NULL,NULL,NULL),(94,'Aiden Wright','CPEN',NULL,NULL,NULL),(95,'Chloe Adams','CPSC',NULL,NULL,NULL),(96,'Ethan Clark','MATH',NULL,NULL,NULL),(97,'Isabella Green','CISS',NULL,NULL,NULL),(98,'Mason Harris','CPEN',NULL,NULL,NULL),(99,'Amelia Jackson','CPSC',NULL,NULL,NULL),(100,'Owen Lewis','MATH',NULL,NULL,NULL),(101,'Lily Hill','CISS',NULL,NULL,NULL),(102,'Wyatt Jones','CPEN',NULL,NULL,NULL),(103,'Zoe Smith','CPSC',NULL,NULL,NULL),(104,'Henry Taylor','MATH',NULL,NULL,NULL),(105,'Harper Walker','CISS',NULL,NULL,NULL),(106,'Jacob White','CPEN',NULL,NULL,NULL),(107,'Aria Wilson','CPSC',NULL,NULL,NULL),(108,'Benjamin Moore','MATH',NULL,NULL,NULL),(109,'Natalie Scott','CISS',NULL,NULL,NULL),(110,'Sebastian Clark','CPEN',NULL,NULL,NULL),(111,'Grace Martin','CPSC',NULL,NULL,NULL),(112,'Levi Adams','MATH',NULL,NULL,NULL),(113,'Ella Robinson','CISS',NULL,NULL,NULL),(114,'Samuel King','CPEN',NULL,NULL,NULL),(115,'Layla Hill','CPSC',NULL,NULL,NULL),(116,'David Lewis','MATH',NULL,NULL,NULL),(117,'Camila Green','CISS',NULL,NULL,NULL),(118,'Andrew Wright','CPEN',NULL,NULL,NULL),(119,'Lucas Harrison','CPSC',NULL,NULL,NULL),(120,'Isabella Jackson','MATH',NULL,'[]',NULL),(121,'Carter King','CISS',NULL,NULL,NULL),(122,'Kaylee Walker','CPEN',NULL,'[\"101\", \"102\", \"160\", \"170\", \"202\"]',NULL),(123,'Gabriel Adams','CPSC',NULL,'[\"102\", \"101\"]','[\"202\"]'),(124,'Sofia Green','MATH',NULL,NULL,NULL),(125,'Joseph Lewis','CISS',NULL,'[\"201\"]',NULL),(126,'Samantha White','CPEN',NULL,'[]',NULL),(128,'Brian James','Computer Science',NULL,'[]',NULL),(129,'Placeholder','Placeholder',NULL,'[\"202\"]',NULL),(130,'P Test','CISS',NULL,'[\"202\"]',NULL),(131,'Jake Darida','Math',NULL,NULL,NULL),(132,'Placeholder','Placeholder',NULL,NULL,NULL),(133,'Placeholder','Placeholder',NULL,NULL,NULL),(134,'New','CISS',NULL,NULL,NULL),(135,'Cody Bauer','Computer Science',NULL,'[\"210\"]','[\"202\"]');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `userType` enum('Student','Faculty') NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asdasda','12321@gmail.com','Student'),(2,'asdasda','12321@gmail.com','Student'),(3,'asdasda','12321@gmail.com','Student'),(4,'asdasda','12321@gmail.com','Student'),(5,'pista','123@gmail.com','Student'),(6,'pista','123@gmail.com','Student'),(7,'pista','123@gmail.com','Student'),(8,'opsita','123@gmail.com','Student'),(9,'opsita','123@gmail.com','Student'),(10,'psota','jdarida9@gmail.com','Student'),(11,'psota','jdarida9@gmail.com','Student'),(12,'psota','jdarida9@gmail.com','Student'),(24,'asdasdasdasd','jld224@uakron.edu','Faculty'),(25,'asdasdasdasd','jld224@uakron.edu','Faculty'),(26,'asdasdasdasd','jld224@uakron.edu','Faculty'),(27,'asdasdasdasd','jld224@uakron.edu','Faculty'),(28,'asdasdasdasdasdasd','asdasdasd','Student'),(29,'asdasdasdasdasdasd','asdasdasd','Student'),(30,'asdasdasdas','asdasdasd','Student'),(31,'asdasdasdas','asdasdasd','Student'),(32,'$2b$10$doe6/wk2INj1AqOInPEK3eCEzXSGDt.o9/h5JJqUO7398L3i009J.','jld224@uakron.edu','Student'),(33,'$2b$10$a9CnmW32byMXqbT7hlWzhOF/Ix2kVtO3v67FlzTBGJI9f5hYlP2ey','jld224@uakron.edu','Student'),(34,'$2b$10$9HPECI71jXbIvAMq8Qa9buwDD3M2P4Ss7YbYAt6kGiZrKfwUi8k3K','jbdarida@sbcglobal.net','Faculty'),(35,'$2b$10$FaUmyPHImmpBLj85QGEDPuQNvcIdgYXtNyn6s3ooVtHQbSg72VlcC','jld224@uakron.edu','Faculty'),(36,'$2b$10$rvHi4iNx9MAOZ8HkkoO1a.cEay99TQxeR5iqH7vUinZ5JRR/iQuiu','jld224@uakron.edu','Student'),(37,'$2b$10$cZKw.zO/3jc5/.ulMpoKt.tTTw7Y1W5czUxD/5YB7/zgRc6KdB6zu','crb183@uakron.edu','Student'),(38,'$2b$10$eh7Us77k55KzRLILhKDvleIi49sNG7E/PDEBz.UoXARR7eAiOWY66','z@gmail.com','Student'),(39,'$2b$10$BvqEYISUDGUdS3y3vzdOKeF1lqR.NQDpJq/Y4vIzAQGUxUUCW9DyK','22@gmail.com','Student'),(40,'$2b$10$.YHOkygcb7ZlBKpgww32h.qaeY/VQ5b4YHgdgBAzBx.3QKUeUJZJW','123@gmail.com','Student'),(41,'$2b$10$I82aAOlXHuGC.dSOzdLF5u1DfugQ9k60ncpJG6f2OK5a3pb3ip29O','test@gmail.com','Student'),(42,'$2b$10$5Vb6NTyZuHQ3qGbyZFJgUuAJrIoKl2L7wVQCAsBCq55oOT7poxpnq','test2@gmail.com','Student'),(43,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','tim.allen@university.edu','Faculty'),(44,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','sun.kim@university.edu','Faculty'),(45,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','steve.martin@university.edu','Faculty'),(46,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','shubh.patel@university.edu','Faculty'),(47,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','sarah.jones1@university.edu','Faculty'),(48,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','sarah.jones2@university.edu','Faculty'),(49,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','sarah.johnson@university.edu','Faculty'),(50,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','rachel.thompson@university.edu','Faculty'),(51,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','paul.newman@university.edu','Faculty'),(52,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','micheal.brown@university.edu','Faculty'),(53,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','matthew.wilson@university.edu','Faculty'),(54,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','mark.miller@university.edu','Faculty'),(55,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jose.garcia@university.edu','Faculty'),(56,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','johnson.robertson@university.edu','Faculty'),(57,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','john.smith@university.edu','Faculty'),(58,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','john.doe1@university.edu','Faculty'),(59,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','john.doe2@university.edu','Faculty'),(60,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','john.doe3@university.edu','Faculty'),(61,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jessica.lee@university.edu','Faculty'),(62,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jennifer.brown@university.edu','Faculty'),(63,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jeff.carter@university.edu','Faculty'),(64,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jane.smith1@university.edu','Faculty'),(65,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','jane.smith2@university.edu','Faculty'),(66,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','james.wilson@university.edu','Faculty'),(67,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','james.davis1@university.edu','Faculty'),(68,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','james.davis2@university.edu','Faculty'),(69,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','emily.miller@university.edu','Faculty'),(70,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','david.johnson@university.edu','Faculty'),(71,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','daniel.hughes@university.edu','Faculty'),(72,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','candace.owens@university.edu','Faculty'),(73,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','ana.williams@university.edu','Faculty'),(74,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','amy.white1@university.edu','Faculty'),(75,'2223ef9c69b3100d12e4fdc480202e940c0a29b7ea3cc94426f744369f4e','amy.white2@university.edu','Faculty'),(76,'30a348c4982324b7ed58a08fb41e7491054d5083ee2b8e610aa349f40ef0','joan.alexi76@university.edu','Student'),(77,'23934989482e0607171e98d577556e6ea2340a6fb5f2d05f0b4eb60cba1c','alex.jones77@university.edu','Student'),(78,'df92295d561c0b76d905695ff32f3a0c92cc0c0d6671ce446196403d85e0','michael.smith78@university.edu','Student'),(79,'480e744d52fa9f1b73e172e1c987199c87496ed679120198775bdcc13821','sophia.johnson79@university.edu','Student'),(80,'e81951c42dd8fe646b5ad5e84d3ce77d5085df916a1b8ec0ef971483930f','emily.davis80@university.edu','Student'),(81,'d2a2b732bd82cde24f1cf542e40138890b74f6bcae33e0e2f0d16859d805','madison.brown81@university.edu','Student'),(82,'5a6949b1086bd866542770afe9eb161e98034b9a84aec0e3460f1db3294d','james.wilson82@university.edu','Student'),(83,'c35a56a243df3b58606c72f33706ee6ee0280146c741f96f6132cbcc6902','olivia.martin83@university.edu','Student'),(84,'c099debfc2f09252ddcd574280c1819eed1da649a583c78e3fcda8b6601c','liam.taylor84@university.edu','Student'),(85,'1795b313a882e350d1ec8daa46b3ff8cbefc7d54f0d2e4e79e8b9a298fa5','noah.lee85@university.edu','Student'),(86,'6e80b5ddb3628ab2e27e13c93e08b392e1df0133e4d8b446377bebe80b3a','emma.white86@university.edu','Student'),(87,'a30bb8fb6d1c25573ac73c124acb7d210cb6511b14fd3394957e25034426','ava.thomas87@university.edu','Student'),(88,'95a41768f0ac5cca9fa10c00fdd2318a1ba360e3300e4901c7bef9b1b734','oliver.moore88@university.edu','Student'),(89,'9cee3e1cf89f056197763f2bac3f1ac8757d2c32566f01669191dc717111','sophie.walker89@university.edu','Student'),(90,'8b5b075e4c59f5a533d7287f911d01b35e07dcbe21a10d9293a4604d5af9','lucas.king90@university.edu','Student'),(91,'478a4d4abeb8ad43aa42bb0fe7e213bb7d750613b1bf504f40d44feae623','charlotte.scott91@university.edu','Student'),(92,'3eb3d3b75bfd678781e31252a7baa7002b7fe1f631c5c4c8f697a6d1c3c5','logan.hill92@university.edu','Student'),(93,'e0e8e4fa5b13a7a45478286a546ce92c0f390644e9f95941b9979597d01e','mia.robinson93@university.edu','Student'),(94,'52b32ddf9e5a69c884c1bf918aaea8bbefec8c40f5b7cda4ab43400be560','aiden.wright94@university.edu','Student'),(95,'5216132fae0ae0e56ae653d6e04018b46f81864c1a4fccfd0c867d29a171','chloe.adams95@university.edu','Student'),(96,'64d61ce1366a285db982704be07ce487786f1a2921692aefe40b819039d0','ethan.clark96@university.edu','Student'),(97,'b018965b76e4a57c5b875b2ab6fb7173e77cf9fe33649d2d5eaa86267703','isabella.green97@university.edu','Student'),(98,'4c46196babf903a57d76e4817e12a0e5421b028a1ae8a7002d0210939ec0','mason.harris98@university.edu','Student'),(99,'f375fcfaa3755e2ee9fcbb9a89f8d67dbd3432a5c7d7a21259c0b3e93bc7','amelia.jackson99@university.edu','Student'),(100,'85d584b5f195a2b9252154c2e2e618457b86667331ee93ca3ae38d21fecf','owen.lewis100@university.edu','Student'),(101,'4a39c62026a45e4ec3cd573aa129c80cb30ac18b42a7e8fa0ff84c48857d','lily.hill101@university.edu','Student'),(102,'3dfee9c052c2a10760a272061673c14b218225fa946669bfc04f3bced7ae','wyatt.jones102@university.edu','Student'),(103,'deb9a898f5cece4fd132f5e5e5ae69a8c7c69c893679f3e505c232e39a97','zoe.smith103@university.edu','Student'),(104,'08573d35d91bfb3465cbabffec0cce5e0a11ba3553857de48e11642e2a9a','henry.taylor104@university.edu','Student'),(105,'1ba59ab02fa503db76918cec02902baca2c4b0bb252c670e294397134a37','harper.walker105@university.edu','Student'),(106,'1a5f6addd2fddabf231cb8aca30b1b5d95d2ae154d2146ed84f4ad73538c','jacob.white106@university.edu','Student'),(107,'49532ab8448bde64577f777125a101f5d5a5000fd2edc965b9b3b93c05b8','aria.wilson107@university.edu','Student'),(108,'bced2aeaa2d1f06333e8e3daaac1a530d8cc52f4c9ab7522aa958b40c182','benjamin.moore108@university.edu','Student'),(109,'d2b3b9c44b824bbac3959d4900949adf5117434354b935761ad65937c08d','natalie.scott109@university.edu','Student'),(110,'80135473deeeb8e3440f7439be44830c0f273d9c96d40002d76807e162dc','sebastian.clark110@university.edu','Student'),(111,'86fd182dca4365e6e0c30ff74c00256a76993a78809cee8466fffbc5780f','grace.martin111@university.edu','Student'),(112,'bb2ec7b10be46f057b46b60b8d6eb0cc9c179285d7ff9e3e7c4bf0761904','levi.adams112@university.edu','Student'),(113,'4e9010c7e08e5f1c2fba4f85e6f10c4d139aa529cdc6afcd5c573c902fd1','ella.robinson113@university.edu','Student'),(114,'18b9b81e362390a798bd6327ffa7c0082dff112d0c64a5b131ca058d473e','samuel.king114@university.edu','Student'),(115,'3f91e2304978166beca0440b0bd7c0c1f02744aa5f0d9d9cc0250bf60a83','layla.hill115@university.edu','Student'),(116,'53e565e5df41ac3457acf02b0effc856d3d99017c66f2bd38fa428578b35','david.lewis116@university.edu','Student'),(117,'cbe4da2165f2b86585fbda5ce053f10309669ec2a214a9f8d842fb6d3091','camila.green117@university.edu','Student'),(118,'d21a1b773a4d535cc339ee6cae2e0e7ea799180ac5b7cd963c7a404fc945','andrew.wright118@university.edu','Student'),(119,'7b2e68c85b3c655dc56785e24e9a51d6feec34c2fa2b00490ceda6b38dab','lucas.harrison119@university.edu','Student'),(120,'7365e2ade49a650b934d852334706ed83eaf60cd32ab8cb96a0fef0e483e','isabella.jackson120@university.edu','Student'),(121,'5c9fbc86b52ec8478edb52d968e110a25d4f018d71dee5bbbaa27a7b6fb0','carter.king121@university.edu','Student'),(122,'d5639ffeea901c0b285320702abebf636a20661d504bc95e7f20412bbdbb','kaylee.walker122@university.edu','Student'),(123,'7bd807caa4d7645a1d98ceea230241131b3a5fab526149bf8ac0346126e4','gabriel.adams123@university.edu','Student'),(124,'877ffdea76a224e5474dfd8f594d58164391a26042018002e9e8f263c86a','sofia.green124@university.edu','Student'),(125,'37f14818cc7dd06f0f39c0234a09a8811b8bc738de2771a9e4e5518328d6','joseph.lewis125@university.edu','Student'),(126,'a8a63405f820350419996745136150ec00f885275e4c7643bb949bb38dba','samantha.white126@university.edu','Student'),(127,'a8a63405f820350419996745136150ec00f885275e4c7643bb949bb38dba','william.harris126@university.edu','Student'),(128,'$2b$10$abec0uNsI6L1wjWl4w3HpOJ3k81/dOj3khnC2WXrif/2lxQviTUYe','brian@gmail.com','Student'),(129,'$2b$10$Rp26MGT6IV1BV1IYZw3fc.nY0xLFUVWcH5qEpEkXcE6lwU6Icyrt.','sern@gmail.com','Faculty'),(130,'$2b$10$2sFYCAfXExx6nay3rmEqi.MaJj03YGZ/MqVnpLxF8gTYw8UlHyi1u','PTest@gmail.com','Student'),(131,'$2b$10$MYcXsD012.RhVGLTHJRkoed2pQ55nmHyKaZx5nbNt9srFQeFGrWKq','tester2@email.com','Student'),(132,'$2b$10$Z5kHp8aVivmwFJsi4pEBDujcOXV11GZzloBi7AiJk.qYlGD9plaZG','tester@gmail.com','Faculty'),(133,'$2b$10$pwXgCe9HJZ5Deal9odVmzOtSvcgSi4EQhXsJJ8crBpQxsZLhSEEmK','jane@gmail.com','Faculty'),(134,'$2b$10$AWfccmUfUsDoxByae.PvGuJheC3nGKmUtEmxMYtzXr1Jg4.YneQ/C','newtest@gmail.com','Student'),(135,'$2b$10$A34sbZjA3KHJojSqVsHuze5e7t6ve3QLKliBZt72kvvy/aM4qlsxK','codyrb24@gmail.com','Student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitlist`
--

DROP TABLE IF EXISTS `waitlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waitlist` (
  `waitlistID` int NOT NULL,
  `courseID` varchar(7) NOT NULL,
  `waitlistedStudents` json DEFAULT NULL,
  PRIMARY KEY (`waitlistID`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `waitlist_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitlist`
--

LOCK TABLES `waitlist` WRITE;
/*!40000 ALTER TABLE `waitlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `waitlist` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 16:07:30

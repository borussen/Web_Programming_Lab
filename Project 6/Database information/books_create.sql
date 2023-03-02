CREATE TABLE `books` (
  `idbooks` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `seller` varchar(45) NOT NULL,
  `buyer` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idbooks`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='In includes all books information in the market';


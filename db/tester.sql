# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost
# Database: tester
# Generation Time: 2020-02-04 17:30:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1024) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `postid` (`postid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` (`id`, `message`, `userid`, `postid`)
VALUES
	(5,'Great Post <3',5,8),
	(6,'good!',7,5),
	(8,'niiice...',10,5),
	(9,'GOOD',11,5),
	(10,'nice',5,16),
	(11,'very good',5,15),
	(12,'nice',5,15),
	(13,'awesome',11,8),
	(14,'ok...',11,8),
	(15,'well...',11,8),
	(16,'...',11,8),
	(17,'ok',5,16),
	(18,'new',5,16),
	(19,'very good',5,14),
	(20,'ok',5,14),
	(21,'Thanks',7,14),
	(22,'nice job!',7,15),
	(23,'check description!!!',7,5),
	(24,'asdasdasdasdas',11,10),
	(25,'ertert',11,10),
	(26,'prueba',10,16);

/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;

INSERT INTO `posts` (`id`, `userid`, `title`, `description`, `content`)
VALUES
	(5,5,'test edited','description edited','<p><strong>content edited</strong></p>\n'),
	(6,7,'tester','test description','edw3rn4r4nfeniefs'),
	(8,7,'title test','description test','<h2><strong>1212w2</strong><span style=\"color: rgb(97,189,109);\">dsddsdsdds</span></h2>\n'),
	(9,10,'test','test3','<h2><strong>3e3d3d3d3d3d</strong><span style=\"color: rgb(97,189,109);\">feffefefdfdfdffd<ins>dfdf</ins></span></h2>\n'),
	(10,10,'123','its 123','<p><span style=\"color: rgb(147,101,184);\">3222222<sub>222222</sub></span></p>\n<ol>\n<li><strong>1</strong>22222222<span style=\"font-family: Impact;\">2222</span></li>\n</ol>\n<ul>\n<li><span style=\"color: rgb(97,189,109);\">22222222<sup>222222</sup></span></li>\n</ul>\n'),
	(11,7,'abaaaaaaaaaaaaa','aaaaaaaaaaaaaaaab','ab'),
	(12,5,'test title','test description','<h1><span style=\"font-family: Georgia;\"><strong>dgfgfgfgfdf</strong></span></h1>\n<p><span style=\"font-family: Georgia;\"><strong><ins>fdfffdfdffdf</ins></strong></span></p>\n<p><span style=\"color: rgb(247,218,100);\">gffgfgfgfggg</span></p>\n<p></p>\n<img src=\"https://d2ph5fj80uercy.cloudfront.net/04/cat461.jpg\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n'),
	(13,5,'Check Home','Checking homelist','<p><strong>yep!</strong></p>\n'),
	(14,7,'New Post','top post','<p><span style=\"color: rgb(26,188,156);\"><strong>fingers crossed!</strong></span></p>\n<p></p>\n<img src=\"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crossed-fingers.png\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p><a href=\"https://www.youtube.com/watch?v=DHvZLI7Db8E\" target=\"_self\">https://www.youtube.com/watch?v=DHvZLI7Db8E</a></p>\n'),
	(15,5,'newer post','newer description','<h1><span style=\"color: rgb(84,172,210);\"><strong>sdfdssdfdfsf</strong></span></h1>\n<p><span style=\"color: rgb(84,172,210);\"><code><strong>sdddsddsdsdsddsddsd</strong></code></span></p>\n'),
	(16,11,'sdfsdf','sdfsdfds','<p><strong>asdasdfasdf 123</strong></p>\n');

/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(5,'koko','$2a$10$lDEe1yn7LEH3DrFghBsJguy5agBzRSzGz/edW75ChKkU3bUlfP7KG'),
	(7,'doriano','$2a$10$0cuY9elE7KlyPPR1bbfwaetmxt3zYUL.7g3iu9jf/QyCU82qdRHSO'),
	(10,'cheezzy2','$2a$10$JN11E2PYxhzC/ufB8z7kwOv4Ku5JOsoIMrtwrHkafx8.S0L1pmbPS'),
	(11,'chris','$2a$10$XjZNvAD5XQDJ47DcCCCKje6IJjHMuc41pXFlkcVam6ZYziS4lwl6C');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

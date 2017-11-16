/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-11-16 15:16:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` bigint(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(26) CHARACTER SET utf8 DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `headimg` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `unread` tinyint(1) DEFAULT '0',
  `tab` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid` (`userid`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1172 DEFAULT CHARSET=latin1 COMMENT='\r\n用户表\r\nuserid -> 用户id\r\n\r\nusername -> 用户姓名\r\n\r\nname -> 用户名\r\n\r\npassword -> 密码\r\n\r\ntel -> 用户手机号\r\n\r\naddress ->  地址\r\n\r\nemail -> 用户邮箱\r\n\r\nheadimg -> 头像\r\n\r\nsex -> 性别\r\n\r\nunread -> 未读\r\n\r\ntab -> 帖子指向\r\n\r\n\r\n\r\n ';

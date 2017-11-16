/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-11-16 15:17:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `pid` bigint(20) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `num` int(11) NOT NULL DEFAULT '0',
  `ctime` bigint(20) DEFAULT NULL,
  `etime` bigint(20) DEFAULT NULL,
  `creater` varchar(16) CHARACTER SET utf8 NOT NULL,
  `ecreater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `classify` int(1) DEFAULT NULL,
  `del` tinyint(1) NOT NULL DEFAULT '0',
  KEY `index` (`etime`) USING BTREE,
  KEY `pid` (`pid`) USING BTREE,
  KEY `content` (`title`,`content`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子列表\r\n\r\npid -> 帖子ID\r\n\r\ntitle -> 帖子名字\r\n\r\ncontent ->一楼内容\r\n\r\nnum -> 回帖数量\r\n\r\nctime -> 创建帖子的时间\r\n\r\netime -> 最后回复时间\r\n\r\ncreater -> 创建人\r\n\r\necreater -> 最后回复人\r\ndel -> 帖子是否删除\r\n';

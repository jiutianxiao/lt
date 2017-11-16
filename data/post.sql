/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : luntan

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-11-16 15:16:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `pid` bigint(11) NOT NULL,
  `fid` int(11) NOT NULL DEFAULT '1',
  `cid` int(11) NOT NULL DEFAULT '1',
  `content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `creater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ecreater` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ctime` bigint(11) DEFAULT NULL,
  `del` tinyint(1) DEFAULT '0',
  KEY `post` (`pid`,`fid`,`cid`),
  KEY `post1` (`pid`,`fid`) USING BTREE,
  KEY `post2` (`pid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n帖子表\r\n\r\npid ->帖子ID 用于标识帖子\r\n\r\nfid ->楼层ID 用于标记楼层\r\n\r\ncid -> 二级楼层ID 用于标记二级楼层位置\r\n\r\ncontent -> 回帖内容\r\n\r\nimg -> 帖子内容图片\r\n\r\ncreater -> 回帖人\r\n\r\necreater -> 被回帖人\r\n\r\nctime -> 回帖时间\r\n\r\ndel -> 是否删除\r\n\r\n';

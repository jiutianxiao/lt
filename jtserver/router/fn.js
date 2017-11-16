/**
 * Created by dianying-h5 on 2017/11/1.
 */
const MySql = require("mysql2");//mysql
const mime = require("mime");//文件mime类型
const multer = require("koa-multer");//上传文件模块

//数据库配置
const Connection = MySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'luntan',
    port: 3306,
    multipleStatements: true
});
//上传文件配置
const storage = multer.diskStorage({
    //文件路径
    destination(req, file, cb){
        cb(null, "./updata");
    },
    filename(req, file, cb){
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
});
let upload = multer({storage});

let {parameter, FnSession, SQLDataForm, readPathFile} = require("./uitle");
//    接收数据 ，登录状态，mysql数据格式化

let Con = (Connection, sql) => {
    return new Promise((resolve, reject) => {
        Connection.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(SQLDataForm(results), fields);
        })
    })
};
//注册
let register = async (ctx) => {
    // let {username, name, password, tel, address, email, headimg, sex} = await parameter(ctx);
    let {username, password, tpw} = await parameter(ctx);
    console.log(username, password, tpw);
    let data = {};
    // let ary = {username, name, password, tel, address, email, headimg, sex};
    if (password !== tpw) {
        ctx.body = {
            code: "2004",
            msg: `密码不一致`
        };
        return
    }
    let ary = {username, password};
    for (let key in ary) {
        if (typeof ary[key] === "undefined") {
            ctx.body = {
                code: "2003",
                msg: `${key}不能为空`
            };
            return
        }
    }
    /*    let [a, b, c] = await Promise.all([
     Con(Connection, `SELECT * FROM user WHERE username='${username}'`),
     Con(Connection, `SELECT * FROM user WHERE tel=${tel}`),
     Con(Connection, `SELECT * FROM user WHERE email='${email}'`),
     ]);
     data = a.length ? {code: 3003, msg: "用户名已被注册"} : b.length ? {code: 3004, msg: "手机号已被注册"} : c.length ? {
     code: 3005,
     msg: "邮箱已被注册"
     } : "";*/
    let a = await Con(Connection, `SELECT * FROM user WHERE username='${username}'`);
    data = a.length ? {code: 3003, msg: "用户名已被注册"} : "";
    try {
        if (data === "") {
            await Con(Connection, `CREATE TABLE ${username}(
            creater varchar(16),
            pid BIGINT,
            fid int not null default 1,
            cid int not null default 1,
            ctime bigint,
            content varchar(255), 
            del int(1) not null DEFAULT 0,
            unread int(1) not null DEFAULT 0,reply int(1) not null DEFAULT 0,
            PRIMARY KEY(ctime),
            INDEx ${username}(ctime DESC)
            );
            INSERT INTO user (username,password,tab) VALUES ('${username}','${password}','${username}')`);
            let a = await Con(Connection, `select * from user WHERE username='${username}'&&password='${password}'`);
            await FnSession(ctx, a[0]);//登录
            data = {
                code: "0000",
                data: a[0],
                msg: "注册成功"
            };
        }
    } catch (err) {
        data = {
            code: "5001",
            msg: "意外错误"
        };
    }

    ctx.body = data;
};
//登录
let login = async (ctx) => {
    let {userId, passWd} = await parameter(ctx);
    console.log(userId, passWd);
    if (!userId) {
        ctx.body = {
            code: "1002",
            msg: "请输入用户名或者手机号"
        }
    } else if (!passWd) {
        ctx.body = {
            code: "1003",
            msg: "请输入密码"
        }
    } else {
        let data = "";
        if (Number(userId)) {
            data = await Con(Connection, `select * from user WHERE (username='${userId}'||tel='${Number(userId)}||null')&&password='${passWd}'`);
        } else
            data = await Con(Connection, `select * from user WHERE username='${userId}'&&password='${passWd}'`);
        let session = await FnSession(ctx, data[0]);
        if (session)
            ctx.body = {
                code: "0000",
                data: data[0],
                msg: "登录成功"
            };
        else
            ctx.body = {
                code: "1001",
                msg: "账号或者密码不正确"
            }
    }
};
//退出
let signOut = async (ctx) => {
    let state = await FnSession(ctx);
    if (state) {
        ctx.session = {};
        ctx.body = {
            code: "0000",
            msg: "退出成功"
        }
    } else ctx.body = {
        code: "1001",
        msg: "未登录"
    }
};
//帖子列表
let list = async (ctx) => {
    let b = await FnSession(ctx);
    let {type, page, limit, pid, fid} = await parameter(ctx);
    limit = limit ? limit : 10;
    page = page && page > 0 ? page-- : 0;
    limit = limit * (page + 1);
    let data = "";
    if (type === "0")
        data = await Con(Connection, `SELECT * FROM list LIMIT ${page},${limit}`);
    else if (type === "1") {
        type = "post";
        let column = `pid,fid,cid,content,img,creater,ecreater,ctime`;
        if (typeof pid === "undefined") {
            data = {
                code: "2001",
                msg: "帖子ID不能为空"
            }
        } else {
            if (typeof fid === "undefined")
                data = await Con(Connection, `SELECT ${column},count(cid) as total FROM ${type} where pid=${pid}&&del<>1 group by fid LIMIT ${page},${limit}`);
            else
                data = await Con(Connection, `SELECT ${column} FROM ${type} where pid=${pid}&&fid=${fid}&&del<>1 LIMIT ${page},${limit}`);
        }
    }
    ctx.body = {code: "0000", data, msg: "成功"}
};
//发帖
let upPost = async (ctx) => {
    let state = await FnSession(ctx);
    let data = "";
    if (state) {
        let timeStamp = new Date().getTime(),
            me = state.username;
        let {pid, fid, title, content, ctime, img, ecreater, econtent} = await parameter(ctx);
        img = img ? img : "{}";
        ecreater = ecreater ? ecreater : state.username;
        try {

            if (typeof pid !== "undefined") {
                if (typeof fid !== "undefined") {
                    //fid 回复二级楼层
                    let [cid, num] = await Promise.all([Con(Connection, `select max(cid) as max from post where pid=${pid}&&fid=${fid}`), Con(Connection, `SELECT creater, num FROM list WHERE pid=${pid}`)]);
                    await Con(Connection, `INSERT INTO post (pid, fid, cid, content, img, creater, ecreater, ctime) VALUES ('${timeStamp}', '${fid}', '${cid[0]["max"] + 1}', '${content}', '${img}', '${me}', '${ecreater}', '${timeStamp}');update list set num='${num[0]["num"] + 1}',etime='${timeStamp}',ecreater='${ecreater}' where pid=${pid};INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0);${num[0]["creater"] !== me ? `INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0);${ecreater !== num[0]["creater"] && ecreater !== me ? `INSERT INTO ${ecreater} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0)` : ""}` : ""}`)
                }
                else {
                    //没有fid 回复一级楼层
                    let [fid, num] = await Promise.all([Con(Connection,
                        `select max(fid) as max from post where pid=${pid}`
                    ), Con(Connection,
                        `SELECT creater, num FROM list WHERE pid=${pid}`
                    )]);
                    console.log(fid);
                    console.log(
                        `INSERT INTO post (pid, fid, cid, content, img, creater, ecreater, ctime) VALUES ('${timeStamp}', '${fid[0]["max"] + 1}', '1', '${content}', '${img}', '${me}', '${ecreater}', '${timeStamp}');update list set num=${num[0]["num"] + 1},etime=${timeStamp},ecreater=${ecreater} where pid=${pid};INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0);INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0)`
                    );
                    await Con(Connection,
                        `INSERT INTO post (pid, fid, cid, content, img, creater, ecreater, ctime) VALUES ('${timeStamp}', '${fid[0]["max"] + 1}', '1', '${content}', '${img}', '${me}', '${ecreater}', '${timeStamp}');update list set num='${num[0]["num"] + 1}',etime='${timeStamp}',ecreater='${ecreater}' where pid=${pid};INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0);${num[0]["creater"] !== me ? `INSERT INTO ${num[0]["creater"]} (pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0)`
                            : ""}`)
                }

                data = {
                    code: "0000",
                    msg: "发帖成功"
                }
            } else if (typeof title !== "undefined" || typeof content !== "undefined") {
                //没有pid 默认发新贴
                title = title ? title : content;
                content = content ? content : title;
                await Con(Connection,
                    `INSERT INTO post (pid, fid, cid, content, img, creater, ecreater, ctime) VALUES ('${timeStamp}', '1', '1', '${content}', '${img}', '${me}', '${me}', '${timeStamp}');INSERT INTO list (pid, title, content, num, ctime, etime, creater, ecreater, classify)  VALUES ('${timeStamp}', '${title}', '${content}', '0','${timeStamp}', '${timeStamp}', '${me}','${me}', null);INSERT INTO ${me}(pid, fid, cid, creater, content, ctime,unread,reply,del) VALUES ('${timeStamp}', 1, 1, '${me}', '${content}',  '${timeStamp}',0,0,0)`
                );
                data = {
                    code: "0000",
                    msg: "发帖成功"
                }
                /*            await Promise.all([
                 Con(Connection,
                 `INSERT INTO post (pid, fid, cid, content, img, creater, ecreater, ctime) VALUES ('${timeStamp}', '1', '1', '${content}', ${img}, '${me}', '${me}', '${timeStamp}')`
                 ),
                 Con(Connection,
                 `INSERT INTO list (pid, title, content, num, ctime, etime, creater, ecreater, classify)  VALUES ('${timeStamp}', '${title}', '${content}', '0',${timeStamp}, '${timeStamp}', '${me}','${me}', null`
                 ),
                 Con(Connection,
                 `INSERT INTO user_list(pid, fid, cid, creater, content, econtent, ctime) VALUES (${timeStamp}, 1, 1, '${me}', '${content}', 'null', ${timeStamp})`
                 )]);*/

            } else {
                data = {
                    code: "2002",
                    msg: "参数错误"
                }
            }

        } catch (err) {
            data = {
                code: "3001",
                data: err,
                msg: "发帖失败"
            }
        }
    } else {
        data = {
            code: "1001",
            msg: "未登录"
        }
    }
    ctx.body = data
};
//用户资料
let userData = async (ctx) => {
    let state = await FnSession(ctx);
    let data = {};
    if (state) {
        let {userId, username, tel} = await parameter(ctx);
        let userData
        if (typeof userId === "undefined" && typeof username === "undefined" && typeof tel === "undefined")
            userId = state.userid;
        console.log(
            `select * from user where userid='${userId}'||username='${username}'||tel='${Number(username) || null}'`
        );
        userData = await Con(Connection,
            `select * from user where userid='${userId}'||username='${username}'||tel='${Number(username) || null}'`
        );
        data = {
            code: "0000",
            data: userData,
            msg: "成功"
        }
    } else {
        data = {
            code: "1001",
            msg: "未登录"
        }
    }
    ctx.body = data;
};
//用户帖子查询
let userPost = async (ctx) => {
    let state = await FnSession(ctx);
    if (state) {
        let {userId, type, page, limit} = await parameter(ctx);
        let where = type ? type === "0" ?
            `del=1`
            : type === "1" ?
                `unread=1`
                : type === "2" ?
                    `unread=0`
                    : type === "3" ?
                        `reply=0`
                        : type === "4" ?
                            `reply=1`
                            : "" :
            `del<>1||ISNULL(del)`
        ;
        //                       删除                     未读                          已读                         回复                       被回复                          默认非删除
        userId = userId ? userId : state.username;
        console.log(
            `select creater, pid, fid, cid, ctime, content from ${userId} where ${where}`
        );
        let userPost = await Con(Connection,
            `select creater, pid, fid, cid, ctime, content from ${userId} where ${where}`
        );
        ctx.body = {
            code: "0000",
            data: userPost,
            msg: "成功"
        }
    } else {
        ctx.body = {
            code: "1001",
            msg: "未登录"
        }
    }
};
//用户帖子删除
let delPost = async (ctx) => {
    let state = await FnSession(ctx);
    if (state) {
        let {pid, fid, cid} = await parameter(ctx);
        if (!pid) {
            ctx.body = {
                code: "2002",
                msg: "帖子ID不能为空"
            }
        } else {
            cid = cid ? cid : "1";
            fid = fid ? fid : "1";
            let [data, listcreater] = await Promise.all([Con(Connection,
                `select * from list where pid=${pid}&&fid=${fid}&&cid=${cid}`
            ), Con(Connection,
                `select creater from list where pid=${pid}`
            )]);
            let {creater, ecrater} = data[0];
            if (state.username === creater) {
                try {
                    await Con(Connection,
                        `UPDATE post SET del=1 WHERE pid =${pid} &&fid=${fid}&&cid=${cid};
                    UPDATE ${creater} SET del=1 WHERE pid =${pid} &&fid=${fid}&&cid=${cid};
                    UPDATE ${ecrater} SET del=1 WHERE pid =${pid} &&fid=${fid}&&cid=${cid};
                    UPDATE ${listcreater} SET del=1 WHERE pid =${pid} &&fid=${fid}&&cid=${cid};`
                    );
                    ctx.body = {
                        code: "0000",
                        msg: "成功"
                    }
                } catch (e) {
                    ctx.body = {
                        code: "5001",
                        msg: "意外错误"
                    }
                }
            } else {
                ctx.body = {
                    code: "5002",
                    msg: "没有权限删除"
                }
            }
        }
    } else {
        ctx.body = {
            code: "1001",
            msg: "未登录"
        }
    }
};
//上传图片
let upFile = async (ctx) => {
    ctx.body = ctx.req.file
};
//网页以及404
let webPage = async (ctx) => {
    console.log(1);
    let body = {};
    try {
        let path = "." + ctx.path;
        if (path === "./") {
            body = (await readPathFile("./index.html")).toString();
        } else {
            body = await readPathFile(path);
            ctx.res.writeHead(200, mime.getType(ctx.path));
        }
    } catch (e) {
        body = "404";
    }
    ctx.body = body;
};
module.exports = {
    register, login, list, signOut, upPost, userData, delPost, userPost, webPage, upFile, upload,
};
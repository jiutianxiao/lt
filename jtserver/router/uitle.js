/**
 * Created by dianying-h5 on 2017/11/1.
 */
let fs = require("fs");

//读取文件
let readPathFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

//post传送过来的数据改成obj
let urlStrToObj = (data) => {
    data = data.split("&");
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        let temp = data[i].split("=");
        obj[temp[0]] = temp[1];
    }
    return obj;
};


//接收post传送过来的参数
let postData = (ctx) => {
    return new Promise((resolve, reject) => {
        let dataAll = "";
        ctx.req.on("data", function (chunk) {
            dataAll += chunk;
            if (dataAll)
                resolve(urlStrToObj(decodeURIComponent(dataAll)))
            reject();
        })
    })
};
//接收数据
let parameter = async (cxt) => {
    let data = {};
    console.log(cxt.method.toUpperCase());
    if (cxt.method.toUpperCase() === "GET") data = cxt.query;
    else if (cxt.method.toUpperCase() === "POST") data = await postData(cxt);
    else data = "请求方式错误";
    return data
};

//登录状态
let FnSession = (ctx, user) => {
    return new Promise((resolve, reject) => {
        if (user != undefined) {
            user.USERSESSION = 1;
            ctx.session.user = user;
            resolve(ctx.session.user);
        } else {
            if (typeof ctx.session.user !== "undefined") {
                ctx.session.user.USERSESSION += 1;
                resolve(ctx.session.user)
            } else resolve(false);
        }
        reject();
    })
};

//mysql返回数据格式化
let SQLDataForm = (roow) => {
    let ary = [];
    let l = roow.length;
    if (l !== 0) {
        for (let i = 0; i < l; i++) {
            let data = Object.getOwnPropertyNames(roow[i]);
            let obj = {};
            for (let key of data) {
                obj[key] = new String(roow[i][key]).toString();
            }
            ary.push(obj);
        }
    }
    return ary
};

module.exports = {
    parameter, readPathFile, FnSession, SQLDataForm
}
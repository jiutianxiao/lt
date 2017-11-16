/**
 * Created by dianying-h5 on 2017/11/1.
 */
const KOA = require("koa");//koaJS
const Router = require("koa-router");//路由
const MySql = require("mysql2");//mysql
const Session = require("koa-session2");//session
const cors = require("koa2-cors");
/*
 *         */

let routers = require("./router/router");

const app = new KOA();
let router = new Router();
// app.use(bodyParser);
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    // credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
routers.forEach((items, index) => {
    if (typeof items.methods === "object")
        items.methods.forEach((item, index) => {
            if (item.toUpperCase() === "GET")
                if (items.middle) {
                    router.get(items.path, items.middle, items.fn);
                } else router.get(items.path, items.fn);

            else if (item.toUpperCase() === "POST")
                if (items.middle) {
                    router.post(items.path, items.middle, items.fn);
                } else
                    router.post(items.path, items.fn);
        });
    else if (item.toUpperCase() === "GET")
        router.get(items.path, items.fn);
    else if (item.toUpperCase() === "GET")
        router.post(items.path, items.fn);
});

app.keys = ["this is a keys"];
app.use(Session({
    key: 'koa:sess',
    maxAge: 1800000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}, app));

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);
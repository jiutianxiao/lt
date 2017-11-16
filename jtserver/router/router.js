/**
 * Created by dianying-h5 on 2017/11/1.
 */

let {register, login, list, signOut, upPost, userData, delPost, userPost, webPage, upFile,upload} = require("./fn");

let route = [
    {
        path: "/register",
        methods: ["get", "post"],
        fn: register
    },
    {
        path: "/login",
        methods: ["get", "post"],
        fn: login
    },
    {
        path: "/list",
        methods: ["get", "post"],
        fn: list
    },
    {
        path: "/signOut",
        methods: ["get", "post"],
        fn: signOut
    },
    {
        path: "/upPost",
        methods: ["get", "post"],
        fn: upPost
    },
    {
        path: "/userData",
        methods: ["get", "post"],
        fn: userData
    },
    {
        path: "/delPost",
        methods: ["get", "post"],
        fn: delPost
    },
    {
        path: "/userPost",
        methods: ["get", "post"],
        fn: userPost
    },
    {
        path: "/upFile",
        methods: ["get", "post"],
        middle: upload.single("file"),
        fn: upFile
    },
    {
        path: "/*",
        methods: ["get", "post"],
        fn: webPage
    }
];

module.exports = route;
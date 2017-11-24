/**
 * Created by dianying-h5 on 2017/11/17.
 */
import axios from "axios"
export const a = () => {
  globalRouter.push("/login")
}

//点赞
export const good = (obj) => {
  return axios.get(url + "/good", {
    params: obj
  })
};
//首页列表
export const indexList = (type) => {
  return axios.get(url + "/list", {params: {type}})
};

//头像上传
export const upHead = (data) => {
  return axios.post(url + "/upHead", data)
};

export const upLoad = (e) => {
  console.log(e.target.files[0]);
  let form = new FormData();
  return axios.post(url + "/upFile",)
};

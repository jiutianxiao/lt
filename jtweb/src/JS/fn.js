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

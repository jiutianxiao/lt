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

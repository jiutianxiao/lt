/**
 * Created by dianying-h5 on 2017/11/6.
 */
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex);
axios.interceptors.response.use(function (res) {
  if (res.status === 200 && res.statusText === "OK") {
    return res.data;
  }
  return res
}, function (error) {
  return Promise.reject(error)
});
export const store = new Vuex.Store({
    state: {
      //公众状态
      sideBarOpened: false,
      userState: "",
      url: "http://192.168.100.182:3000",
      post: {pid: "", fid: "", cid: ""}
    },

    getters: {
      changeState: state => {
        //相当于vue实例中的methods，用来处理公用data
        //自vuex面向组件的数据处理
      }
    },
    mutations: {
      //写法与getters相似
      // 组件想要对于vuex中的数据进行的处理
      //  组件中采用this.$store.commit('方法名')的方式调用，实现充分耦合
      //  内部操作必须在此刻完成（同步）
      sessionState(state, data){//登录状态
        if (data) {
          sessionStorage.userState = data;
        }
        sessionStorage.time = new Date().getTime();
      },
      postSave(state, data){
        state.post = data;
      }
    }
    ,
    actions: {
      //  使得mutations 能够实现异步调用，实现例如延迟调用
      increment({commit}, payload)
      {
        commit('突变方法名')
        //payload应该是一个对象，可通过末班方法调用传入对象的方式将数据从组件传入VUEX
      }
      ,
      asyncIncrement({commit})
      {
        setTimeout(() => {
          commit(() => {
            commit("increment")
          }, 1000)
        })
      }
    }
  })
;

<template>
  <div id="user" class="bg">
    <susp></susp>
    <div class="user-data">
      <div class="user-data-title-img">
        <img src="http://tb.himg.baidu.com/sys/portrait/item/87d20914" alt="">
      </div>
      <ul class="user-data">
        <li v-if="data.username">名字：{{data.username}}</li>
        <!--<li>等级：1级</li>-->
        <li>实名：{{data.name ? "是" : "否"}}</li>
        <li v-if="data.name">
          <ul>
            <li>真实姓名：{{data.name}}</li>
            <li>性别：{{data.sex}}</li>
            <li>手机号：{{data.tel}}</li>
            <li>地址：{{data.address}}</li>
            <li>邮箱：{{data.email}}</li>
            <li>地址：{{data.address}}</li>
            <li>证件：
              <div class="zjImg"><a
                href="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"><img
                src="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"
                alt="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"></a><a
                href="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"><img
                src="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg
"
                alt="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"></a><a
                href="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"><img
                src="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"
                alt="http://imgsrc.baidu.com/forum/w%3D580%3B/sign=1eb715e8073387449cc52f746134d8f9/5882b2b7d0a20cf4d93eb5677d094b36adaf99d8.jpg"></a>
              </div>
            </li>
            <li>其他：</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="user-list">
      <ul>
        <li>
          <p class="user-list-title" @click="tRouter(3)">主题</p>
          <router-view name="theme" :data="dataSecond"></router-view>
        </li>
        <li>
          <p class="user-list-title" @click="tRouter(4)">消息</p>
          <router-view name="news" :data="dataSecond"></router-view>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import susp from "@/components/pageSusp";
  import axios from "axios";
  import {mapState} from "vuex";
  export default({
    name: 'index',
    data(){
      return {
        data: {},
        dataSecond: {}
      }
    },
    computed: {
      ...mapState(["url"])
    },
    created(){
      document.title = "用户资料";
      axios.get(this.url + "/userData")
        .then(data => {
          if (data.code === "0000") {
            this.data = data.data;
          } else {
            alert(data.msg + "\n" + "将返回登录");
            this.$router.push("/login");
          }
        })
    },
    components: {susp},
    methods: {
      tRouter(type){
        if (type === 3) {
          this.$router.push('/userData/theme?type=3');
        } else {
          this.$router.push('/userData/news?type=4');
        }
      }
    }
  })
</script>
<style scoped>
  #user {
    margin: 0 auto;
    width: 90%;
    padding: 3%;
  }

  .user-list-title {
    font-weight: bold;
    background: darkcyan;
    line-height: 30px
  }

  #user img {
    max-width: 100%;
  }

  .user-data-title-img {
    width: 110px;
    height: 110px;
  }

  .user li {
    line-height: 24px;
  }

  .zjImg a {
    width: 30%;
    display: inline-block;
    margin: 0 1.5%;
  }
</style>

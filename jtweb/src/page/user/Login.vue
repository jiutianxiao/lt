<template>
  <section id="login">
    <form action="">
      <inputList ref="name">请用您的用户名或者手机号登录</inputList>
      <inputList ref="pw">请输入您的密码</inputList>
      <input type="submit" @click="beForLogin()" class="login-input m-t-10 login-b f-c-t"
             value="登录">
      <p class="text-r p-R-20 m-t-10">
        <router-link to="./register" class="f-c-darkcyan">注册</router-link>
        <router-link to="resetPW" class="f-c-darkcyan">忘记密码</router-link>
      </p>
    </form>
    <div v-if="showA" class="showA">
      登录成功
      <br>
      将会在{{num}}S后跳转首页
    </div>
  </section>
</template>
<script>
  import {mapMutations, mapState} from "vuex"
  import inputList from "@/components/loList"
  import axios from "axios"
  import qs from "qs"
  export default({
    name: 'index',
    data(){
      return {
        userId: "",
        passWd: "",
        user: localStorage.userState,
        msg: {userId: "账号", passWd: "密码"},
        showA: false,
        num: 3
      }
    },
    created(){
      document.title = "登录"
    },
    components: {inputList},
    computed: {...mapState(["userState", "url"])},
    methods: {
      ...mapMutations(["sessionState"]),
      beForLogin(){
        let userId = this.$refs.name.Io;
        let passWd = this.$refs.pw.Io;
        this.login({userId, passWd})
      },
      login(data){
          debugger
        axios.post(this.url + "/login", qs.stringify(data))
          .then(data => {
            if (data.code === "0000") {
              data = data.data;
              this.sessionState(data);
              this.showA = true;
              let time = window.setInterval(() => {
                this.num--;
                if (this.num === 0) {
                  window.clearTimeout(time);
                  this.$router.push("/")
                }
              }, 1000)
            } else {
              alert(data.msg)
            }
          })
      },
    }
  })
</script>
<style scoped>
  #login {
    max-width: 300px;
    height: 210px;
    border: 1px solid gainsboro;
    margin: 60px auto 0;
    width: 60%;
    padding: 0 10%;
    min-width: 200px;
  }

  .login-input {
    max-width: 260px;
    width: 100%;
    height: 30px;
    background: darkcyan;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    color: aliceblue;
  }

  .login-input:hover {
    background: #005a5a;
    color: white;
  }

  @media screen and (max-width: 900px) {
    #login {

    }

    .login-input {
    }
  }

  .showA {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: white;
  }

  .showA p {
    margin: 50px;
  }

</style>

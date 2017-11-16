<template>
  <section id="register">
    <!--username, name, password, tel, address, email, headimg, sex-->
    <inputList ref="name" class="maT10">用户名</inputList>
    <inputList ref="pw" class="maT10">密码</inputList>
    <inputList ref="tpw" class="maT10">确认密码</inputList>
    <!--<inputList ref="email" class="maT10">邮箱</inputList>-->
    <button @click="send()" class="btn">注 册</button>
    <div v-if="show" class="showA">
      <p>
        注册成功 <br>
        将在{{time}}S 后自动跳转原页面
      </p>
    </div>
  </section>
</template>
<script>
  import inputList from "@/components/reList";
  import axios from "axios";
  import qs from "qs"
  import {mapMutations, mapState} from "vuex"
  export default({
    name: 'register',
    data(){
      return {
        show: false,
        time: 3
      }
    },
    computed: {...mapState(["url", "userState"])},
    components: {inputList},
    created(){
      document.title = "注册"
    },
    methods: {
      ...mapMutations(["register", "login"]),
      send(){
        let ary = {"username": "用户名不能为空", "tpw": "密码不能为空", "password": "请再次确认密码"};
        let data = {username: this.$refs.name.Io, tpw: this.$refs.pw.Io, password: this.$refs.tpw.Io};
        for (let key in data) {
          if (!data[key]) {
            alert(ary[key]);
            return
          }
        }
        axios.post(this.url + "/register", qs.stringify(data)).then(data => {
          if (data.code === "0000") {
            this.show = true;
            data = data.data;
            this.userState = data;
            let setTime = window.setInterval(a => {
              this.time--;
              if (this.time === 0) {
                clearTimeout(setTime);
                this.$router.push("/");
                this.sessionState(data);
              }
            }, 1000)
          } else {
            alert(data.msg)
          }
        })
      }
    },
    mounted()
    {

    }
  })
</script>
<style scoped>
  #register {
    margin: 60px auto;
    max-width: 800px;
    width: 70%;
    border: 1px solid gainsboro;
    padding: 5%;
  }

  .maT10 {
    margin: 10px 0;
  }

  .btn {
    margin: 20px auto;
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

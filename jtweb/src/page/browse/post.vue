<template>
  <div id="post">
    <reList v-if="show" ref="title">标题</reList>
    <p class="m-t-10">内容：</p>
    <div class="post-input" contenteditable="true">
      <p>
        <br>
      </p>
    </div>
    <input type="button" class="btn" value="发 帖" @click="post()">
  </div>
</template>
<script>
  import reList from "@/components/reList"
  import axios from "axios"
  import qs from "qs"
  import {mapState} from "vuex"
  export default({
    name: 'index',
    data(){
      return {
        show: false,
        pid: "",
        fid: "",
        cid: "",
        id: ""
      }
    },
    created(){
      document.title = "发帖";
      this.pid = this.$route.query.pid;
      this.fid = this.$route.query.fid;
      this.cid = this.$route.query.cid;
      this.id = this.$route.query.id;
      if (!this.pid) {
        this.show = true;
      }

    },
    computed: {
      ...mapState(["url"])
    },
    methods: {
      post(){
        let ele = document.querySelectorAll(".post-input p");
        let con = {};
        console.log(typeof ele[0].innerText);
        for (let i = 0, l = ele.length; i < l; i++) {
          if (l === 1 && !ele[i].innerText.length) {
          } else {
            con[i] = ele[i].innerText;
          }
        }
        let data = {
          pid: this.pid,
          fid: this.fid,
          cid: this.cid,
          content: JSON.stringify(con),
          ecreater: this.id,
        };
        if (!this.pid)
          data["title"] = this.$refs.title.Io;
        axios.post(this.url + "/upPost", qs.stringify(data)).then(data => {
          if (data.code === "0000") {
            alert(data.msg);
            this.$router.go(-1);
          } else if (data.code === "1001") {
            alert(data.msg);
            this.$router.push("/login");
          } else {
            alert(data.msg)
            this.$router.push("/")
          }
        })
      }
    },
    components: {reList}
  })
</script>
<style scoped>
  #post {
    margin: 20px auto;
    width: 90%;
  }

  .post-input {
    height: 50px;
    padding: 5px;
    border: 1px solid darkcyan;
    border-radius: 5px;
    overflow: scroll;
  }

  .btn {
    margin-top: 20px;
  }
</style>

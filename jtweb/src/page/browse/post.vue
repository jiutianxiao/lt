<template>
  <div id="post">
    <reList v-if="show">标题</reList>
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
        cid: ""
      }
    },
    created(){
      document.title = "发帖";
      this.pid = this.$route.query.pid;
      this.fid = this.$route.query.fid;
      this.cid = this.$route.query.cid;
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
        let con = {}
        for (let i = 0, l = ele.length; i < l; i++) {
          con[i] = ele[i].innerText;
        }
        axios.post(this.url + "/upPost", qs({
          pid: this.pid,
          fid: this.fid,
          cid: this.cid,
        }))
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

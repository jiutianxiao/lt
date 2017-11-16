<template>
  <div id="theme">
    <ul>
      <li class="theme-list" v-for="items in data">
        <router-link :to="'/details?pid='+items.pid">
          <div>
            <p class="theme-title">{{items.creater}} <span>时间：{{formatTime(items.ctime)}}</span>
              楼层：{{items.fid}}-{{items.cid}}</p>
            <p>{{JSON.parse(items.content)[0] || "[图片]"}}</p>
          </div>
        </router-link>
      </li>
      <li v-if="!data">
        暂时没有数据
      </li>
    </ul>
  </div>
</template>
<script>
  import {formatTime} from "@/commonJS/commonJS"
  import axios from "axios"
  import {mapState} from "vuex"
  export default({
    name: 'index',
    data(){
      return {}
    },
    computed: {...mapState(["url"])},
    props: ["data"],
    methods: {
      formatTime
    },
    mounted(){
      let type = this.$route.query.type;
      axios.get(this.url + "/userPost?type=" + type).then(data => {
        if (data.code === "0000") {
          this.data = data.data;
        } else {
          alert(data.msg);
          this.$router.go(-1);
        }
      })
    },
    components: {}
  })
</script>
<style scoped>
  #theme {

  }

  .theme-list {
    border: 1px solid rgba(100, 100, 180, .1);
    line-height: 26px;
    margin: 0 auto 4px;
  }

  .theme-title {
    background: rgba(100, 100, 180, .1);
  }
</style>

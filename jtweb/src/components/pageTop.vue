<!--页面的头-->
<template>
  <nav id="pageTop">
    <ul class="pageTop-ul">
      <li class="pageTop-ul-li">
        <span @click="queryData(2)">热门</span>
      </li>
      <li class="pageTop-ul-li">
        <span @click="queryData(0)">最新</span>
      </li>
      <li class="pageTop-ul-li">
        <span @click="queryData(3)">精品</span>
      </li>
      <li class="pageTop-ul-li">
        <router-link to="#">交易</router-link>
      </li>
      <li class="pageTop-ul-li">
        <router-link to="#">留言</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
  import {mapMutations} from "vuex"
  import {indexList} from "@/JS/fn"
  export default({
    name: 'index',
    data(){
      return {}
    },
    created(){
        this.queryData(2)
    },
    methods: {
      ...mapMutations(["indexData"]),
      indexList,
      queryData(type){
        console.log(1);
        indexList(type).then(data => {
          if (data.code === "0000") {
            this.indexData(data.data)
          } else {
            alert(data.msg)
          }
        })
      }
    },
    components: {}
  })
</script>
<style scoped>
  #pageTop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    overflow-x: scroll;
    background: #00c9c9;
  }

  .pageTop-ul {
    width: max-content;
    height: 50px;
    overflow: hidden;
  }

  .pageTop-ul-li {
    position: relative;
    display: inline-block;
    padding: 0 20px;
    line-height: 50px;
    font-size: 18px;
  }

  .pageTop-ul-li:after {
    content: "";
    position: absolute;
    top: 10px;
    left: -1px;
    width: 1px;
    height: 30px;
    background: gainsboro;
  }
</style>


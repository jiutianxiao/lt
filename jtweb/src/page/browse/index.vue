<template>
  <section id="app-index">
    <pageTop></pageTop>
    <pageSusp></pageSusp>
    <div class="app-index-list">
      <ul>
        <li v-for="item in indexData">
          <pageList class="" :data="item"></pageList>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  import pageList from "@/components/pageList"
  import pageTop from "@/components/pageTop"
  import pageSusp from "@/components/pageSusp"
  import axios from "axios";
  import {mapState} from "vuex";
  import {a} from "@/JS/fn"
  export default({
    name: 'index',
    data(){
      return {
        data: {}
      }
    },
    computed: {...mapState(["url","indexData"])},
    created(){
      document.title = "首页";
    },
    methods: {
    },
    components: {pageList, pageTop, pageSusp}
  })
</script>
<style scoped>
  #app-index {
    width: 90%;
    margin: 0 auto;
  }

  .app-index-list {
    position: relative;
    top: 50px;
  }

  .app-index-list li {
    margin: 2px 0;
    border: 1px solid rgba(0, 139, 139, 0.29);
    border-bottom: 0;
  }
</style>

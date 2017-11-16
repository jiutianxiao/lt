<template>
  <div id="details">
    <pageSusp :pid="pid" :fid="fid" :cid="cid"></pageSusp>
    <nav class="details-title">
      <h2>{{title}}</h2>
    </nav>
    <article class="details-con bg">
      <ul>
        <li class="details-con-list" v-for="(items,index) in data" @click="FnShowSecondLevel(items.fid)">
          <section>
            <div class="details-men">
              <div class="details-men-img">
                <svg class="icon"
                     style="width: 100%; height: 100%;vertical-align: middle;fill: currentColor;overflow: hidden;"
                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1686">
                  <path
                    d="M982.604 313.186c-25.725-60.822-62.549-115.442-109.449-162.34-46.899-46.9-101.519-83.724-162.34-109.45-62.982-26.64-129.874-40.146-198.815-40.146s-135.833 13.507-198.814 40.146c-60.822 25.725-115.442 62.55-162.34 109.45-46.9 46.899-83.724 101.519-109.45 162.34-26.64 62.982-40.146 129.873-40.146 198.814s13.507 135.833 40.146 198.815c25.725 60.821 62.55 115.441 109.45 162.34 46.899 46.899 101.519 83.724 162.34 109.449 62.982 26.64 129.873 40.147 198.814 40.147s135.833-13.506 198.815-40.147c60.821-25.725 115.441-62.549 162.34-109.449 46.899-46.899 83.724-101.519 109.449-162.34 26.64-62.982 40.146-129.873 40.146-198.815s-13.505-135.833-40.146-198.814zM503.726 176.886c121.605 0 220.55 97.474 220.55 217.316 0.007 119.85-98.943 217.315-220.55 217.315-121.604 0-220.548-97.5-220.548-217.315 0-119.808 98.943-217.316 220.548-217.316zM512 979.649c-138.123 0-262.446-60.196-348.129-155.726 35.709-110.896 141.197-191.476 265.489-191.476h165.255c124.293 0 229.793 80.598 265.509 191.482-85.685 95.527-210.004 155.721-348.125 155.721z"
                    fill="" p-id="1687"></path>
                </svg>
              </div>
              <div>
                <p>{{items.creater}}</p>
                <p><span>时间：{{formatTime(items.ctime)}}</span> <span>{{items.fid}}楼</span></p>
                <p v-if="index!==0">回复({{items.total - 1}})</p>
              </div>
            </div>
          </section>
          <div v-for="(item ,index ) in formatData(items)">
            <p v-if="items['content'][index]">{{item}}</p>
            <img v-else-if="items['img'][index]" v-bind:src="item"/>
          </div>
        </li>
      </ul>
      <transition name="slide-fade">
        <div v-show="showSecondLevel" class="details-t">
          <ul>
            <li v-for="item in dataSecond" @click="item.cid!=='0'?FnPostSecond(item.cid):''">
              <div class="details-men">
                <div class="details-men-img">
                  <svg class="icon"
                       style="width: 100%; height: 100%;vertical-align: middle;fill: currentColor;overflow: hidden;"
                       viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1686">
                    <path
                      d="M982.604 313.186c-25.725-60.822-62.549-115.442-109.449-162.34-46.899-46.9-101.519-83.724-162.34-109.45-62.982-26.64-129.874-40.146-198.815-40.146s-135.833 13.507-198.814 40.146c-60.822 25.725-115.442 62.55-162.34 109.45-46.9 46.899-83.724 101.519-109.45 162.34-26.64 62.982-40.146 129.873-40.146 198.814s13.507 135.833 40.146 198.815c25.725 60.821 62.55 115.441 109.45 162.34 46.899 46.899 101.519 83.724 162.34 109.449 62.982 26.64 129.873 40.147 198.814 40.147s135.833-13.506 198.815-40.147c60.821-25.725 115.441-62.549 162.34-109.449 46.899-46.899 83.724-101.519 109.449-162.34 26.64-62.982 40.146-129.873 40.146-198.815s-13.505-135.833-40.146-198.814zM503.726 176.886c121.605 0 220.55 97.474 220.55 217.316 0.007 119.85-98.943 217.315-220.55 217.315-121.604 0-220.548-97.5-220.548-217.315 0-119.808 98.943-217.316 220.548-217.316zM512 979.649c-138.123 0-262.446-60.196-348.129-155.726 35.709-110.896 141.197-191.476 265.489-191.476h165.255c124.293 0 229.793 80.598 265.509 191.482-85.685 95.527-210.004 155.721-348.125 155.721z"
                      fill="" p-id="1687"></path>
                  </svg>
                </div>
                <div>
                  <p>{{item.creater}}</p>
                  <p><span>时间：{{formatTime(item.ctime)}}</span> <span>{{item.cid}}楼</span></p>
                </div>
              </div>
              <p v-for="con in JSON.parse(item.content)">
                {{con}}
              </p>
            </li>
          </ul>
        </div>
      </transition>
    </article>
  </div>
</template>
<script>
  import pageSusp from "@/components/pageSusp"
  import {formatTime} from "@/commonJS/commonJs"
  import axios from "axios";
  import {mapState} from "vuex";
  export default({
    name: 'index',
    data(){
      return {
        showSecondLevel: false,
        data: "",
        title: "",
        content: "",
        img: "",
        pid: "",
        fid: "",
        cid: "",
        dataSecond: ""
      }
    },
    computed: {...mapState(["url"])},
    created(){
      document.title = "帖子详情";
      this.title = this.$route.query.title;
      this.pid = this.$route.query.pid;
      if (!this.pid) {
        alert("您的打开方式有误，请您重新打开");
        this.$router.push("/");
        return false
      }
      axios.get(this.url + "/list", {
        params: {
          pid: this.pid,
          type: 1
        }
      }).then(data => {
        if (data.code === "0000") {
          data = data.data;
          for (let key in data) {
            let item = data[key];
            data[key].img = JSON.parse(item.img);
            data[key].content = JSON.parse(item.content);
          }
          this.data = data;
        } else {
          alert(data.msg)
        }
      })
    },
    methods: {
      formatTime,
      FnShowSecondLevel(fid){
        if (fid !== "1" && !this.showSecondLevel) {
          this.showSecondLevel = !this.showSecondLevel;
          this.fid = fid;
          axios.get(this.url + "/list", {
            params: {
              type: 1,
              pid: this.pid,
              fid: this.fid
            }
          }).then(data => {
            if (data.code === "0000") {
              this.dataSecond = data.data;
            } else
              alert(data.msg);
          })
        } else {
          this.showSecondLevel = false;
          this.fid = "";
        }
      },
      formatData(data){
        let obj = {...data.img, ...data.content};
        return obj
      },
      FnPostSecond(cid){
        this.$router.push("/pagepost?pid=1506420176738&fid=3&cid=" + cid)
      }
    },
    components: {pageSusp}
  })
</script>
<style scoped>
  #details {
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .details-con {
    margin: 40px auto 0;
    width: 90%;
  }

  .details-t {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;
    background: white;
    border-left: 1px solid #00c9c9;
  }

  .details-con img {
    max-width: 100%;
    max-height: 100%;
  }

  .details-title {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #00c9c9;
  }

  .details-title h2 {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .details-men {
    padding: 5px 0;
  }

  .details-men > div {
    display: inline-block;
    vertical-align: middle;
  }

  .details-men-img {
    margin-right: 10px;
    width: 60px;
    height: 60px;
  }

  .details-con-list, .details-t li {
    padding-bottom: 5px;
    border-bottom: 1px solid darkcyan;
  }

</style>

<!--登录页的input 和relist极其相似，只是多写了一个-->
<template>
  <div class="input-list">
    <div>
      <p class="input-list-title">
        <slot></slot>
      </p>
      <input type="text" class="input-list-input" v-model="Io">
    </div>
  </div>
</template>
<script>
  export default({
    name: 'inputList',
    data(){
      return {
        Io: ""
      }
    },
    components: {}
  })
</script>
<style scoped>
  .input-list-title {
    text-align: left;
    height: 30px;
    line-height: 40px;
    color: rgb(36, 41, 46);
  }

  .input-list-input {
    height: 30px;
    width: 260px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid darkcyan;
  }

  @media screen and (max-width: 900px) {
    .input-list-input {
      width: 100%;
    }
  }
</style>

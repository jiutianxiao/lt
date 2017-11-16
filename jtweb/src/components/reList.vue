<!--这个是注册页样式的input，也是公众的input样式-->
<template>
  <div class="input-list">
    <div>
      <p class="input-list-title">
        <slot></slot>
        :
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
  .input-list {
    width: 100%;
  }

  .input-list-title {
    display: inline-block;
    width: 30%;
    text-align: right;
    color: #333;
    margin-right: 10px;
  }

  .input-list-input {
    width: 300px;
    height: 26px;
    border: 1px solid darkcyan;
    border-radius: 5px;
  }

  @media screen and (max-width: 700px) {
    .input-list-title {
      width: 100%;
      text-align: left;
      margin-bottom: 5px;
    }
    .input-list-input{
      width: 100%;
    }
  }
</style>

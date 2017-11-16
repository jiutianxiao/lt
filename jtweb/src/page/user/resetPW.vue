<template>
  <div id="restPW">
    <reList class="maT10">请输入账号</reList>
    <p>请输入账号，我会给你注册时留下的邮箱发送邮件，请你注意查收，以完成修改密码</p>
    <input class="btn" type="button" value="确定">
  </div>
</template>
<script>
  import reList from  "@/components/reList"
  export default({
    name: 'restPW',
    data(){
      return {}
    },
    components: {reList},
    created(){
        document.title="重置密码"
    }
  })
</script>
<style scoped>
  #restPW {
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
    display: block;
    margin: 20px auto;
    width: 80px;
    height: 30px;
    background: darkcyan;
    border: 0;
    border-radius: 5px;
    color: gainsboro;
  }
</style>

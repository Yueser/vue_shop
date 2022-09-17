<template>
  <div id='Home'>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {}
  },
  methods: {
    logout(){
      window.sessionStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
}
</script>

<style lang="less" scoped>
#Home {

}
</style>
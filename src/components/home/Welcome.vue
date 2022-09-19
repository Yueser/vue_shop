<template>
  <div id='Welcome'>
<h1>欢迎使用这个不是很好用的<span title="你知道的太多了">各种意义上的</span>后台管理系统</h1>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
#Welcome {
h1{
  color: #0086b3;
  font-size: 40px;
  margin-left: 20px;
  margin-top: 20px;
  span{
    color: black;
    background-color: black;
    transition: 0s all;
    &:hover{
      color: white;
      transition: .5s all;
    }
    &::selection{
      color: #000001;
      background-color: black;
    }
  }
}
}
</style>
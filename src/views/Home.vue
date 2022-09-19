<template>
  <div id='Home'>
    <el-container>
      <el-header>
        <div>
          <img src="@/assets/logo.png" alt="">
          <span>Vue的后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!--左侧边栏-->
        <el-aside width="200px">
          <div class="toggle-button">| | |</div>
          <el-menu
              router
              unique-opened
              :default-active="$route.path"
              background-color="#313743"
              text-color="#fff"
              active-text-color="#409eff">
            <el-submenu v-for="menu in menuList" :index="menu.id+''" :key="menu.id">
              <template slot="title">
                <i :class="['iconfont',iconList[menu.id]]" style="margin-right: 10px"/>
                <span>{{ menu.authName }}</span>
              </template>
              <el-menu-item v-for="menu in menu.children" :index="'/'+menu.path">
                <template slot="title"><i class="el-icon-menu"/><span>{{ menu.authName }}</span></template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--右主内容区-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      iconList: {
        '125': 'icon-user',
        '103': 'icon-tijikongjian',
        '101': 'icon-shangpin',
        '102': 'icon-danju',
        '145': 'icon-baobiao',
      }
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token');
      this.$router.push('/login');
    },
    async getMenuList() {
      let {data: res} = await this.$axios.get('menus');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
    }
  },
  created() {
    this.getMenuList();
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
#Home {
  @left-color: #313743;
  @left-font-color: white;
  width: 100%;
  height: 100%;

  > .el-container {
    height: 100%;

    .el-header {
      background-color: #505050;
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        height: 100%;

        img {
          height: 100%
        }

        span {
          margin-left: 20px;
          font-size: 40px;
          color: @left-font-color;
        }
      }
    }

    .el-aside {
      background-color: @left-color;

      .toggle-button {
        text-align: center;
        background-color: @left-color;
        color: @left-font-color;
        line-height: 24px;
        cursor: default;
        user-select: none;
      }

      .el-menu {
        border-right-width: 0;

        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }

    .el-main {
      background-color: #e0e0e0;
      /deep/.el-breadcrumb{
        font-size: 24px;
        margin-bottom:15px;
      }
    }
  }
}
</style>
<template>
  <div id='Users'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--表头 搜索-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入搜索用户名" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="openDialog('addUser')">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <!--表格正式内容-->
      <el-table :data="userList" border stripe
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
        <el-table-column type="index"/>
        <el-table-column label="用户名" prop="username"/>
        <el-table-column label="邮箱" prop="email"/>
        <el-table-column label="电话" prop="mobile"/>
        <el-table-column label="角色" prop="role_name"/>
        <el-table-column label="状态" width="100px">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#409eff" inactive-color="#eeeeee"
                       @change="userStateChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="信息修改" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="openDialog('changeUser',scope.row)"/>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteUser(scope.row['id'],scope.$index)"/>
            </el-tooltip>
            <el-tooltip effect="dark" content="用户设置" placement="top-end" :enterable="false">
              <el-button type="info" icon="el-icon-setting" size="mini"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--翻页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.queryInfo.pagenum"
          :page-sizes="[1,2,3]"
          :page-size="this.queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <!--dialog-->
    <UsersDialog ref="dialog" @Renew="getUserList"/>
  </div>
</template>

<script>
import UsersDialog from "@/components/home/users/UsersDialog";

export default {
  name: "Users",
  data() {
    return {
      dialogVisible: false,
      //查询条件
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      //存放用户信息
      userList: [],
      total: 0,
    }
  },
  methods: {
    //获取用户列表
    async getUserList() {
      let {status, data: res} = await this.$axios.get('users', {params: this.queryInfo});
      if (status !== 200) return this.$message.error('网络连接错误');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.userList = res.data["users"];
      this.total = res.data.total;
    },
    //条数限制改变时
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      //todo 优化点：获取到数据后可以存到变量中，而不是每次都重新请求，加快页面内容更新速度，减少服务器压力，双赢(老板和客户赢，程序员哭)
      this.getUserList();
    },
    // 换页
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getUserList();
    },
    // 状态切换
    async userStateChange(val) {
      let {status, data: res} = await this.$axios.put(`users/${val.id}/state/${val.mg_state}`)
      if (status !== 200) {
        val.mg_state = !val.mg_state;
        return this.$message.error('网络连接错误')
      }
      if (res.meta.status !== 200) {
        val.mg_state = !val.mg_state;
        return this.$message.error('设置失败')
      }
      this.$message.success('设置成功')
    },
    // 打开dialog
    openDialog(val, userInfo) {
      this.$refs.dialog.openDialog(val, userInfo);
    },
    // 这位用户请你从这个世界上消失掉吧
    async deleteUser(id, i) {
      let {status, data: res} = await this.$axios.delete(`users/${id}`)
      if (status !== 200) return this.$message.error('网络连接错误');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success(res.meta.msg);
      this.userList.splice(i, 1);
      !this.userList.length && this.queryInfo.pagenum--
      await this.getUserList();
    }
  },
  components: {
    UsersDialog
  },
  created() {
    this.getUserList();
  }
}
</script>

<style lang="less" scoped>
#Users {
  .el-table .el-table__cell {
    text-align: center !important;
  }

  .el-card {
    .el-pagination {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>
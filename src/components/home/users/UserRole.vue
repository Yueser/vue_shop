<template>
  <div id='UserRole'>
    <el-dialog
        title="用户绑定"
        :visible.sync="dialogVisible"
        width="30%">
      <el-row>
        <el-col :span="10" :offset="4"><h1>{{ userName }}</h1></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">当前职务</el-col>
        <el-col :span="12">
          <el-select v-model="userRole" placeholder="请选择">
            <el-option
                v-for="item in userListerList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="setUserRole">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserRole",
  data() {
    return {
      dialogVisible: false,
      userName: '',
      userId: '',
      userListerList: Array,
      userRole: '',
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    openDialog(user) {
      this.userName = user['username'];
      this.userId = user.id;
      this.getUserInfo(user.id)
      this.dialogVisible = true;
    },
    async getUserInfo(id) {
      let {status, data: res} = await this.$axios.get(`users/${id}`)
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      this.userRole = res.data.rid;
      this.userRole = this.userRole > 1 ? this.userRole : '';
    },
    async getRoleListerList() {
      let {status, data: res} = await this.$axios.get('roles')
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userListerList = res.data
    },
    async setUserRole() {
      let {status, data: res} = await this.$axios.put(`users/${this.userId}/role`, {rid: this.userRole})
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.closeDialog()
    }
  },
  created() {
    this.getRoleListerList()
  }
}
</script>

<style lang="less" scoped>
#UserRole {
  .el-row {
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div id='RolesDialog'>
    <el-dialog
        :title="isAdd?'添加角色':'修改角色'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="closeCont"
        @close="closeCont">
      <el-form :model="roleForm" ref="dialogFormRef" label-width="80px" :rules="FormRules">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleForm.roleName"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.roleDesc"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCont">取 消</el-button>
        <el-button type="primary" @click="addRole" v-if="isAdd">添 加</el-button>
        <el-button type="primary" @click="changeRole" v-if="isChange">更 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RolesDialog",
  data() {
    return {
      dialogVisible: false,
      isAdd: false,
      isChange: false,
      roleForm: {
        roleName: '',
        roleDesc: '',
        id: '',
      },
      // todo 表单验证莫名出错，角色编辑待添加，删除有效
      FormRules: {
        roleName: [
          {required: true, message: '难不成又一个叫\"喂\"的?', trigger: 'blur'},
          {min: 2, max: 8, message: '短2长8，不要超限，请用中文谢谢', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    closeCont() {
      this.dialogVisible = false;
      this.isChange = false;
      this.isAdd = false;
      this.$emit('Renew');
      this.roleForm = {
        roleName: '',
        roleDesc: '',
        id: '',
      }
      this.$refs.dialogFormRef.resetFields();
    },
    async addRole() {
      let formVerify = await new Promise(resolve => {
        this.$refs.dialogFormRef.validate((val) => {
          resolve(val)
        })
      })
      if (!formVerify) return;

      let {status, data: res} = await this.$axios.post('roles', this.roleForm)
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.$emit('Renew');
      this.closeCont();
    },
    async changeRole() {
      let formVerify = await new Promise(resolve => {
        this.$refs.dialogFormRef.validate((val) => {
          resolve(val)
        })
      })
      if (!formVerify) return;

      this.$emit('Renew');
    },
    openDialog(val, roleInfo) {
      const Judge = new Map([
        ['addRole', this.isAddRole],
        ['changeRole', this.isChangeRole]
      ])
      Judge.get(val)(roleInfo);
      this.dialogVisible = true;
    },
    isAddRole() {
      this.isAdd = true;
    },
    isChangeRole(roleInfo) {
      this.isChange = true;
      this.roleForm = {
        roleName: roleInfo.roleName,
        id: roleInfo.id,
        roleDesc: roleInfo.roleDesc,
      }
    }
  },
}
</script>

<style lang="less" scoped>
#RolesDialog {

}
</style>
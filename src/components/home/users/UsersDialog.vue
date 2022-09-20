<template>
  <el-dialog
      :title="isAdd?'添加用户':'修改用户'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="closeCont"
      @close="closeCont">
    <el-form :model="userForm" ref="dialogFormRef" label-width="80px" :rules="FormRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" :disabled="!isAdd"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="isAdd">
        <el-input type="password" v-model="userForm.password"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email"/>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="userForm.mobile"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeCont">取 消</el-button>
      <el-button type="primary" @click="addUser" v-if="isAdd">添 加</el-button>
      <el-button type="primary" @click="changeUser" v-if="isChange">更 改</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "UsersDialog",
  data() {
    //表单验证
    const emailVerify = (rule, val, callback) => {
      const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return val === '' ? callback() : emailRE.test(val) ? callback() : callback(new Error('请输入正确的邮箱'))
    };
    const mobileVerify = (rule, val, callback) => {
      const mobileRE = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      return val === '' ? callback() : mobileRE.test(val) ? callback() : callback(new Error('请输入正确的手机号'))
    }
    return {
      dialogVisible: false,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: '',
      },
      FormRules: {
        username: [
          {required: true, message: '难不成你叫\"喂\"?', trigger: 'blur'},
          {min: 3, max: 8, message: '短3长8，不要超限，谢谢', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码都不写想干嘛，给间谍用？', trigger: 'blur'},
          {min: 6, max: 15, message: '6-15', trigger: 'blur'}
        ],
        email: [
          {validator: emailVerify, trigger: 'blur'}
        ],
        mobile: [
          {validator: mobileVerify, trigger: 'blur'}
        ]
      },
      isAdd: false,
      isChange: false,
    }
  },
  methods: {
    //关闭dialog
    closeCont() {
      this.dialogVisible = false;
      this.isChange = false;
      this.isAdd = false;
      this.$emit('Renew');
      this.userForm = {
                username: '',
                password: '',
                email: '',
                mobile: '',
                id: '',
              }
      this.$refs.dialogFormRef.resetFields();
    },
    //添加用户
    async addUser() {
      let formVerify = await new Promise(resolve => {
        this.$refs.dialogFormRef.validate((val) => {
          resolve(val)
        })
      })
      if (!formVerify) return;

      let {status, data: res} = await this.$axios.post('users', this.userForm)
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 201) return this.$message.error(`用户创建失败,${res.meta.msg}`)
      this.$message.success(res.meta.msg)
      this.closeCont();
    },
    //修改用户
    async changeUser() {
      let formVerify = await new Promise(resolve => {
        this.$refs.dialogFormRef.validate((val) => {
          resolve(val)
        })
      })
      if (!formVerify) return;

      let {status, data: res} = await this.$axios.put(`users/${this.userForm.id}`, this.userForm)
      if (status !== 200) return this.$message.error('网络连接错误')
      if (res.meta.status !== 200) return this.$message.error(`${res.meta.msg}`)
      this.$message.success(res.meta.msg)
      this.closeCont();
    },
    //判断是添加还是修改
    openDialog(val, userInfo) {
      const Judge = new Map([
        ['addUser', this.isAddUser],
        ['changeUser', this.isChangeUser]
      ])
      Judge.get(val)(userInfo);
      this.dialogVisible = true;
    },
    isAddUser() {
      this.isAdd = true;
    },
    isChangeUser(userInfo = this.userForm) {
      this.isChange = true;
      this.userForm = {
        username: userInfo.username,
        password: '',
        email: userInfo.email,
        mobile: userInfo.mobile,
        id: userInfo.id,
      }
    }
  },
}
</script>

<style lang="less" scoped>

</style>
<template>
  <div id='Login' @keyup.enter="userLogin(),enterDown()">
    <div class="login_box">
      <div class="avatar-box">
        <img src='../assets/logo.png' alt="">
      </div>
      <el-form label-width="0px" class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model.trim="loginForm.username"  ref="userRef"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" ref="pwdRef"/>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="userLogin" ref="loginBtnRef">登陆</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          {required: true, message: '用户名你都能忘？', trigger: 'blur'},
          {min: 3, max: 8, message: '不行哟,太短了没感觉，太长了我会受不了的', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码都不写还想进入我？', trigger: 'blur'},
          {min: 6, max: 15, message: '想想你经常用的最爽的是什么', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    userLogin() {
      this.$refs.loginFormRef.validate(async val => {
        if (!val) return;
        const {status, data: res} = await this.$axios.post('/login', this.loginForm);
        if (res.meta.status !== 200) return this.$message.error('用户名或密码错误');
        this.$message.success('登陆成功');

        window.sessionStorage.setItem('token',res.data.token)
        setTimeout(()=>{
          this.$router.push('/home');
        },2000)
      });
    },
    enterDown(){
      this.$refs.userRef.blur();
      this.$refs.pwdRef.blur();
    }
  },
}
</script>

<style lang="less" scoped>
#Login {
  height: 100%;
  background-color: aqua;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: #eee;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
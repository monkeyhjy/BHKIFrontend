<template>
  <div class="login">
    <el-card class="login-card">
      <img class="login-logo" src="../../assets/image/user/image/logoT.png">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login-form">
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="right-button">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="signup">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login-form">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="right-button">
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.email !== '') {
            this.$refs.ruleForm.validateField('email');
          }
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          if (this.ruleForm.pass !== '') {
            this.$refs.ruleForm.validateField('pass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        activeName: 'login',
        ruleForm: {
          email:'',
          pass: '',
          username: '',
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
body{
  background-image: url('../../assets/image/user/image/login-back.png');
}
.login{
  height:100%
}
.login-card{
  display: block;
  width:40%px;
  margin-top:9%;
  margin-left:55%;
  margin-right:10%;
  padding-left:1%;
  padding-right:1%;
  padding-top:1%
}
.el-tabs__item{
  width: 70px;
  font-size: 17px;
}
element.style {
    width: 53px;
    transform: translateX(0px);
    margin-left: 20px;
}
.el-form-item__label{
  text-align:center;
  width:50px;
  font-size: 16px;
}
.login-form{
  margin-top:15px;
}
.right-button{
  text-align:right;
}
.login-logo{
  height:250px;
}
</style>
<template>
  <div class="login">
    <el-card class="login-card" style="text-align:center">
      <img class="login-logo" src="../../assets/image/user/image/logoT.png">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginRuleForm" status-icon :rules="loginRules" ref="loginRuleForm" label-width="100px" class="demo-ruleForm login-form">
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="loginRuleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginRuleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="right-button">
              <el-button type="primary" @click="loginSubmitForm('loginRuleForm')">登录</el-button>
              <el-button @click="resetForm('loginRuleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="signup">
          <el-form :model="signRuleForm" status-icon :rules="signRules" ref="signRuleForm" label-width="100px" class="demo-ruleForm login-form">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="signRuleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="signRuleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="signRuleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="right-button">
              <el-button type="primary" @click="signSubmitForm('signRuleForm')">注册</el-button>
              <el-button @click="resetForm('signRuleForm')">重置</el-button>
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
    var validateSignUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.signRuleForm.email !== '') {
          this.$refs.signRuleForm.validateField('email');
        }
        callback();
      }
    };
    var validateSignEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (this.signRuleForm.pass !== '') {
          this.$refs.signRuleForm.validateField('pass');
        }
        callback();
      }
    };
    var validateSignPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateLoginEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (this.loginRuleForm.pass !== '') {
          this.$refs.loginRuleForm.validateField('pass');
        }
        callback();
      }
    };
    var validateLoginPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'login',
      signRuleForm: {
        email:'',
        pass: '',
        username: '',
      },
      signRules: {
        email: [
          { validator: validateSignEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validateSignPass, trigger: 'blur' }
        ],
        username: [
          { validator: validateSignUsername, trigger: 'blur' }
        ],
      },
      loginRuleForm: {
        email:'',
        pass: '',
      },
      loginRules: {
        email: [
          { validator: validateLoginEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validateLoginPass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    loginSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var result;
          this.$axios.post('/apis/user/login/', {
          params: {
            u_email: this.loginRuleForm.email,
            u_password: this.loginRuleForm.pass,
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          }).then(res => {
            result = res.data.status
            if(result == 0){
            this.$router.push("/search");
          }
            else{
              this.$alert('用户名或密码错误', '登录失败', {
                confirmButtonText: '确定',
              });
            }
          })
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    signSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$alert('注册成功，请登录', '注册成功', {
            confirmButtonText: '确定',
          });
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
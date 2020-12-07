<template>
    <div>
<!--        <div>-->
<!--            <new-navigation></new-navigation>-->
<!--        </div>-->
        <div class="information">
            <el-card class="info" style="padding-top:20px; text-align:center">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-row>
                            <img class="avatar-img" src="../../assets/image/user/image/avatar.jpg">
                        </el-row>
                        <el-row>
                            <el-button type="default" style="margin-top:30px">上传头像<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="18">
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="text-align:left;">
                            <el-form-item label="用户名">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="formLabelAlign.email"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="formLabelAlign.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="所属机构">
                                <el-input v-model="formLabelAlign.inst"></el-input>
                            </el-form-item>
                            <el-form-item label="头衔">
                                <el-input v-model="formLabelAlign.title"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">更新信息</el-button>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px" style="text-align:left;">
                            <el-form-item label="原密码" prop="oldPass">
                                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="pass">
                                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitPW('ruleForm')">更新密码</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="personPage">
                门户界面
            </el-card>
        </div>
    </div>

</template>

<script>
    import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
    name: 'Information',
    components: {
      NewNavigation,
    },
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          email: '',
          gender: '',
          inst:'',
          title:'',
        },
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      submitPW(formName) {
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
.personInfo{
    margin-right: 3%;
}
.el-form{
    margin-right: 100px;
}
.personPage{
    margin-top: 30px;
}
.avatar-img{
  height:150px;
  border-radius:75px;
}
</style>
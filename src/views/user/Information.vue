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
                            <img class="avatar-img" :src="formLabelAlign.avatar">
                        </el-row>
                        <el-row>
                            <el-button type="default" style="margin-top:30px">上传头像<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="18">
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="text-align:left;margin-bottom:24px">
                            <el-form-item label="用户名">{{formLabelAlign.name}}
                                <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
                            </el-form-item>
                            <el-form-item label="邮箱">{{formLabelAlign.email}}
                                <!-- <el-input v-model="formLabelAlign.email"></el-input> -->
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="formLabelAlign.phone"></el-input>
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
                            <el-form-item label="个人简介">
                                <el-input v-model="formLabelAlign.bio"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="updateInfo()">更新信息</el-button>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px" style="text-align:left;margin-top:24px">
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
            <div style="text-align:right;margin-top:1%"><el-button type="primary">进入门户 →</el-button></div>
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
      user_id:0,
      formLabelAlign: {
        name: '',
        email: '',
        gender: '',
        inst:'',
        title:'',
        phone: '',
        bio: '',
        birthday: '',
        addr: '',
        avatar:require('../../assets/image/user/image/avatar.jpg'),
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
      is_author:0,
      author_id:0,
      is_admin:0,
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    submitPW(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result
          this.$axios.post('/apis/user/modifypassword', {
            oldpassword: this.ruleForm.oldPass,
            newpassword: this.ruleForm.pass,
            newpassword2: this.ruleForm.pass,
          }).then(res => {
            result = res.data.status
            if(result !== 0){
              this.$alert(res.data.message, '更改密码失败', {
                confirmButtonText: '确定',
              });
            }
            else{
              this.$alert("修改成功", '更改密码成功', {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init() {
      let result
      this.$axios.post('/apis/personality/get', {
      }).then(res => {
        result = res.data.status
        console.log(res);
        if(result !== 0){
          this.$alert('网络请求错误', '加载失败', {
            confirmButtonText: '确定',
          });
        }
        else{
          this.formLabelAlign.name=res.data.username
          this.formLabelAlign.email=res.data.email
          this.formLabelAlign.inst=res.data.org
          this.formLabelAlign.gender=res.data.gender
          this.formLabelAlign.title=res.data.postion
          this.formLabelAlign.phone=res.data.phone
          this.formLabelAlign.bio=res.data.bio
          this.is_author=res.data.is_associated
          this.author_id=res.data.author_id
          this.user_id=res.data.userid
          this.formLabelAlign.birthday=res.data.birthday
          this.formLabelAlign.addr=res.data.addr
          this.is_admin=res.data.is_admin
        }
      })
    },
    updateInfo() {
      let result
      console.log(this.formLabelAlign.phone)
      this.$axios.post('/apis/personality/change', {
        phone: this.formLabelAlign.phone,
        avatar: this.formLabelAlign.avatar,
        bio: this.formLabelAlign.bio,
        userid: this.user_id,
        birthday: this.formLabelAlign.birthday,
        address: this.formLabelAlign.addr,
        org: this.formLabelAlign.inst,
        position: this.formLabelAlign.title,
        gender: this.formLabelAlign.gender,
        is_administrator: this.is_admin,
        is_associated: this.is_associated,
        author_id: this.author_id
      }).then(res => {
        result = res.data.status
        console.log(res.data.message)
        if(result !== 0){
          this.$alert('网络请求错误', '更新失败', {
            confirmButtonText: '确定',
          });
        }
        else{
        }
      })
    }
  }
}
</script>

<style>
.el-divider-wide{
  margin:24px,0px;
}
.personInfo{
    margin-right: 3%;
    margin-bottom: 1%;
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
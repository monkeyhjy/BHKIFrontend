<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div class="following">
      <el-card class="followList">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="关注用户" name="user">
            <div class="following-main" v-for="item in u_following" :key="item.author_id">
              <div class="following-block">
                <el-row>
                  <el-col :span="3">
                    <el-avatar :size="100" :src="circleUrl"></el-avatar>
                  </el-col>
                  <el-col :span="18">
                    <div class="following-content">
                      <h3>{{item.name}}</h3>
                      <p>{{item.title}}, {{item.institution}} | {{item.email}}</p>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="onsubmit()">取消关注</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关注机构" name="institution">
            <div class="following-main" v-for="item in i_following" :key="item.institution_id">
              <div class="following-block">
                <el-row>
                  <el-col :span="3">
                    <div class="following-icon-wrap"><i class="el-icon-office-building following-icon"></i></div>
                  </el-col>
                  <el-col :span="18">
                    <div class="following-content">
                      <h3>{{item.name}}</h3>
                      <p>{{item.addr}}</p>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="onsubmit()">取消关注</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>

</template>

<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: 'Following',
  components: {
    NewNavigation,
  },
    data() {
      return {
        activeName: 'user',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        // institutionURL:url("../icons/institution.png"),
        u_following:[
          {
            author_id:0,
            name:"Zhang Manwei",
            title:"student",
            institution:"Beihang University",
            email:"shinyano@sina.com",
          },
          {
            author_id:1,
            name:"Another",
            title:"student",
            institution:"Beihang University",
            email:"example@sina.com",
          },
        ],
        i_following:[
          {
            institution_id:0,
            name:"Inst1",
            addr:"address1,hweoudhew,nefow"
          },
          {
            institution_id:1,
            name:"Inst2",
            addr:"address2,hweoudhew,nefow"
          }
        ],
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onsubmit(){
        console.log("submit");
      }
    }
}
</script>

<style>
h2,h3{
  margin-top: 10px;
  margin-bottom:8px;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-end: 0em;
  margin-inline-start: 0em;
}
.following{
    margin-right: 3%;
}
.el-form{
    margin-right: 100px;
}
.personPage{
    margin-top: 30px;
}
.followList{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
}
.following-main{
  margin-top:10px;
}

.following-block{
  padding-top:0px;
}
.following-content{
  text-align: left;
  padding-left:10px;
}
/* .following_user
.following-block:after {
    display: block;
    content: "";
    border-bottom: 1px dashed #979797;
    width: calc(100% - 144px);
    position: absolute;
    bottom: 0;
} */
.following-icon{
  color:#df5747;
  height:100;
}
.following-icon-wrap{
  font-size:100px;
  height: 104px;
}
</style>
<template>
  <div>
    <div>
      <new-navigation></new-navigation>
      <div class='userInfo'>
        <el-card class="user-blogs">
          <el-row :gutter="40">
            <el-col :span="4" style="text-align: center;">
              <img class="avatar-img" :src="user_avatar"><br/>
              <h2 class="profile-username">{{user_name}}</h2>
              <el-divider class="black-divider"></el-divider>
              <p>{{user_email}}</p>
              <p>{{user_title}}<span v-show="user_title && user_institution"> | </span>{{user_institution}}</p>
              <p><el-button type="primary" v-show="!is_currentUser & !followed" @click="follow()">关注</el-button></p>
              <p><el-button type="default" v-show="!is_currentUser & followed" @click="unfollow()">取消关注</el-button></p>
            </el-col>
            <el-col :span="20">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="发布的帖子" name="publish" class="blog-pane">
                    <div v-show="!publishValid" style="text-align:center;margin-top:100px">没有发布的帖子</div>
                    <div class="published-blogs" v-for="item in published" :key="item.id">
                      <div class="following-block">
                        <div class="following-content" style="text-align: left;">
                          <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+user_id+'/'+item.id"><h2>{{item.name}}</h2></el-link>
                          <el-row>
                            <el-col :span="1">
                              <img :src="user_avatar" class="inline-avatar">
                            </el-col>
                            <el-col :span="23" class="bloginfo-block">
                              <el-col :span="18" style="text-align: left;" class="limit-text-length blog-info-p"><el-link :underline="false">{{user_name}}</el-link> | {{item.date}} | {{item.content}}</el-col>
                              <el-col :span="6" style="text-align: right;" class="limit-text-length blog-info-p">阅读：{{item.readnum}} | 点赞：{{item.likenum}} | 评论：{{item.tipnum}}</el-col>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                      <el-divider class="inline-divider"></el-divider>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="收藏的帖子" name="collect" class="blog-pane">
                    <div v-show="!collectValid" style="text-align:center;margin-top:100px">没有收藏的帖子</div>
                    <div class="collected-blogs" v-for="item in collected" :key="item.id">
                      <div class="collected-block">
                        <div class="following-content" style="text-align: left;">
                          <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+user_id+'/'+item.id"><h2>{{item.name}}</h2></el-link>
                          <el-row>
                            <el-col :span="1">
                              <img :src="item.avatar" class="inline-avatar">
                            </el-col>
                            <el-col :span="23" class="bloginfo-block">
                              <el-col :span="18" style="text-align: left;" class="limit-text-length blog-info-p"> <el-link :underline="false">{{item.author}}</el-link> | {{item.date}} | {{item.content}}</el-col>
                              <el-col :span="6" style="text-align: right;" class="limit-text-length blog-info-p">阅读：{{item.readnum}} | 点赞：{{item.likenum}} | 评论：{{item.tipnum}}</el-col>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                      <el-divider class="inline-divider"></el-divider>
                    </div>
                  </el-tab-pane>
                </el-tabs>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name:'UserInfo',
  components: {
    NewNavigation,
  },
  data() {
    return {
      publishValid:false,
      collectValid:false,
      followed:false,
      is_currentUser:false,
      activeName: 'publish',
      user_id: 0,
      user_name: "Zhang Manwei",
      user_email:"shinyano@sina.com",
      user_institution: "Beihang University",
      user_title: "student",
      user_avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      published:[
        // {
        //   id:123,
        //   name:"A blog published by whatever",
        //   content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
        //   date:"2020年1月1日",
        //   readnum:12,
        //   likenum:12,
        //   tipnum:12
        // },
      ],
      collected:[
        // {
        //   id:123,
        //   name:"A blog published by whatever",
        //   author:"Zhang Manwei",
        //   avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
        //   date:"2020年1月1日",
        //   readnum:12,
        //   likenum:12,
        //   tipnum:12
        // },
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.user_id=this.$route.params.userId
      this.$axios.post('/apis/user/getstatus').then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('登录状态请求失败')
          return
        }
        if(this.user_id == res.data.userid){
          this.is_currentUser=true
          this.user_name = res.data.username
          this.user_email=res.data.email
          if(res.data.avatar != ""){
            this.user_avatar=res.data.avatar
          }
        }
      });

      this.$axios.post('/apis/personality/get_other',{
        userid:this.user_id
      }).then(res => {
        // console.log(res)
        if(res.data.status != 0){
          console.log('获取用户信息失败')
          return
        }
        if(!this.is_currentUser){
          this.user_name = res.data.username
          this.user_email=res.data.email
          if(res.data.avatar != ""){
            this.user_avatar=res.data.avatar
          }
        }
        this.user_institution=res.data.org
        this.user_title=res.data.position
      })

      this.$axios.post('/apis/user/get_follow_state',{
        userid:this.user_id
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('关注状态请求失败')
          return
        }
        this.followed=res.data.is_follow
      });

      this.$axios.post('/apis/blog/getuserblogs',{
        id:this.user_id
      }).then(res => {
        // console.log(res)
        if(res.data.status != 0){
          console.log('获取发布帖子失败')
          return
        }
        // var blogList = [];
        var i;
        var result = res.data.data.list;
        var avatarItem;
        for(i=0;i<result.length;i++){
          this.publishValid=true;
          // TODO: 查询所有用户头像
          // this.$axios.post().then(res => {})
          this.published.push(
            {
          //     id:1234,
          // name:"A blog published by whatever",
          // content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          // date:"2020年1月1日",
          // readnum:12,
          // likenum:12,
          // tipnum:12
              id: result[i].blogid,
              name: result[i].title,
              content: result[i].textcontent,
              date: result[i].date,
              readnum: result[i].readnum,
              likenum: result[i].likenum,
              tipnum: result[i].tipnum,
            }
          );
        }
      })

      this.$axios.post('/apis/blog/collectbloglist', {
        userid:this.user_id
      }).then(res => {
        // console.log(res)
        // console.log(res.data.status)
        if(res.data.status !== 0 ){
          console.log("请求收藏帖子列表失败");
          return
        }
        var i;
        var result = res.data.data.list;
        var avatarItem='';
        var read=0, like=0, tip=0;
        for(i=0;i<result.length;i++){
          this.collectValid=true;
          // TODO: 查询所有用户头像
          this.$axios.post('/apis/personality/get_other',{
            userid:result[i].authorid
          }).then(res => {
            if(res.data.status !== 0 ){
              console.log("请求头像失败");
              return
            }
            avatarItem = res.data.avatar
          })
          this.$axios.post('/apis/blog/getbloginfo',{
            id:result[i].blogid
          }).then(res => {
            if(res.data.status !== 0 ){
              console.log("请求帖子数据失败");
              return
            }
            read=res.data.data.readnum
            like=res.data.data.likenum
            tip=res.data.data.tipnum
          })
          this.collected.push(
            {
          //     id:123,
          // name:"A blog published by whatever",
          // author:"Zhang Manwei",
          // avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          // content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          // date:"2020年1月1日",
          // readnum:12,
          // likenum:12,
          // tipnum:12
              id: result[i].blogid,
              name: result[i].title,
              author: result[i].author,
              avatar:avatarItem,
              content: result[i].content,
              date: result[i].created,
              readnum: read,
              likenum: like,
              tipnum: tip
            }
          );
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    follow() {
      this.followed=true;
      this.$axios.post('/apis/user/change_follow_state',{
        userid: this.user_id
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('关注状态切换失败')
          return
        }
      });
    },
    unfollow() {
      this.followed=false;
      this.$axios.post('/apis/user/change_follow_state',{
        userid: this.user_id
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('关注状态切换失败')
          return
        }
      });
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
.limit-text-length{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inline-divider {
    margin: 24px 0;
}
.userInfo{
    margin-left:5%;
    margin-right:5%;
    margin-top:1%;
}
.avatar-img{
  height:150px;
  width:150px;
  border-radius:75px;
}
.profile-username{
    color: #ce3524;
}
.user-blogs{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
}
.blog-pane{
  margin-left: 50px;
  margin-right: 50px;
}
.bloginfo-block{
  padding-top:5px;
}
.blog-info-p{
  font-size: 0.9em;
}
.inline-avatar{
    margin-right:5px;
    height:30px;
    width:30px;
    border-radius:15px;
}
.el-link.el-link--default{
  color:#303133;
}
.el-link.el-link--default:hover {
    color: #ce3524;
}
</style>
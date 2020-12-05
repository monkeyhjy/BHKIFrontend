<template>
  <div class='userInfo'>
    <el-row :gutter="20">
      <el-col :span="4" style="text-align: center;">
        <img class="avatar-img" src="../../assets/image/user/image/avatar.jpg"><br/>
        <h2 class="profile-username">{{user_name}}</h2>
        <el-divider></el-divider>
        <p>{{user_email}}</p>
        <p>{{user_title}} | {{user_institution}}</p>
        <p><el-button type="primary">关注</el-button></p>
      </el-col>
      <el-col :span="20">
        <el-card class="user-blogs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="ta发布的帖子" name="publish" class="blog-pane">
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
            <el-tab-pane label="ta收藏的帖子" name="collect" class="blog-pane">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'UserInfo',
  data() {
    return {
      activeName: 'publish',
      user_id: 0,
      user_name: "Zhang Manwei",
      user_email:"shinyano@sina.com",
      user_institution: "Beihang University",
      user_title: "student",
      user_avatar: require("../../assets/image/user/image/avatar.jpg"),
      published:[
        {
          id:123,
          name:"A blog published by whatever",
          content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          date:"2020年1月1日",
          readnum:12,
          likenum:12,
          tipnum:12
        },
        {
          id:1234,
          name:"A blog published by whatever",
          content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          date:"2020年1月1日",
          readnum:12,
          likenum:12,
          tipnum:12
        },
      ],
      collected:[
        {
          id:123,
          name:"A blog published by whatever",
          author:"Zhang Manwei",
          avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          date:"2020年1月1日",
          readnum:12,
          likenum:12,
          tipnum:12
        },
        {
          id:1234,
          name:"A blog published by whatever",
          author:"Zhang Manwei",
          avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          content:"A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever A blog published by whatever ",
          date:"2020年1月1日",
          readnum:12,
          likenum:12,
          tipnum:12
        },
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.user_id=this.$route.params.userId
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
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
}
.avatar-img{
  height:150px;
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
    margin-right:10px;
    height:30px;
    border-radius:15px;
}
.el-link.el-link--default{
  color:#303133;
}
.el-link.el-link--default:hover {
    color: #ce3524;
}
</style>
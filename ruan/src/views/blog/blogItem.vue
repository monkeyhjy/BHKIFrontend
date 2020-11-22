<template>
<div style="left:0px;background-color:#f6f8fa">
    <el-dialog
  title="举报"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  center>
  <el-input
  type="textarea"
  :autosize="{ minRows: 1, maxRows: 4}"
  placeholder="请输入内容"
  v-model="jubao">
</el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false;jubao=''">取 消</el-button>
    <el-button type="primary" @click="ju(jubao)">确 定</el-button>
  </span>
</el-dialog>
 <el-dialog
  title="举报"
  :visible.sync="dialogVisible2"
  width="30%"
  center>
  <el-input
  type="textarea"
  :autosize="{ minRows: 1, maxRows: 4}"
  placeholder="请输入内容"
  v-model="jubaotip">
</el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false;jubaotip=''">取 消</el-button>
    <el-button type="primary" @click="jutip(jubaotip)">确 定</el-button>
  </span>
</el-dialog>
    <el-row :gutter="20">
  <el-col :span="4">
        <el-card shadow="never">
                    <div class="flex6">
                        <el-image style="width:40px;height:40px;border-radius:40px" :src="userimg" fit="fill"></el-image>
                        <a :href="userid" style="margin-left:10px">{{username}}</a>    
                    </div>
                            <div class="flex6" style="margin-top:15px">
                            <div v-for="(item,index) in userlist" :key="index" style="margin-right:4px">
                                <p style="font-size:14px;text-align:center">{{ item.num }}</p>
                                <p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
                            </div>
                            </div>
                </el-card>
        <el-card shadow="never">
            <h1 style="font-size:14px;font-weight:900">热门文章</h1>
             <ul v-for="(item,index) in userhotlist" :key="index">
                <li style="margin-top:5px;margin-left:10px;margin-bottom:10px">
                    <a :href="userid+item.id" style="font-size:12px;font-weight:500;color:gray">{{ item.name }}<i class="el-icon-place" style="margin-left:15px">阅读量{{ item.readnum }}</i></a>
                </li>
             </ul>
        </el-card>
  </el-col>
  <el-col :span="18">
      <div style="background:white;padding:20px">
          <h1>{{ blogname }}</h1>
      <p>{{ blogcontent }}</p>
      <div class="flex6">
            <el-button v-show="like==1" @click="checklike(0)">点赞</el-button>
             <el-button v-show="like==0" @click="checklike(1)">取消点赞</el-button>
            <el-button @click="dialogVisible = true">举报</el-button>
                <i class="el-icon-place">阅读量{{ readnum }}</i>
                <i class="el-icon-place">评论量{{ tipnum }}</i>
                <i class="el-icon-place">点赞量{{ likenum }}</i>
      </div>
      </div>
      <div style="background:white;padding:20px;margin-top:10px">
      <div class="flex6">
         <el-input type="textarea" style="width:90%" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
         <el-button style="height:100%" @click="sendtip(textarea1)">发送</el-button>
      </div>
      <div style="margin-top:20px">
           <ul v-for="(item,index) in tiplist" :key="index">
                <li style="margin-top:5px;margin-left:10px;margin-bottom:10px">
                    <div class="flex6">
                        <a :href="item.userid" style="margin-top:4px">
                            <el-image style="width:30px;height:30px;border-radius:30px" :src="item.img" fit="fill"></el-image>
                        </a>
                    <p style="width:80%;margin-left:15px">{{ item.name }}：{{ item.content }}</p>
                    <i class="el-icon-place" @click="tipid=item.id;dialogVisible2 = true">举报</i>
                    </div>
                 <el-divider></el-divider>    
                </li>
             </ul>
      </div>
      </div>
     
      <div style=";margin-top:10px">
          <el-card shadow="never">
               <ul v-for="(item,index) in hotbloglist" :key="index">
                <li style="margin-top:5px;margin-left:10px">
                    
    <div>
                        <div class="flex6">
                            <a :href="item.userid+item.blogid" style="width:70%">
                        <h1 style="font-size:20px">{{ item.blogname}}</h1>
                            </a>  
                         <i class="el-icon-place">阅读量{{ item.readnum }}</i>
                        </div>
                        
                        <div class="flex6">
                            <p style="width:50%;padding-left:15px;white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">{{ item.content}}</p>
                             
                          <i class="el-icon-place">评论量{{ item.tipnum}}</i>
                          <i class="el-icon-place">点赞量{{ item.likenum}}</i>
                        </div>
                    </div>
               <el-divider></el-divider>   
                    
                </li>
            </ul>
          </el-card>
              
      </div>
  </el-col>
</el-row>
</div>
</template>


<script>

export default {
  name: "BlogItem",

  data(){
      return{
          dialogVisible: false,
          dialogVisible2:false,
          jubao:"", 
          jubaotip:"",
          textarea1:"",
          tipid:23,
        userimg:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        username:"是哈哈呀",
        userlist:[{num:123,tip:"贴子"},{num:123,tip:"获赞"},{num:123,tip:"评论"},],
        userid:0,
        userhotlist:[
            {name:"sda",id:212,readnum:12}
        ],
        blogid:2,
        type:1,
        blogname:"努力写编译无所畏惧",
        blogcontent:"富文本编辑器还没弄",
        readnum:23,
        tipnum:23,
        likenum:123,
        like:0,
        tiplist:[{id:213,userid:123,name:"423",img:"213",content:"324"}],
        hotbloglist:[
            {blogname:"java冲啊",blogid:231,content:"内容",userid:123,readnum:1,likenum:34,tipnum:34,}
        ]
      }
  },
    mounted(){
        this.userid=this.$route.params.userid;
        this.blogid=this.$route.params.blogid;
    //获取博客主信息
     this.$axios.post('http://182.92.239.145/apis/blog/getUserBlogInfo',
              this.qs.stringify({
                id:this.id
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.userid=res.data.id;
                this.userimg=res.data.img;
                this.username=res.data.name;
                this.type=res.data.type;
                this.userlist=[{num:res.data.blogNum,tip:"贴子"},{num:res.data.likeNum,tip:"获赞"},{num:res.data.tipNum,tip:"评论"},]
                //获取这种类型的相关博客
     this.$axios.post('http://182.92.239.145/apis/blog/gethotblogs',
              this.qs.stringify({
                type:this.type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.hotbloglist=res.data.list
                })
    })
       //获取博客主热门帖子信息
     this.$axios.post('http://182.92.239.145/apis/blog/getUserHotBlog',
              this.qs.stringify({
                id:this.userid
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.userhotlist=res.data.list
            })
     //获取博客信息
     this.$axios.post('http://182.92.239.145/apis/blog/getUserHotBlog',
              this.qs.stringify({
                id:this.blogid
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.blogname=res.data.name;
                this.blogcontent=res.data.content;
                this.readnum=res.data.readnum;
                this.tipnum=res.data.tipnum;
                this.likenum=res.data.likenum;
                this.like=res.data.like;
                this.tiplist=res.data.tiplist;
            })
  },
  methods:{
      checklike(type){
        //点赞 取消点赞
     this.$axios.post('http://182.92.239.145/apis/blog/setbloglike',
              this.qs.stringify({
                id:this.blogid,
                type:type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    this.like=type
                }
            })  
      },
      ju(text){
          //举报
     this.$axios.post('http://182.92.239.145/apis/blog/jubaoblog',
              this.qs.stringify({
                id:this.blogid,
                text:text
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    <el-alert
    title="举报成功"
    type="success">
  </el-alert>
                }
                else{
                     <el-alert
    title="举报失败"
    type="warning">
  </el-alert>
                }
            })  
          this.dialogVisible = false;
          this.jubao="";
      },
      jutip(text){
           //举报评论
     this.$axios.post('http://182.92.239.145/apis/blog/jubaotip',
              this.qs.stringify({
                id:this.tipid,
                text:text
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    <el-alert
    title="举报成功"
    type="success">
  </el-alert>
                }
                else{
                     <el-alert
    title="举报失败"
    type="warning">
  </el-alert>
                }
            })  
          this.dialogVisible2 = false;
          this.jubaotip="";
      },
      sendtip(text){
            //评论
     this.$axios.post('http://182.92.239.145/apis/blog/pinglunblog',
              this.qs.stringify({
                id:this.blogid,
                text:text
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    <el-alert title="评论成功" type="success"></el-alert>
                    var tip={id:res.data.id,userid:res.data.userid,name:res.data.name,img:res.data.img,content:text};
                    this.tiplist.splice(0,0,tip);
                }
                else{
                     <el-alert title="评论失败" type="warning"> </el-alert>
                }
            })  
          this.textarea1="";
      }
  }
}
</script>
<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

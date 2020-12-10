<template>
  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <div>
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
      <el-row>
        <el-col :span="4">
          <el-card shadow="never">
            <div class="flex6">
              <el-image style="width:40px;height:40px;border-radius:40px" :src="userimg" fit="fill"></el-image>
              <el-link class="blog-title" :underline="false" :href="'/userinfo/'+userid" style="margin-left:10px">{{username}}</el-link>
            </div>
            <div class="flex6" style="margin-top:15px;margin-bottom:15px">
              <div v-for="(item,index) in userlist" :key="index" style="margin-right:13px">
                <p style="font-size:14px;text-align:center">{{ item.num }}</p>
                <p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
              </div>
            </div>
            <el-button type="primary" v-show="follow==0" @click="changeFollow(1)">关注</el-button>
            <el-button type="primary" v-show="follow==1" @click="changeFollow(0)">取消关注</el-button>


          </el-card>
          <el-card shadow="never" style="margin-top:30px">
            <h1 style="font-size:14px;font-weight:900">热门文章</h1>
            <ul v-for="(item,index) in userhotlist" :key="index">
              <li style="margin-top:5px;margin-left:10px;margin-bottom:10px" class="flex6">
                <el-link class="blog-title" :underline="false" :href="'/blogItem/'+userid+'/'+item.id" style="font-size:12px;font-weight:500;color:gray;margin-right:5px">{{ item.name }}

                </el-link>
                <i class="flex6 iconsize">
                  <svg class="icon color_deep iconmargin" aria-hidden="true">
                    <use xlink:href="#icon-yueduliang" ></use>
                  </svg>
                  <i class="iconcolor" >{{ item.readnum }} </i></i>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="1" class="grid-content"></el-col>
        <el-col :span="17">
          <div style="background:white;padding:20px">
            <h1>{{ blogname }}</h1>
            <div class="flex6">
              <el-button style="margin-right:30px">{{ chose[type].name }} </el-button>
              <span class="flex6 iconsize">
                                <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-yueduliang" ></use>
                                </svg>
                               <span class="iconcolor"> 阅读量{{ readnum }} |</span></span>
              <span class="flex6 iconsize ">
                            <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-pinglun" ></use>
                                </svg>
                            <span class="iconcolor">评论量{{ tipnum }} |</span></span>
              <span class="flex6 iconsize ">
                             <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-buoumaotubiao15" ></use>
                              </svg>
                           <span class="iconcolor"> 点赞量{{ likenum }} </span></span>
              <el-button type="text" @click="checkstar(1)" v-show="star==0" class="flex6">
                <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
                <span style="color:gray;margin-left:10px">已收藏</span>
              </el-button>
              <el-button type="text" @click="checkstar(0)" v-show="star==1">
                         <span class="flex6">
                          <svg class="icon color_middle iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-shoucang"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  收藏</span>
                         </span>
              </el-button>
              <el-button type="text" @click="checklike(0)" v-show="like==1">
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-buoumaotubiao15"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  点赞</span>
                         </span>
              </el-button>
              <el-button type="text" @click="checklike(1)" v-show="like==0">
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-xihuan"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  已点赞</span>
                         </span>
              </el-button>
              <el-button type="text" @click="dialogVisible = true" >
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-report"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  举报</span>
                         </span>
              </el-button>
            </div>
            <p v-html="htmlcontent"></p>
          </div>
          <div style="background:white;padding:20px;margin-top:10px">
            <div class="flex6">
              <el-input type="textarea" style="width:90%" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
              <el-button type="text" style="height:100%;margin-left:10px" @click="sendtip(textarea1)" >
                <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                  <use xlink:href="#icon-fasong" ></use>
                </svg>
              </el-button>
            </div>
            <div style="margin-top:20px">
              <ul v-for="(item,index) in tiplist" :key="index">
                <li style="margin-top:5px;margin-left:10px;margin-bottom:10px">
                  <div class="flex6" >
                    <div class="flex6">
                      <el-image style="width:40px;height:40px;border-radius:40px" :src="item.img" fit="fill"></el-image>
                      <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid" style="margin-left:10px">{{ item.name }} :</el-link>
                    </div>
                    <p style="width:80%;margin-left:15px">{{ item.content }}</p>
                    <el-button type=text @click="tipid=item.id;dialogVisible2 = true">
                      <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                        <use xlink:href="#icon-report" ></use>
                      </svg>
                    </el-button>
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
                      <el-link class="blog-title" :underline="false"  :href="'/BlogItem/'+item.userid+'/'+item.blogid" style="width:70%;justify-content:left">
                        <h1 style="font-size:20px;justify-content:left">{{ item.blogname}}</h1>
                      </el-link>
                      <div class="flex6">
                              <span class="flex6 iconsize">
                                <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-yueduliang" ></use>
                                </svg>
                               <span class="iconcolor"> 阅读量{{ item.readnum }} |</span></span>
                        <span class="flex6 iconsize ">
                            <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-pinglun" ></use>
                                </svg>
                            <span class="iconcolor">评论量{{ item.tipnum }} |</span></span>
                        <span class="flex6 iconsize ">
                             <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-buoumaotubiao15" ></use>
                              </svg>
                           <span class="iconcolor"> 点赞量{{ item.likenum }} </span></span>
                      </div>
                    </div>

                    <div class="flex6">
                      <p style="width:50%;padding-left:15px;white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">{{ item.textcontent }}</p>

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
  </div>

</template>


<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";
export default {
  name: "BlogItem",
  components: {
    NewNavigation,
  },
  data(){
      return{
          dialogVisible: false,
          dialogVisible2:false,
          jubao:"", 
          jubaotip:"",
          textarea1:"",
          tipid:23,
          follow:1,
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
        htmlcontent:"<h2>富文本编辑器还没弄</h2>",
        readnum:23,
        tipnum:23,
        likenum:123,
        like:0,
        tiplist:[{id:213,userid:123,name:"423",img:"213",content:"324"}],
        hotbloglist:[
            {blogname:"java冲啊",blogid:231,textcontent:"内容",userid:123,readnum:1,likenum:34,tipnum:34,}
        ],
        chose:[
          {name:"全部",type:0},{name:"计算机",type:1}
        ],
        star:1
      }
  },
    mounted(){
        this.userid=this.$route.params.userid;
        this.blogid=this.$route.params.blogid;
    //获取博客主信息
     this.$axios.post('/apis/blog/getUserBlogInfo',
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
     this.$axios.post('/apis/blog/gethotblogs',
              this.qs.stringify({
                type:this.type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.hotbloglist=res.data.list
                })
    })
    //获取关注状态
        //获取这种类型的相关博客
     this.$axios.post('',
              this.qs.stringify({
                u_id:this.id
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.follow=res.data.result
                })
       //获取博客主热门帖子信息
     this.$axios.post('/apis/blog/getUserHotBlog',
              this.qs.stringify({
                id:this.userid
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.userhotlist=res.data.list
            })
     //获取博客信息
     this.$axios.post('/apis/blog/getBlogInfo',
              this.qs.stringify({
                id:this.blogid
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.blogname=res.data.name;
                this.htmlcontent=res.data.htmlcontent;
                this.readnum=res.data.readnum;
                this.tipnum=res.data.tipnum;
                this.likenum=res.data.likenum;
                this.like=res.data.like;
                this.tiplist=res.data.tiplist;
                this.type=res.data.type,
                this.star=res.data.star
            })
  },
  methods:{
      checklike(type){
        //点赞 取消点赞
     this.$axios.post('/apis/blog/setbloglike',
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
       checkstar(type){
        //收藏 取消收藏
     this.$axios.post('/apis/blog/setblogcollect',
              this.qs.stringify({
                id:this.blogid,
                type:type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    this.star=type
                }
            })  
      },
      ju(text){
          //举报
     this.$axios.post('/apis/blog/reportblog',
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
     this.$axios.post('http://182.92.239.145/apis/blog/comment',
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
      },
      changeFollow(type){
           //切换关注状态
     this.$axios.post('',
              this.qs.stringify({
                u_id:this.id
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
               if(res.data.status==0){
                 this.follow=type
               }
            })  
      }
  }
}
</script>
<style>
body{
  background-image: url('../../assets/image/user/image/login-back.png');
}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

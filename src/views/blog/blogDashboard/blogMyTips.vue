<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div style="width:80%">
        <ul >
          <li style="margin-top:5px;margin-left:10px">
            <el-card shadow="never">
              <div  v-for="(item,index) in list" :key="index">
                <div class="flex6" >
                  <span style="font-size:12px;color:gray;margin-right:15px">{{ item.date }}</span>
                  <span style="fonr-size:13px;margin-right:15px">评论了</span>
                  <el-link class="blog-title" :underline="false" :href="'/BlogItem'+item.userid+'/'+item.blogid" style="font-size:16px">{{item.blogname }}</el-link>
                </div>
                <p>{{ item.content }}</p>
                <div class="flex6" style="margin-top:20px">
                  <span style="font-size:12px;color:gray">来自于</span>
                  <el-image
                          style="width: 30px; height: 30px;border-radius:30px"
                          :src='item.img'
                          fit="fill"></el-image>
                  <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid" style="font-size:14px;font-weight:900;margin-right:20px">{{ item.username }}</el-link>
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
                  <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>

                </div>
              </div>
            </el-card>

          </li>
        </ul>
      </div>
  </div>

</template>
<script>
  import NewNavigation from "../../navigatorandsearch/NewNavigation";
// @ is an alias to /src
export default {
  name: "BlogMyTips",
  components: {
    NewNavigation,
  },
  data(){
      return{
          list:[]

      }
  },
    mounted(){
    //获取我的评论信息
     this.$axios.post('/apis/blog/getmycomment',
              {
               
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.data.list
              })
  },
}
</script>
<style>
body{
  background-image: url('../../../assets/image/user/image/login-back.png');
}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

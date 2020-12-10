<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div style="width:80%">
      <ul>
        <li style="margin-top:5px;margin-left:10px">
          <el-card shadow="never">
            <div  v-for="(item,index) in list" :key="index">
              <div class="flex6">
                <el-link class="blog-title" :underline="false" :href="'/BlogEdit/'+id+'/'+item.id" style="max-width:80%;">
                  <h1 style="font-size:20px;white-space:nowrap;overflow: hidden; text-overflow: ellipsis;">{{ item.name }}</h1>
                </el-link>
                <el-link class="blog-title" :underline="false" style="margin-left:20px"  :href="'/BlogItem/'+id+'/'+item.id">
                  <i class="flex6">
                    <svg class="icon color_deep iconmargin"  style="font-size:20px" aria-hidden="true">
                      <use xlink:href="#icon-yueduliang" ></use>
                    </svg>查看
                  </i>
                </el-link>

              </div>
              <p style="padding-left:15px;white-space:nowrap;font-size:14px;color:black;overflow: hidden; text-overflow: ellipsis;">{{ item.textcontent }}</p>
              <div class="flex6" style="color:gray;font-size:12px">
                <span style="margin-right:15px">{{ item.date}} |</span>
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
              <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>

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
  name: "BlogMyBlog",
  components: {
    NewNavigation,
  },
  data(){
      return{
          list:[
            {id:123,name:"标题",textcontent:"content",date:"2020年1月1日",readnum:12,likenum:12,tipnum:12}
          ],
          id:2,
      }
  },
  mounted(){
    //获取我的帖子信息
     this.$axios.post('/apis/blog/getuserblogs',
              this.qs.stringify({
                id:0
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.list
                this.id=res.data.userid
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

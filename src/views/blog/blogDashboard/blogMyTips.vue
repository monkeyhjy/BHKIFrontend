<template>
      <div style="width:80%">
            <ul v-for="(item,index) in list" :key="index">
                <li style="margin-top:5px;margin-left:10px">
                   <el-card shadow="never">
                     <div class="flex6">
                       <span style="font-size:12px;color:gray">{{ item.date }}</span>
                       <span style="fonr-size:13px">评论了</span>
                       <a :href="item.userid+item.blogid" style="font-size:16px">{{item.blogname }}</a>
                     </div>
                     <p>{{ item.content }}</p>
                     <div class="flex6">
                       <span style="font-size:12px;color:gray">来自于</span>
                        <el-image
      style="width: 30px; height: 30px;border-radius:30px"
      :src='item.img'
      fit="fill"></el-image>
      <a :href="item.userid" style="font-size:14px;font-weight:900">{{ item.username }}</a>
                          <i class="el-icon-place">阅读量{{ item.readnum }}</i>
                          <i class="el-icon-place">评论量{{ item.tipnum }}</i>
                          <i class="el-icon-place">点赞量{{ item.likenum }}</i>
                     </div>
                   </el-card>
                    
                </li>
            </ul>
        </div>
</template>
<script>

// @ is an alias to /src
export default {
  name: "BlogMyTips",
  data(){
      return{
          list:[
            {date:"2020年1月1日",blogid:12,blogname:"JAVA",content:"XXXX",img:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",username:"Anna",userid:213,readnum:12,likenum:342,tipnum:2341}
          ]

      }
  },
    mounted(){
    //获取我的评论信息
     this.$axios.post('http://182.92.239.145/apis/blog/getmytips',
              this.qs.stringify({
               
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.list
              })
  },
}
</script>
<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

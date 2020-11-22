<template>
      <div style="width:80%">
            <ul v-for="(item,index) in list" :key="index">
                <li style="margin-top:5px;margin-left:10px">
                   <el-card shadow="never">
                     <div>
                        <div class="flex6">
                            <a :href="item.id" style="max-width:80%;">
                                <h1 style="font-size:20px;white-space:nowrap;overflow: hidden; text-overflow: ellipsis;">{{ item.name }}</h1>
                            </a>  
                            <a :href="id+item.id"><i class="el-icon-place">查看</i></a>
                            
                        </div>
                        <p style="padding-left:15px;white-space:nowrap;font-size:14px;color:black;overflow: hidden; text-overflow: ellipsis;">{{ item.content }}</p> 
                        <div class="flex6" style="color:gray;font-size:12px">
                          <span >{{ item.date}}</span>
                          <i class="el-icon-place">阅读量{{ item.readnum}}</i>
                          <i class="el-icon-place">评论量{{ item.tipnum}}</i>
                          <i class="el-icon-place">点赞量{{ item.likenum}}</i>
                        </div>
                    </div>
                   </el-card>
                    
                </li>
            </ul>
        </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "BlogMyBlog",
  data(){
      return{
          list:[
            {id:123,name:"标题",content:"content",date:"2020年1月1日",readnum:12,likenum:12,tipnum:12}
          ],
          id:2,
      }
  },
  mounted(){
    //获取我的帖子信息
     this.$axios.post('http://182.92.239.145/apis/blog/getpeopleblogs',
              this.qs.stringify({
                id:0
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

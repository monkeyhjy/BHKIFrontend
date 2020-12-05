<template>
        <div>
          <el-row>
  <el-col :span="18">
     <ul v-for="(item,index) in list" :key="index">
                <li style="margin-top:5px;margin-left:10px">
                     <el-card shadow="never">
    <div>
                        <div class="flex6">
                            <a :href="id+item.blogid" style="width:70%">
                                <h1 style="font-size:20px">{{ item.blogname }}</h1>
                            </a>  
                        </div>
                        
                        <div class="flex6">
                            <div > 
                                <a :href="item.userid" class="flex6">
                                 <el-image style="width:40px;height:40px;border-radius:40px" :src="item.img" fit="fill"></el-image>
                                 <p style="padding-left:15px;color:black">{{ item.username }}</p>
                                </a>  
                            </div>
                           
                            <p style="width:50%;padding-left:15px;white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">{{ item.content }}</p>
                              <i class="el-icon-place">阅读量{{ item.readnum }}</i>
                          <i class="el-icon-place">评论量{{ item.tipnum }}</i>
                          <i class="el-icon-place">点赞量{{ item.likenum }}</i>
                        </div>
                    </div>
                </el-card>
                    
                </li>
            </ul>
  </el-col>
  <el-col :span="6">
    <div class="flex6">
      <el-card shadow="never" v-for="(item,index) in types" :key="index" style="margin:10px"> 
        <span style="color:black;padding-top:-10px;font-size:13px" @click="changeType(item)"> {{ item.name }}</span>
      </el-card>
    </div>
     
    </el-col>
</el-row>
           
        </div>
</template>


<script>

// @ is an alias to /src
export default {
  name: "BlogDesktop",
  data(){
      return{
          list:[
            {blogname:"博客名字",img:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",username:"用户名字",readnum:12,likenum:12,tipnum:12,blogid:12,userid:12,content:"内容"}
          ],
          types:[{name:"全部",type:0},{name:"计算机",type:1},{name:"生物",type:2},],
          id:0
      }
  },
    mounted(){
    //获取热门帖子信息
     this.$axios.post('http://182.92.239.145/apis/blog/gethotblogs',
              this.qs.stringify({
                type:0
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.list
              })
  },
  methods:{
    changeType(item){
      alert(item.type)
       this.$axios.post('http://182.92.239.145/apis/blog/gethotblogs',
              this.qs.stringify({
                type:item.type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.list
              })
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

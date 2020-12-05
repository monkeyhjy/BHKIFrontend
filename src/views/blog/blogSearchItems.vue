<template>
    <div class="router" style="left:0px;background-color:#f6f8fa">
      <blog-search :search="search1"></blog-search>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content">
               <div class="flex6">
                <el-card shadow="hover" v-for="(item,index) in chose" :key="index" style="margin:10px">
                <p @click="choseType(item.type)" style="margin:-10px -5px">{{ item.name }}</p>
                </el-card>
            </div>
     
              <div>
                <p style="color:gray;font-size:8px;margin-bottom:20px;margin-left:20px">总共{{ list.length }}条搜索记录</p>
                <ul v-for="(item,index) in list" :key="index">
                  <li style="margin-bottom:10px">
                    <el-card class="box-card">
                      <div slot="header" >
                        <a :href="item.userid+item.blogid" style="width:70%">
                            <h1 style="font-size:20px;margin-top:-6px;;margin-bottom:-6px">{{ item.blogname }}</h1>
                        </a>  
                          <p style="margin-top:10px;font-size:15px;width:90%;padding-left:15px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">{{ item.content }}</p>                            
                      </div>
                      <div class="flex6" style="font-size:12px;color:gray">
                        <span style="margin-right:20px">{{ item.date}}</span> 
                        <span style="margin-right:20px"><a :href="item.userid" style="color:gray">{{ item.username}}</a></span>
                         <i class="el-icon-place" style="margin-right:20px">阅读量{{ item.readnum }}</i>
                          <i class="el-icon-place" style="margin-right:20px">评论量{{ item.tipnum }}</i>
                          <i class="el-icon-place" style="margin-right:20px">点赞量{{ item.likenum}}</i>
                      </div>
                    </el-card>
                  </li>
                </ul>
              </div>
            </div></el-col>
          <el-col :span="4"><div class="grid-content"></div></el-col>
</el-row>
    </div>
</template>


<script>
import blogSearch from '@/components/blogSearch'
export default {
  name: "BlogDashboard",
    components: {
      blogSearch
  },
  data(){
      return{
        search1:"",
        list:[
          {blogname:"冲啊博客",blogid:12,content:"内容",date:"2020年1月1日",username:"作者名fhg字",userid:123,readnum:231,tipnum:342,likenum:34}
        ],
        chose:[
          {name:"全部",type:0},{name:"计算机",type:1}
        ]
      }
  },
  mounted(){
    this.search1=this.$route.params.search;
        //搜索博客
     this.$axios.post('http://182.92.239.145/apis/blog/SearchBlog',
              this.qs.stringify({
                text:this.search1,
                type:0
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.list=res.data.list
            })
  },
  methods:{
    choseType(type){
        //搜索博客
     this.$axios.post('http://182.92.239.145/apis/blog/SearchBlog',
              this.qs.stringify({
                text:this.$route.params.search,
                type:type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
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

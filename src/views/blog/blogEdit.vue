<template>
    <div>
        <div>
            <new-navigation></new-navigation>
        </div>
        <el-row>
          <el-col :span="24">
             <div>
               <el-col :span="11">
                   <el-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="name"
   style="font-size:30px;position:relative;top:20px">
</el-input>
               </el-col>
               <el-col class="grid-content" :span="1"></el-col>
          <el-col :span="12">
            <h1>{{ name }}</h1>
          </el-col>
             <wang-enduit v-model="content"></wang-enduit>
        </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:16px">
           <el-col :span="15" class="grid-content"></el-col>
          <el-col :span="6">
            <span style="color:#df5746;font-size:20px;font-weight:700;margin-right:18px">文章类型:</span>
      <el-select v-model="type" placeholder="请选择">
    <el-option
      v-for="item in chose"
      :key="item.type"
      :label="item.name"
      :value="item.type">  
      <span style="float: left">{{ item.name }}</span>
    </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
                <el-button type="primary" @click="submit()">提交</el-button>
          </el-col>
        </el-row>
    </div>

</template>
<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";
import wangEnduit from "./wangEnduit";
// @ is an alias to /src
export default {
  name: "BlogEdit",
    components: {
      NewNavigation,
      wangEnduit
    },
  data(){
      return{
          name:"博客名字",
          content:"博客内容",
          type:1,
          chose:[
          {name:"计算机",type:1}, {name:"生物",type:2}
        ],

      }
  },
   mounted(){
     this.$axios.post('http://182.92.239.145/apis/blog/getBlogInfo',
              this.qs.stringify({
                id:this.$route.params.blogid
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.name=res.data.name;
                this.content=res.data.content
                this.type=res.data.type
              })
  },
  methods:{
      submit(){
        alert(this.type);
           this.$axios.post('http://182.92.239.145/apis/blog/editblog',
              this.qs.stringify({
                id:this.$route.params.blogid,
                name:this.name,
                content:this.content,
                type:this.type
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.$router.push({path:"/BlogItem/"+this.$route.params.userid+this.$route.params.blogid})
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

<template>
    <div>
    <h1>{{ name }}</h1>
    <p>{{ content }}</p>
    <p>选择类型</p>
    <el-button @click="submit()">提交</el-button> 
    </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "BlogEdit",
  data(){
      return{
          name:"博客名字",
          content:"博客内容",
          type:1

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

<template>
     <div style="height:100px;background:black"> 
            <div style="width:500px;position:absolute;left:300px">
            <el-input v-model="search" placeholder="请输入内容" >
                <el-button slot="append" icon="el-icon-search" @click="searchItem()"></el-button>
            </el-input>
        </div>
    </div>
</template>
<script>
export default {
  name: "BlogSearch",
  data(){
      return{
      
      }
  },
  props: ['search'],
  mounted(){

  },
  methods:{
      searchItem(){
       this.$router.push({path:"/BlogSearchItems/"+this.search})
      }
  }
}
</script>
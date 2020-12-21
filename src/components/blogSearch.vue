<template>
     <div style="height:100px"> 
        <div class="search d1">
	<div class="c">
		  <input type="text"  v-model="search"  placeholder="搜索从这里开始...">
		  <button   @click="searchItem()">
               <img class="navigationlogo" src="../icons/search.png" height="40" width="30"/>   
      </button>
	</div>
		</div>
    </div>
</template>
<script>
export default {
  name: "BlogSearch",
  data(){
      return{
      search:"",
      }
  },

  mounted(){

  },
  methods:{
      searchItem(){
       this.$router.push({path:"/BlogSearchItems/"+this.search})
        this.$parent.search();
      }
  }
}
</script>
<style >
  body{
          background-image: url('../assets/image/user/image/login-back.png');
    }
</style>
<template>
     <div style="height:100px"> 
        <div class="search d1">
	<div class="c" id="dd">
       
		  <el-input type="text"  v-model="search"  placeholder="搜索从这里开始..." style="border-radius:0 42px 42px 0">
      
     <el-select v-model="value" slot="prepend" placeholder="请选择" style="width: 140px;" @change="ch">
                            <el-option
                                    v-for="item in chose"
                                    :key="item"
                                    :label="item.name"
                                    :value="item.type">
                                <div @click="this.type=item.type">{{item.name}}</div>
                            </el-option>
     </el-select>
		
      </el-input> 
       <button   @click="searchItem()" style="border-radius:0 50% 50% 0">
             <svg class="icon" aria-hidden="true" style="color:white;font-size:25px;margin-left:8px">
  <use xlink:href="#icon-sousuo"></use>
</svg>

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
        chose:[{name:"全部",type:0},{name:"Python",type:1},{name:"Java",type:2},
          {name:"前端",type:3},{name:"架构",type:4},{name:"区块链",type:5},
          {name:"数据库",type:6},{name:"5G",type:7},{name:"游戏开发",type:8},
          {name:"移动开发",type:9},{name:"运维",type:10},{name:"安全",type:11},
          {name:"研发管理",type:12},{name:"物联网",type:13},{name:"其他",type:14},],
       type:0,
       value:"全部"
      }
  },

  mounted(){

  },
  methods:{
      searchItem(){
        if(this.search=="")
        alert("搜索关键词不可为空")
        else{
           this.$router.push({path:"/BlogSearchItems/"+this.type+"/"+this.search})
        this.$parent.search(this.type);
        }
      
      },
      ch(i){
        this.type=i
      }
  }
}
</script>
<style >
  body{
          background-image: url('../assets/image/user/image/login-back.png');
    }
</style>
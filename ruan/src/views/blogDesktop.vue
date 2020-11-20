<template>
    <div>
        <div style="height:100px;background:black"> 
            <div style="width:500px;position:absolute;left:300px">
            <el-input v-model="search" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        </div>
        <el-row style="margin-top:50px">
            <el-col :span="4">
                <el-card shadow="never">
                    <div class="flex6">
                        <el-image style="width:40px;height:40px;border-radius:40px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></el-image>
                        <p style="margin-left:10px">用户姓名</p>    
                    </div>
                            <div class="flex6" style="margin-top:15px">
                            <div v-for="(item,index) in [1,2,3]" :key="index" style="margin-right:4px">
                                <p style="font-size:14px;text-align:center">1183</p>
                                <p style="font-size:12px;color:grey;text-align:center">粉丝</p>
                            </div>
                            </div>
                </el-card>
                <div>
                      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="4">
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
                </div>
            </el-col>
            <el-col :span="16">
            <div >
            <ul v-for="(item,index) in [1,2,3]" :key="index">
                <li style="margin-top:5px;margin-left:10px">
                    <div>
                        <a href="https://element.eleme.io">
                            <h1 style="font-size:20px">标题</h1>
                        </a>   
                        <div class="flex6">
                            <div>
                                <a href="https://element.eleme.io">
                                 <el-image style="width:40px;height:40px;border-radius:40px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></el-image>
                                </a>
                                
                            </div>
                            <p style="white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">大致内容大致内容大致内容大致内容大致内容大致内容大致内容大致内容大致内容大致内容</p>
                            
                        </div>
                    </div>
                </li>
            </ul>
        </div>
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
        </el-row>
   
        
        
    </div>
</template>


<script>
// @ is an alias to /src
export default {
  name: "BlogDesktop",
  data(){
      return{
        search:"搜索内容",

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

<template>
  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <div class="router">
      <blog-search :search="search1"></blog-search>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content"></div></el-col>
        <el-col :span="16">
          <div class="grid-content">
            <div class="flex6">
              <el-button v-for="(item,index) in chose" :type="item.type==type?'primary':'default'"  :key="index" style="margin:10px">
                <p @click="choseType(item.type)">{{ item.name }}</p>
              </el-button>
            </div>

            <div>
              <p style="color:gray;font-size:8px;margin-bottom:20px;margin-left:20px">总共{{ list.length }}条搜索记录</p>
              <ul v-for="(item,index) in list" :key="index">
                <li style="margin-bottom:10px">
                  <el-card class="box-card">
                    <div slot="header" >
                      <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.userid+'/'+item.blogid" style="width:70%;justify-content:left">
                        <h1 style="font-size:20px;margin-top:-6px;;margin-bottom:-6px;justify-content:left">{{ item.blogname }}</h1>
                      </el-link>
                      <p style="margin-top:10px;font-size:15px;width:90%;padding-left:15px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">{{ item.textcontent }}</p>
                    </div>
                    <div class="flex6" style="font-size:12px;color:gray">
                      <span style="margin-right:20px">{{ formatDate(item.date) }}</span>
                      <span style="margin-right:20px;color:gray">作者
                          <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid"  style="font-size:15px;color:gray;margin-top:-5px">{{ item.username}}</el-link></span>
                      <span class="flex6 iconsize">
                                <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-yueduliang" ></use>
                                </svg>
                               <span class="iconcolor"> 阅读量{{ item.readnum }} |</span></span>
                      <span class="flex6 iconsize ">
                            <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-pinglun" ></use>
                                </svg>
                            <span class="iconcolor">评论量{{ item.tipnum }} |</span></span>
                      <span class="flex6 iconsize ">
                             <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-buoumaotubiao15" ></use>
                              </svg>
                           <span class="iconcolor"> 点赞量{{ item.likenum }} </span></span>
                    </div>
                  </el-card>
                </li>
              </ul>
            </div>
          </div></el-col>
        <el-col :span="4"><div class="grid-content"></div></el-col>
      </el-row>
    </div>
  </div>

</template>


<script>
import blogSearch from '@/components/blogSearch'
import NewNavigation from "../navigatorandsearch/NewNavigation";
export default {
  name: "BlogDashboard",
    components: {
      blogSearch,
      NewNavigation,
  },
  data(){
      return{
        search1:"",
        list:[ ],
        chose:[{name:"全部",type:0},{name:"Python",type:1},{name:"Java",type:2},
          {name:"前端",type:3},{name:"架构",type:4},{name:"区块链",type:5},
          {name:"数据库",type:6},{name:"5G",type:7},{name:"游戏开发",type:8},
          {name:"移动开发",type:9},{name:"运维",type:10},{name:"安全",type:11},
          {name:"研发管理",type:12},{name:"物联网",type:13},{name:"其他",type:14},],
        type:1,
      }
  },
  mounted(){
  this.search()
  },
  methods:{
     formatDate (date) {
  Date.prototype.format = function(fmt) {
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
  //假设输入的时间格式为YYYY-MM-DDTHH-mm-SS.sss
  const s = String(date)
  s.replace(/(\+d{2})(\d{2})$/, "$1:$2")
  return new Date(s).format('yyyy-MM-dd hh:mm:ss')
},
    search(){
      this.search1=this.$route.params.search;
        //搜索博客
     this.$axios.post('/apis/blog/searchblog',
             {
                text:this.search1,
                type:0
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
//console.log(res);
                this.list=res.data.data.list
                this.type=0
            })
    },
    choseType(type){
        //搜索博客
     this.$axios.post('/apis/blog/searchblog',
              {
                text:this.$route.params.search,
                type:type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
        //        console.log(res);
                this.list=res.data.data.list,
                this.type=type
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

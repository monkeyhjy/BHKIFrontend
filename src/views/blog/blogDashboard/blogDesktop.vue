<template>
  <div>

    <div>
      <el-row>
        <el-col :span="18">
          <ul>
            <li style="margin-top:5px;margin-left:10px"  >
              <el-card shadow="never">
                <div v-for="(item,index) in list" :key="index">
                  <div class="flex6" style="margin:left:0">
                    <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.userid+'/'+item.blogid" style="width:70%;justify-content: left">
                      <h2  style="font-size:20px;margin:left:0">{{ item.blogname }}</h2>
                    </el-link>
                  </div>
                  <div style=";justify-content: left">
                    <p style="#app{text-align:left};justify-content: left;width:80%;padding-left:15px;white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">{{ item.textcontent }}</p>
                  </div>
                  <el-row :gutter="20" style="margin-top:15px">
                    <el-col :span="14">
                      <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid" >
                        <div class="flex6">
                          <el-image style="width:30px;height:30px;border-radius:30px" :src="item.avatar" fit="fill"></el-image>
                          <el-link class="blog-title " :underline="false"  style="padding-left:15px">{{ item.username }}</el-link>
                        </div>
                      </el-link>
                    </el-col>

                    <el-col :span="10" class="flex6">
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
                    </el-col>
                  </el-row>
                  <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>
                </div>
              </el-card>

            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <div class="flex6">
            <el-button :type="item.type==type?'primary':''" v-for="(item,index) in types" :key="index" style="margin:10px">
              <span style="padding-top:-10px;font-size:13px" @click="changeType(item)"> {{ item.name }}</span>
            </el-button>
          </div>

        </el-col>
      </el-row>

    </div>
  </div>

</template>


<script>
  import NewNavigation from "../../navigatorandsearch/NewNavigation";
// @ is an alias to /src
export default {
  name: "BlogDesktop",
  components: {
    NewNavigation,
  },
  data(){
      return{
         list:[
            {blogname:"博客名字",avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",username:"用户名字",readnum:12,likenum:12,tipnum:12,blogid:12,userid:12,textcontent:"内容"},
          ], 
          types:[{name:"全部",type:0},{name:"计算机",type:1},{name:"生物",type:2},],
          id:0,
          type:0
      }
  },
    mounted(){

    //获取热门帖子信息
     this.$axios.post('/apis/blog/gethotblogs',
              {
                type:0
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.data.list
              })
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
    changeType(item){
       this.$axios.post('/apis/blog/gethotblogs',
              {
                type:item.type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res)
                this.list=res.data.data.list
                this.type=item.type
                
              })
              
    },
    removeHtmlStyle(html) {

      var rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/;

      var newHtml = "";

      if (html) {

        newHtml = html.replace(rel, "");

      }

      return newHtml;

    },
  }
}
</script>
<style>
body{
    background-color: rgb(240, 241, 244,100);
    height:100%;
    display:block;
}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

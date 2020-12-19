<template>

  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <div class="flex antialiased min-h-screen">
      <aside class="flex flex-col text-indigo-100 bg-opacity-50" style="width:100px">
        <div class="text-sm md:text-xs">
          <a href="./blogreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="width:100px; color: white">
            <img src="../../assets/image/manage/document.png" style="margin:10px">
            违规帖子
          </a>
          <a href="./commentreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
            <img src="../../assets/image/manage/comment1.png" style="margin:10px" >
            违规评论
          </a>
          <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider active-nav" style="color: white">
            <img src="../../assets/image/manage/globe_3.png" style="margin:10px">
            冒领门户
          </a>
          <a href="./log" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
            <img src="../../assets/image/manage/log.png" style="margin:10px">
            查看日志
          </a>
        </div>
      </aside>
      <!-- bg-indigo-900  -->
      <section class="p-4 text-indigo-100 grey-bgcolor" style="width:250px;bgcolor:white">
        <div class="flex flex-col space-y-6 inbox">
          <ul  >
            <li v-for="(item,index) in list" :key="index" style="margin:5px;width:210px">
              <!-- py-6 -->
              <a href="#" class="relative flex pl-5 pr-3 py-3  rounded-lg middle-nav"  v-bind:class="index==activeindex? 'active':'bg-opacity-50 hover:bg-opacity-75'" v-on:click="active(index)">
                <div class="flex-grow mr-2" style="color: black;">
                  <!-- mb-2 -->
                  <header class="flex md:flex-col xl:flex-row justify-between mr-2 leading-snug">
                    <div>
                      <h1 class="text-lg font-semibold">{{item.author_name}}</h1>
                      <h2 class="flex flex-wrap">
                      </h2>
                    </div>
                  </header>
                  <p>举报人：{{item.user_name_r}}</p>
                  <p>举报时间：{{item.time}}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <main class="hidden md:flex flex-col  p-4 md:p-8 bg-gray-200" style="background:rgba(240,241,244);padding:2% 6%;width:100%">
        <div class="px-6 py-5 bg-white shadow rounded-lg mb-4 md:mb-8" style="background:white">
          <div class="flex mb-4">
            <div class="flex-shrink-0 h-8 w-8 lg:h-12 lg:w-12 mr-4 bg-gray-300 rounded-full overflow-hidden">
              <!-- 跳转到冒领者的个人主页 -->
              <a href="#"><img :src="this.list[activeindex].user_icon" class="h-full w-full object-cover"></a>
            </div>
            <div class=" font-semibold" style="font-size:30px">
              <a href="#">{{this.list[activeindex].user_name}}</a>
            </div>
          </div>
          <div class="space-y-4">
            <!-- 跳转到门户主页 -->
            <a href="#">门户名字：{{this.list[activeindex].author_name}}</a>
            <br>
            工作单位：{{this.list[activeindex].orgs}}
          </div>
          <el-divider></el-divider>
          <div class="flex mb-4">
            <div >
              <p class="font-semibold text-lg" >举报理由:</p>
              <p>      </p>
              <p >{{this.list[activeindex].reason}}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mb-4 pt-4 md:pt-8 justify-end ">
          <el-button type="primary" @click="open(this.list[activeindex].id,1)">解绑</el-button>
          <el-button @click="open(this.list[activeindex].id,0)">忽略</el-button>
        </div>
    </main>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: "GWReported",
  components: {
    NewNavigation,
  },
  data(){
      // let flag
      return{
        search:"搜索内容",
        count:0,
        activeindex:0,
        list:[{id:0,
              author_name:"门户1",
              orgs:"北京航空航天大学",
              reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
              user_name:"王小牛",
              user_icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              user_name:"王小牛",
              user_name_r:"张小牛",
              time:"2020-11-20"},
        
        {id:1,
        author_name:"门户2",
        orgs:"北京航空航天大学",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        user_name:"王小牛",
        user_icon:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        user_name_r:"张小牛",
        time:"2020-11-20"},
        
        {id:2,
        author_name:"门户3",
        orgs:"北京航空航天大学",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        user_name:"王小牛",
        user_icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        user_name_r:"张小牛",
        time:"2020-11-20"},
        
        {id:3,
        author_name:"门户4",
        orgs:"北京航空航天大学",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        user_name:"王小牛",
        user_icon:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        user_name_r:"张小牛",
        time:"2020-11-20"},

        {id:4,
        author_name:"门户5",
        orgs:"北京航空航天大学",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        user_name:"王小牛",
        user_icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        user_name_r:"张小牛",
        time:"2020-11-20"},
        ]
      }
  },
  mounted(){
    //接口文档27.3
    this.$axios.post('/reported_list/',
    this.qs.stringify({
        type:1,
    }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(res => {
      //接收数据
      console.log(res);
      this.list = res.data.list;
    })
  },
  methods:{
    active:function(i){
      this.activeindex=i
    },
    open(id,i) {
      this.$axios.post('/process_report/',
      this.qs.stringify({
          id: id,
          type:i,
      }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res => {
      if (res.data.status === 0) {
        this.$message.error("门户认领解除绑定失败！")
      } else {
        alert("门户认领解除绑定成功！")
      }
      })
    }
  }

}
</script>

<style type="text/css">
  img{
    height: 25px;
  }
  .grey-bgcolor {
    background-color:#f0f1f4;
  }
  .middle-nav {
    background-color: white;
  }
  .text-indigo-100 {
    color: #000;
  }
  .inbox a.active::before {
    background-color: #df5747;
  }
  aside{
    background-color:#df5747;
  }
  .active-nav{
    background-color:#e26c5f;
  }
  .left-nav:hover{
    background-color:#dc4a3a;
  }
</style>
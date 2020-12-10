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
          <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider active-nav" style="color: white">
            <img src="../../assets/image/manage/comment1.png" style="margin:10px" >
            违规评论
          </a>
          <a href="./gwreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
            <img src="../../assets/image/manage/globe_3.png" style="margin:10px">
            冒领门户
          </a>
          <a href="./log" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
            <img src="../../assets/image/manage/log.png" style="margin:10px">
            查看日志
          </a>
          <!-- <a href="#" class="flex flex-col items-center p-4 md:p-6 font-semibold hover:bg-indigo-900">
						<svg viewBox="0 0 20 20" fill="currentColor" class="h-8 w-8 text-indigo-300 mb-1">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
						</svg>
						待开发
					</a>
					<a href="#" class="flex flex-col items-center p-4 md:p-6 font-semibold hover:bg-indigo-900">
						<svg viewBox="0 0 20 20" fill="currentColor" class="h-8 w-8 text-indigo-300 mb-1">
							<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
						待开发
					</a> -->
        </div>
      </aside>
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
                    <h1 class="text-lg font-semibold">{{item.title}}</h1>
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
      <main class="hidden md:flex flex-col  p-4 md:p-8 bg-gray-200" style="background:rgba(240,241,244);padding:2% 6%">
        <div class="px-6 py-5 bg-white shadow rounded-lg mb-4 md:mb-8" style="background:white">
          <div class="flex mb-4">
            <div class="flex-shrink-0 h-8 w-8 lg:h-12 lg:w-12 mr-4 bg-gray-300 rounded-full overflow-hidden">
              <a href="#"><img :src="this.list[activeindex].icon" class="h-full w-full object-cover"></a>
            </div>
            <div class=" font-semibold" style="font-size:30px">
              <a href="#">{{this.list[activeindex].title}}</a>
            </div>
          </div>
          <div class="space-y-4">
            {{this.list[activeindex].content}}
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
          <el-button type="primary" @click="open(this.list[activeindex].id,1)">删评</el-button>
          <el-button @click="open(this.list[activeindex].id,0)">忽略</el-button>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";

// @ is an alias to /src
export default {
  name: "CommentReported",
  components: {
    NewNavigation,
  },
  data(){
      // let flag
      return{
        search:"搜索内容",
        count:0,
        activeindex:0,
        list:[{title:"标题1",
              reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
              content:"这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了；妻在屋里拍着闰儿⑴，迷迷糊糊地哼着眠歌。我悄悄地披了大衫，带上门出去。",
              icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              user_name_r:"紫名",
              time:"2020-11-20"},
        
        {title:"标题2",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        content:"沿着荷塘，是一条曲折的小煤屑路。这是一条幽僻的路；白天也少人走，夜晚更加寂寞。荷塘四面，长着许多树，蓊蓊郁郁⑵的。路的一旁，是些杨柳，和一些不知道名字的树。没有月光的晚上，这路上阴森森的，有些怕人。今晚却很好，虽然月光也还是淡淡的。",
        icon:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        user_name_r:"紫名",
        time:"2020-11-20"},
        
        {title:"标题3",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        content:"路上只我一个人，背着手踱⑶着。这一片天地好像是我的；我也像超出了平常的自己，到了另一个世界里。我爱热闹，也爱冷静；爱群居，也爱独处。像今晚上，一个人在这苍茫的月下，什么都可以想，什么都可以不想，便觉是个自由的人。白天里一定要做的事，一定要说的话，现 在都可不理。这是独处的妙处，我且受用这无边的荷塘月色好了。",
        icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        user_name_r:"紫名",
        time:"2020-11-20"},
        
        {title:"标题4",
        reason:"这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        content:"曲曲折折的荷塘上面，弥望⑷的是田田⑸的叶子。叶子出水很高，像亭亭的舞女的裙。层层的叶子中间，零星地点缀着些白花，有袅娜⑹地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。微风过处，送来缕缕清香，仿佛远处高楼上渺茫的歌声似的。这时候叶子与花也有一丝的颤动，像闪电般，霎时传过荷塘的那边去了。叶子本是肩并肩密密地挨着，这便宛然有了一道凝碧的波痕。叶子底下是脉脉⑺的流水，遮住了，不能见一些颜色；而叶子却更见风致⑻了。",
        icon:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        user_name_r:"紫名",
        time:"2020-11-20"}
        // {title:"标题5",content:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由"},
        // {title:"标题6",content:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由"},
        // {title:"标题7",content:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由"},
        // {title:"标题8",content:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由"},
        // {title:"标题9",content:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由"}
        ]
      }
  },
  methods:{
    active:function(i){
      this.activeindex=i
    },
    open() {
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post('/app/process_invitation/',
            this.qs.stringify({
                id: 0,
                type: 0
            }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
            if (res.data.status === 0) {
            alert('加入团队成功')
            } else {
            this.$message.error("加入团队失败！")
            }
        })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    
  }
}
</script>

<style type="text/css">
  img{
    height: 25px;
  }
  .grey-bgcolor {
    background-color: #f0f1f4;
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
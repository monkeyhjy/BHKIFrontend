<template>
    <div class="flex bg-indigo-800 antialiased min-h-screen">
  <aside class="flex flex-col text-indigo-100 bg-indigo-900 bg-opacity-50" style="width:100px">
    <nav class="text-sm md:text-xs">
      <a href="./blogreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider hover:bg-indigo-900" style="width:100px; color: white">
        <img src="../../assets/image/manage/document.png" style="margin:10px">
        违规帖子
      </a>
      <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider bg-indigo-800" style="color: white">
        <img src="../../assets/image/manage/comment.png" style="margin:10px" >
        违规评论
      </a>
      <a href="./gwreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider hover:bg-indigo-900" style="color: white">
        <img src="../../assets/image/manage/globe_3.png" style="margin:10px">
        冒领门户
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
    </nav>
  </aside>
  <section class="p-4 md:p-8 text-indigo-100" style="width:500px">
    <h2 class="ml-1 mt-6 mb-2 text-lg font-semibold ">被举报评论</h2>
    <div class="flex flex-col space-y-6 inbox">
      <ul  >
        <li v-for="(item,index) in list" :key="index" style="margin:10px;width:300px">
            <a href="#" class="relative flex pl-5 pr-3 py-6 bg-indigo-900  rounded-lg"  v-bind:class="index==activeindex? 'active':'bg-opacity-50 hover:bg-opacity-75'" v-on:click="active(index)">
              <div class="flex-grow mr-2" style="color: white;">
                <header class="flex md:flex-col xl:flex-row justify-between mr-2 mb-2 leading-snug">
                  <div>
                    <h1 class="text-lg font-semibold">{{item.title}}</h1>
                    <h2 class="flex flex-wrap">
                    </h2>
                  </div>
                </header>
                <p>{{item.reason}}</p>
              </div>
            </a>
        </li>
      </ul>
    </div>
  </section>
  <main class="hidden md:flex flex-col  p-4 md:p-8 bg-gray-200" style="background:white">
    <div class="px-6 py-5 bg-white shadow rounded-lg mb-4 md:mb-8" style="background:rgba(251,231,220)">
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
    </div>
    <div class="px-6 py-5 bg-white shadow-2xl rounded-lg mb-4 md:mb-8 " style="background:rgba(251,231,220)">
        <div class="flex mb-4">
          <div class="  font-semibold  italic" style="font-size:20px">
            <a href="#">举报人：{{this.list[activeindex].user_name_r}}</a>
          </div>
        </div>
        <div class="space-y-4 italic">
          举报时间：{{this.list[activeindex].time}}
        </div>
      </div>
      <div class="flex flex-wrap items-center -mb-4 pt-4 md:pt-8 justify-end ">
        <!-- <a href="#" class="inline-flex items-center px-12 py-4 mb-4 mr-6 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 text-lg font-semibold rounded-lg" @click="open">
          删帖
        </a> -->
        <el-button type="primary" @click="open">删评</el-button>
        <el-button >忽略</el-button>
        <!-- <a href="#" class="inline-flex px-12 py-4 mb-4 bg-indigo-400 bg-opacity-25 hover:bg-indigo-300 hover:bg-opacity-25 text-indigo-800 text-lg font-semibold rounded-lg">
          忽略
        </a> -->
      </div>
  </main>
</div>
</template>

<script>


// @ is an alias to /src
export default {
  name: "CommentReported",
  data(){
      // let flag
      return{
        search:"搜索内容",
        count:0,
        activeindex:0,
        list:[{title:"标题1",
              reason:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由",
              content:"这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了；妻在屋里拍着闰儿⑴，迷迷糊糊地哼着眠歌。我悄悄地披了大衫，带上门出去。",
              icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              user_name_r:"紫名",
              time:"2020-11-20"},
        
        {title:"标题2",
        reason:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        content:"沿着荷塘，是一条曲折的小煤屑路。这是一条幽僻的路；白天也少人走，夜晚更加寂寞。荷塘四面，长着许多树，蓊蓊郁郁⑵的。路的一旁，是些杨柳，和一些不知道名字的树。没有月光的晚上，这路上阴森森的，有些怕人。今晚却很好，虽然月光也还是淡淡的。",
        icon:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        user_name_r:"紫名",
        time:"2020-11-20"},
        
        {title:"标题3",
        reason:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
        content:"路上只我一个人，背着手踱⑶着。这一片天地好像是我的；我也像超出了平常的自己，到了另一个世界里。我爱热闹，也爱冷静；爱群居，也爱独处。像今晚上，一个人在这苍茫的月下，什么都可以想，什么都可以不想，便觉是个自由的人。白天里一定要做的事，一定要说的话，现 在都可不理。这是独处的妙处，我且受用这无边的荷塘月色好了。",
        icon:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        user_name_r:"紫名",
        time:"2020-11-20"},
        
        {title:"标题4",
        reason:"举报理由：这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由这是一条五十个字的举报理由",
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
</style>
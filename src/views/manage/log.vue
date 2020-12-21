<template>
    <div class="back">
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
                    <a href="./gwreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
                    <img src="../../assets/image/manage/globe_3.png" style="margin:10px">
                    冒领门户
                    </a>
                    <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider active-nav" style="color: white">
                    <img src="../../assets/image/manage/log.png" style="margin:10px">
                    查看日志
                    </a>
                </div>
            </aside>
            <!-- padding:2% 6%; -->
            <main style="background:rgba(240,241,244);width:100%">
                <div style="margin-top: 2%;margin-left: 8%;margin-right: 8%">
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="filename"
                    label="文件名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="startlinenum"
                    label="开始行数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="endlinenum"
                    label="结束行数">
                    </el-table-column>
                    <el-table-column
                    prop="updateadministatorname"
                    label="管理员">
                    </el-table-column>
                    <el-table-column
                    prop="updatetime"
                    label="更新时间">
                    </el-table-column>
                </el-table>
                <br>
                <el-table
                    :data="tableData2"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="filename"
                    label="文件名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="startlinenum"
                    label="开始行数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="endlinenum"
                    label="结束行数">
                    </el-table-column>
                    <el-table-column
                    prop="updateadministatorname"
                    label="管理员">
                    </el-table-column>
                    <el-table-column
                    prop="updatetime"
                    label="更新时间">
                    </el-table-column>
                </el-table>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: "Log",
  components: {
    NewNavigation,
  },
  data(){
      // let flag
      return{
        search:"搜索内容",
        count:0,
        tableData2: [{
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }],
        tableData: [{
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }, {
          filename: 'D://filename',
          startlinenum: '345',
          endlinenum: '789',
          updateadministatorname:'xiaoming',
          updatetime:'2016-05-02'
        }],
      }
  },
  mounted(){
    //接口文档27.3
    this.$axios.post('/apis/search/getupdatebyfilename',
    {
        // administratorid:1,
        filename:"author",
        pagenumber:1
    }).then(res => {
      //接收数据
      console.log(res);
      this.tableData = res.data;

      // this.$axios.post('/apis/search/getupdatebyfilename',
      // {
      //     administratorid:1,
      //     filename:"author",
      //     pagenum:2
      // }).then(res => {
      //   //接收数据

      //   console.log(res);
      //   this.tableData.push(data.record_list);
      // })
    }),
    this.$axios.post('/apis/search/getupdatebyfilename',
    {
        // administratorid:1,
        filename:"paper",
        pagenumber:1
    }).then(res => {
      //接收数据
      console.log(res);
      this.tableData2 = res.data;

      // this.$axios.post('/apis/search/getupdatebyfilename',
      // {
      //     administratorid:1,
      //     filename:"paper",
      //     pagenum:2
      // }).then(res => {
      //   //接收数据
      //   console.log(res);
      //   this.tableData2.push(data.record_list);
      // })
    })
  },
};
</script>

<style>
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
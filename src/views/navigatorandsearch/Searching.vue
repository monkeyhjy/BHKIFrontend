<template>
  <div class="wrapper">
      <new-navigation></new-navigation>
    <section>
    <main style="text-align: center">

        <div style="margin-top: 20px">
            <el-input placeholder="请输入关键词" v-model="input" class="input-with-select" style="width: 66.6% ">
                <el-select v-model="select" slot="prepend" placeholder="请选择" class="object_select"  style="width: 140px;">
                    <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value">
                        <span >{{ item.label }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search_click()"></el-button>
            </el-input>
        </div>

    <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

        <el-row>
            <el-col :span="4"><div style="height: 40px"></div></el-col>
            <el-col :span="16">
            <div class="search_result" >
            <el-tabs type="border-card" style="background-color: #fabca2;  border-radius: 10px margin-top: 20%">
                <el-tab-pane label="专家" >
                    <el-col style="margin-top: 1rem; text-align: left">
                        <el-button  @click="search1()">综合</el-button>
                        <el-button  @click="search2()">发表论文数</el-button>
                        <el-button  @click="search3()">h指数</el-button>
                        <el-button  @click="search4()">被引用数</el-button>
                    </el-col>
                    <el-col :span="24" style="margin-top: 1rem; text-align: left"
                     v-for="(item, index) in Author_information"
                      :key="index">
                        <el-card class="box-card" >
                            <div class="text item">
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <el-link @click="jumpToAouther(item.id)" style="font-size: 1.2rem">
                                        <i class="el-icon-document"></i>
                                        {{item.name}}
                                    </el-link>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                <span>h指数：{{item.h_index}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                <span>发表量：{{item.n_pubs}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                <span>被引量：{{item.n_citation}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                <span>工作单位：{{item.orgs}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                <span>相关领域：<span  v-for="(item2, index2) in item.tags"
                                :key="index2">{{item2.t}}({{item2.w}});</span>
                                </span>
                                </el-col>
                            </div>
                        </el-card>
                    </el-col>
                
                    <el-footer>
                        <el-col :span="4"><div class="grid-content"></div></el-col>
                            <el-col :span="24">
                                <div style="text-align: center;">
                                    <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="totalnum"
                                    :page-size="pageSize"
                                    :current-page="currentPage"
                                    @current-change="handleCurrentChange">
                                    </el-pagination>
                                </div>
                            </el-col>
                        <el-col :span="4"><div class="grid-content"></div></el-col>
                    </el-footer>

                </el-tab-pane>

                <el-tab-pane label="论文">
                    <el-col style="margin-top: 1rem; text-align: left">
                        <el-button @click="search5()">综合</el-button>
                        <el-button @click="search6()">发表时间</el-button>
                        <el-button @click="search7()">被引用数</el-button>
                    </el-col>
                    <el-col :span="24" style="margin-top: 1rem; text-align: left"
                     v-for="(item, index) in papers_information"
                      :key="index">
                        <el-card class="box-card" >
                            <div class="text item">
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <el-link @click="jumpToPaper(item.id)" style="font-size: 1.2rem">
                                        <i class="el-icon-document"></i>
                                        {{item.title}}
                                    </el-link>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <el-link v-for="(author, index2) in item.authors"
                                     :key="index2"
                                     style="margin-right: 0.5rem; font-size: 16px"
                                     @click="jumpToAouther(author.id)">{{author.name}}</el-link>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <span>发表刊物：{{item.venue_name}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <span>发表年限：{{item.year}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <span>被引量：{{item.n_citation}}</span>
                                </el-col>
                                <el-col :span="24" style="margin-bottom: 1rem">
                                    <span>相关链接：
                                        <span  v-for="(item2, index2) in item.url"
                                        :key="index2" >
                                        <a :href= "item2.url_n">{{item2.url_n}}  ;</a>
                                        </span>
                                    </span>
                                </el-col>
                            </div>
                        </el-card>
                    </el-col>
                    <el-footer>
                        <el-col :span="4"><div class="grid-content"></div></el-col>
                            <el-col :span="24">
                                <div style="text-align: center;">
                                    <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="totalnum"
                                    :page-size="pageSize"
                                    :current-page="currentPage"
                                    @current-change="handleCurrentChange">
                                    </el-pagination>
                                </div>
                            </el-col>
                        <el-col :span="4"><div class="grid-content"></div></el-col>
                    </el-footer>
                </el-tab-pane>
            </el-tabs>
            </div>
            </el-col>
            <el-col :span="4"><div style="height: 40px"></div></el-col>
        </el-row>
        
    </main>
    </section>
  </div>
</template>

<script>
import NewNavigation from '../navigatorandsearch/NewNavigation';
export default {
  name: 'Searching',
  data() {
      return {
        collapse: false,
        pageSize: 10,
        currentPage: 1,
        pagenum: 10,
        totalnum: 100,
        Author_information: [{
            id:"",
            name:"",
            h_index:"",//h指数
            n_pubs:"",//发表论文数
            tags:[{
                t:"",//关键词内容
                w:""//相关论文数量
            }],//相关领域
            n_citation:"",//被引数
            // pubs:[{
            //     i:"",//论文id
            //     r:""//作者排名
            // }],//论文
            orgs:""//工作单位
          }, {
            id:155,
            name:"我吃西红柿",
            h_index:"16",
            n_pubs:"3",
            tags:[{
                t:"计算机",
                w:"100"
            }, {
                t:"生物",
                w:"50"
            }],
            n_citation:"1065",
            orgs:"起点中文网"
          }, {
            id:156,
            name:"我不吃西红柿",
            h_index:"20",
            n_pubs:"39",
            tags:[{
                t:"计算机",
                w:"100"
            }, {
                t:"生物",
                w:"50"
            }],
            n_citation:"1065",
            orgs:"终点中文网"
          },],
        papers_information: [{  
            id:"",
            title:"",
            authors:{
                id:"",
                name:""
            },
            venue_name:"",//刊物名
            year:"",//发表年
            n_citation:"",//被引数
            url:""//相关链接
          }, {
            id:"1",
            title:"Semantic Wikipedia",
            authors:[{
                id:"ak",
                name:"Max V"
            }, {
                id:"ak1",
                name:"Markus Kr"
            }],
            venue_name:"WWW",//刊物名
            year:"2006",//发表年
            n_citation:"639",//被引数
            url:[{
               url_n:"http://doi.acm.org/10.1145/1135777.1135863"//相关链接
            }]
          }, {
            id:"2",
            title:"Parsing",
            authors:[{
                id:"ak",
                name:"Ralph Grishman"
            }],
            venue_name:"ACL",//刊物名
            year:"1981",//发表年
            n_citation:"11",//被引数
            url:[{
                url_n:"http://aclweb.org/anthology-new/P/P81/P81-1022.pdf"
            }, {
                 url_n:"https://static.aminer.org/pdf/20160902/aclanthology/index.txt"
            }]
          }],
        subject: [{value: '选项0', label: '综合'
        }, {value:'选项1', label: '作者'
        }, {value:'选项2', label: '领域'
        }, {value:'选项3', label: '机构'
        }, {value:'选项4', label: '标题'
        }, {value:'选项5', label: '刊物'
        }, {value:'选项6', label: '关键词'
        }, {value:'选项7', label: '摘要'
        }, {value:'选项8', label: 'ISSN'
        }, {value:'选项9', label: 'DOI'
        }],
        value: '综合',
        input: '',
        select: '综合',
        tableData: [{
            date: "test"
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      };
    },
    components: {
        NewNavigation
    },
    methods: {
      get_input(){
          this.input=this.$route.query.input
      },
      search_click() {
          if(this.input=='') {
              this.$alert('关键词不能为空', 'tips.', {
              confirmButtonText: '确定',
              callback: action => {
              this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
          }
          else{
              this.$axios.post('',
              this.qs.stringify({
                  keyword: this.input
              }),
              {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
              )
              .then(res => {
                  if(res.data.status === 0){
                      this.Author_information=res.data
                  }
              })
          }
      },
      jumpToAouther(Auther_id){
          this.$router.push({
              path:'/Author',
              query: {
                  author_id: this.$Base64.encode(JSON.stringify(Auther_id))
              }
          })
      },
      jumpToPaper(Paper_id){
          this.$router.push({
              path:'/paper',
              query: {
                  paper_id: this.$Base64.encode(JSON.stringify(Paper_id))
              }
          })
      },
      search1(){
          this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.Author_information=res.data
            }
        }
        )
      },
      search2(){
          this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.Author_information=res.data
            }
        }
        )
      },
      search3(){
          this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.Author_information=res.data
            }
        }
        )
      },
      search4(){
          this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.Author_information=res.data
            }
        }
        )
      },
      search5(){
          this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.papers_information=res.data
            }
        }
        )
      },
      search6(){
        this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.papers_information=res.data
            }
        }
        )
      },
      search7(){
        this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page:1}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            if(res.data.status === 0){
                this.papers_information=res.data
            }
        }
        )
      },

      handleCurrentChange(val) {
        this.$axios.post('http://182.92.239.145/apis/',
        this.qs.stringify({page: val}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            this.currentPage = res.data.currentPage
            if(res.data.status === 0)
            console.log('切换到第' + val + '页成功')
        })
        this.current_page = val
      },
      
    }
}
</script>

<style scoped>
    .header{
         position: fixed;
         width: 100%;
         left: 0;
         top: 0;
         z-index: 1000;
        }

    .object_select{
        width: 130px;
    }
    .grid-content {
        min-height: 36px;
    }
</style>
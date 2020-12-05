<template>
  <div class="wrapper">
    <!-- 头部组件 -->
    <div class="header" >
    <v-head></v-head>
    
    </div>
    <section>
    <main>
        
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入关键词" v-model="input" class="input-with-select" style="width: 900px">
                <el-select v-model="select" slot="prepend" placeholder="请选择" class="object_select"  style="width: 140px;">
                    <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value">
                        <span >{{ item.label }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search_click"></el-button>
            </el-input>
        </div>

        <div>
            <span>

            </span>
        </div>
<!-- 
        <div style="margin-top: 50px; margin-bottom: 80px">
                <el-carousel :interval="4000" type="card" height="200px" style="width: 80%; margin-left: 11%">
                    <el-carousel-item class="slide" v-for="item in lights"
                                      :key="item.value"
                                      :title="item.title"
                                      :content="item.content">
                        <div style="width: 80%;">
                            <h1 class="medium" style="vertical-align: top; float: left; margin: 10px 0px 0px 10px; font-size: 30px">
                                <i class="el-icon-s-promotion" ></i>
                                {{ item.title }}
                            </h1>
                        </div>
                        <div style="margin-top: 8%">
                            <el-divider></el-divider>
                        </div>
                        <div style="margin-top: 8%;">
                            <h4 style="float: left; margin: -30px 20px 0px 20px;">{{item.content}}</h4>
                        </div>
                        <div  style="margin-top: 22%;">
                            <h2 style="float: right; margin: -50px 10px 0px 0px;vertical-align: bottom;">
                                更多
                                <i class="el-icon-right"></i>
                            </h2>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div> -->

<!-- 
        <div style="margin-top: 15px; margin-bottom: 90px;">
        <form class="search" style="margin-top: 15px; margin-bottom: 90px;">
            <td>
            <el-select v-model="value" slot="prepend" placeholder="请选择" >
                <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value">
                    <span >{{ item.label }}</span>
                </el-option>
            </el-select>
            </td>
            <td style="width: 500px">
            <el-input v-model="input" placeholder="请输入关键词" ></el-input>
            </td>
            <td >
                <el-button type="submit" icon="el-icon-search" @click="search_click">搜索</el-button>
            </td>
        </form>
        </div> -->
        <el-row>
            <el-col :span="4"><div style="height: 40px"></div></el-col>
            <el-col :span="16">
                <div class="search_result" >
        <el-tabs type="border-card" >
            <el-tab-pane label="专家">
                <el-col :span="24" style="margin-top: 1rem; text-align: left"
                 v-for="(item, index) in Author_information"
                  :key="index">
                    <el-card class="box-card">
                        <div class="text item">
                            <el-col :span="24" style="margin-bottom: 1rem">
                                <el-link @click="jumpToAchievement(item.id)" style="font-size: 1.2rem">
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

                <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
            </el-tab-pane>
            <el-tab-pane label="论文">
                <el-col :span="24" style="margin-top: 1rem; text-align: left"
                 v-for="(item, index) in papers_information"
                  :key="index">
                    <el-card class="box-card">
                        <div class="text item">
                            <el-col :span="24" style="margin-bottom: 1rem">
                                <el-link @click="jumpToAchievement(item.id)" style="font-size: 1.2rem">
                                    <i class="el-icon-document"></i>
                                    {{item.title}}
                                </el-link>
                            </el-col>
                            <el-col :span="24" style="margin-bottom: 1rem">
                                <el-link v-for="(author, index2) in item.authors"
                                 :key="index2"
                                 style="margin-right: 0.5rem; font-size: 16px"
                                 @click="jumpToPortal(author.id)">{{author.name}}</el-link>
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
                            <span>相关链接：<span  v-for="(item2, index2) in item.url"
                            :key="index2" >
                            <a :href= "item2.url_n">{{item2.url_n}}  ;</a>
                            </span>
                            </span>
                            </el-col>
                        </div>
                    </el-card>
                </el-col>
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
import vHead from "../components/Header.vue";
export default {
  name: 'Searching',
  data() {
      return {
        collapse: false,
        pageSize: 5,
        currentPage: 1,
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
            id:"***",
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
            id:"*****",
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
        subject: [{value: '选项0', label: '所有学科'
        }, {value:'选项1', label: '计算机科学'
        }, {value:'选项2', label: '通信与信息科学'
        }, {value:'选项3', label: '数学'
        }, {value:'选项4', label: '物理学'
        }, {value:'选项5', label: '化学'
        }, {value:'选项6', label: '光学'
        }, {value:'选项7', label: '生物学'
        }, {value:'选项8', label: '天文学'
        }, {value:'选项9', label: '航空航天工程'
        }, {value:'选项10', label: '地理学'
        }, {value:'选项11', label: '地质学'
        }, {value:'选项12', label: '地球物理学'
        }, {value:'选项13', label: '地质工程'
        }, {value:'选项14', label: '矿业'
        }, {value:'选项15', label: '石油工程'
        }, {value:'选项16', label: '海洋工程'
        }, {value:'选项17', label: '电气工程'
        }, {value:'选项18', label: '交通运输'
        }, {value:'选项19', label: '机械工程'
        }, {value:'选项20', label: '医学'
        }, {value:'选项21', label: '临床医学'
        }, {value:'选项22', label: '药学'
        }, {value:'选项23', label: '心理学'
        }, {value:'选项24', label: '免疫与微生物学'
        }, {value:'选项25', label: '神经科学'
        }, {value:'选项26', label: '生物医学工程'
        }, {value:'选项27', label: '仪器科学与技术'
        }, {value:'选项28', label: '冶金工程'
        }, {value:'选项29', label: '建筑学'
        }, {value:'选项30', label: '核科学与技术'
        }, {value:'选项31', label: '农业工程'
        }, {value:'选项32', label: '林学'
        }, {value:'选项33', label: '环境科学与工程'
        }, {value:'选项34', label: '食品科学与工程'
        }, {value:'选项35', label: '经济学'
        }, {value:'选项36', label: '管理学'
        }, {value:'选项37', label: '社会学'
        }, {value:'选项38', label: '教育学'
        }, {value:'选项39', label: '体育学'
        }, {value:'选项40', label: '历史学'
        }],
        value: '所有学科',
        input: '',
        input3: '',
        select: '所有学科',
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
      vHead,
    },
    methods: {
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
</style>
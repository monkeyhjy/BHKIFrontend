<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div class="collected">
      <el-card class="collectedList">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="学术成果" name="paper">
            <div class="collected-main" v-for="item in p_collected" :key="item.paper_id">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <h3>{{item.title}}</h3>
                      <p>{{item.author[0].name}}, {{item.author[1].name}} | {{item.source}}</p>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="onsubmit()">取消收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="博客帖文" name="blog">
            <div class="collected-main" v-for="item in b_collected" :key="item.blog_id">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <h3>{{item.title}}</h3>
                      <el-row>
                        <el-col :span="1">
                          <img :src="item.avatar" class="inline-avatar">
                        </el-col>
                        <el-row :span="23">
                          <div class="bloginfo-block">{{item.author}} | {{item.intro}}</div>
                        </el-row>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="onsubmit()">取消收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>

</template>

<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: 'Collected',
  components: {
    NewNavigation,
  },
    data() {
      return {
        activeName: 'paper',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        p_collected:[
            {
                paper_id:0,
                title:"Paper1",
                author:[
                    {id:0, name:"Zhang Manwei"},
                    {id:1, name:"Another author"},
                ],
                source:"Journal1",
            },
            {
                paper_id:1,
                title:"Paper2",
                author:[
                    {id:0, name:"Zhang Manwei"},
                    {id:1, name:"Another author"},
                ],
                source:"Journal2",
            }
        ],
        b_collected:[
            {
                blog_id:0,
                title:"Blog1 : Today's weather : snow storm",
                author:"Zhang Manwei",
                avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                intro:"This is a very rough blog.",
            },
            {
                blog_id:0,
                title:"Blog2",
                author:"Another author",
                avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                intro:"This is an another very rough blog.",
            }
        ],
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style>
h2,h3{
  margin-top: 10px;
  margin-bottom:8px;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-end: 0em;
  margin-inline-start: 0em;
}
.collectedList{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
}
.collected{
    margin-right: 3%;
}
.el-form{
    margin-right: 100px;
}
.personPage{
    margin-top: 30px;
}
.bloginfo-block{
    padding-top:6px;
}
.inline-avatar{
    margin-right:10px;
    height:30px;
}

</style>
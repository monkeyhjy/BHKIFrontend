<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div class="collected">
      <el-card class="collectedList">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="学术成果" name="paper">
            <div v-show="!paperValid">您还没有收藏学术成果……</div>
            <div class="collected-main" v-for="item in p_collected" :key="item.paper_id">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <el-link class="blog-title" :underline="false" @click="jump_to_paper(item.paper_id)"><h2>{{item.title}}</h2></el-link>
                      <p class="limit-text-length blog-info-p"><el-link :underline="false" :href="'/userinfo/'+item.author[0].id">{{item.author[0].name}}</el-link>, <el-link :underline="false" :href="'/userinfo/'+item.author[1].id">{{item.author[1].name}}</el-link> | {{item.source}}</p>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="onsubmit()">取消收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider style="margin:10px 0px;"></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="博客帖文" name="blog">
            <div v-show="!blogValid">您还没有收藏帖子……</div>
            <div class="collected-main" v-for="item in b_collected" :key="item.blogid">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.authorid+'/'+item.blogid"><h2>{{item.title}}</h2></el-link>
                      <el-row>
                        <el-col :span="1">
                          <img :src="item.avatar" class="inline-avatar">
                        </el-col>
                        <el-row :span="23">
                           <div class="bloginfo-block limit-text-length blog-info-p"><el-link :underline="false" :href="'/userinfo/'+item.authorid">{{item.author}}</el-link> | {{item.content}}</div>
                        </el-row>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button type="primary" @click="unfavBlog(item.blogid)">取消收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider style="margin:10px 0px;"></el-divider>
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
      blogValid:false,
      paperValid:true,
      activeName: 'paper',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      p_collected:[
        {
          paper_id:1,
          title:"Paper1",
          author:[
            {id:1, name:"Zhang Manwei"},
            {id:2, name:"Another author"},
          ],
          source:"Journal1",
        },
        {
          paper_id:2,
          title:"Paper2",
          author:[
            {id:1, name:"Zhang Manwei"},
            {id:2, name:"Another author"},
          ],
          source:"Journal2",
        }
      ],
      b_collected:[
        {
          blogid:1,
          title:"Blog1 : Today's weather : snow storm",
          author:"Zhang Manwei",
          authorid:1,
          avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          content:"This is a very rough blog.",
          created:'',
          bio:'',
        },
        {
          blogid:2,
          title:"Blog2",
          author:"Another author",
          authorid:2,
          avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          content:"This is an another very rough blog.",
          created:'',
          bio:'',
        }
      ],
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    jump_to_paper(paper_id){
      this.$router.push({
        path: '/paper',
        query: {
          paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
        }
      })
    },
    init() {
      this.$axios.post('/apis/blog/collectbloglist', {
        userid:0
      }).then(res => {
        // console.log(res)
        // console.log(res.data.status)
        if(res.data.status !== 0 ){
          console.log("请求收藏帖子列表失败");
          return
        }
        var blogList = [];
        var i;
        var result = res.data.data.list;
        var avatarItem;
        for(i=0;i<result.length;i++){
          this.blogValid=true;
          // TODO: 查询所有用户头像
          // this.$axios.post().then(res => {})
          blogList.push(
            {
              blogid: result[i].blogid,
              title: result[i].title,
              content: result[i].content,
              created: result[i].created,
              author: result[i].author,
              authorid: result[i].authorid,
              bio: result[i].bio,
              avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            }
          );
        }
        this.b_collected=blogList;
      });
      // TODO: 查询所有收藏学术成果
    },
    unfavBlog(id){

    }
  }
}
</script>

<style>
.following-content{
  text-align: left;
  padding-left:10px;
}
.el-divider{
 margin:10px 0px;
}
h2{
  margin-top:10px;
  margin-bottom: 8px;
}
p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0em;
  margin-inline-end: 0em;
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
.blog-info-p{
  font-size: 0.9em;
}
.limit-text-length{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
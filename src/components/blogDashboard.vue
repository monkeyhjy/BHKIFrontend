<template>
    <div class="router" style="left:0px;background-color:#f6f8fa">
        <blog-search></blog-search>
        <el-row style="margin-top:50px" :gutter="20">
            <el-col :span="4">
                <el-card shadow="never">
                    <div class="flex6">
                        <el-image style="width:40px;height:40px;border-radius:40px" :src="img" fit="fill"></el-image>
                        <p style="margin-left:10px">{{name}}</p>    
                    </div>
                            <div class="flex6" style="margin-top:15px">
                            <div v-for="(item,index) in list" :key="index"  style="margin-right:13px">
                                <p style="font-size:14px;text-align:center">{{ item.num }}</p>
                                <p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
                            </div>
                            </div>
                </el-card>
                <div>
    </div>
    <div >
		<main>
			<section >
				<div class="menu menu--salal">
					<router-link to="/BlogDashboard/BlogDesktop" class="menu__item" active-class="">
						<span class="menu__item-name" >帖子广场</span>
					</router-link>
          	<router-link to="/BlogDashboard/BlogMyBlog" class="menu__item"  active-class="">
						<span class="menu__item-name" >我的帖子</span>
					</router-link>
          <router-link to="/BlogDashboard/BlogMyTips" class="menu__item"  active-class="">
						<span class="menu__item-name" >我的评论</span>
					</router-link>
          <a class="menu__item"  active-class="">
						<span class="menu__item-name"  @click="createblog()">发布帖子</span>
					</a>
				</div>
			</section>
		</main>
	</div>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import blogSearch from '@/components/blogSearch'
export default {
  name: "BlogDashboard",
    components: {
      blogSearch
  },
  data(){
      return{
        img:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name:"是哈哈呀",
        activeIndex: this.$route.path,
        list:[{num:123,tip:"贴子"},{num:123,tip:"获赞"},{num:123,tip:"评论"},],
        id:0,
      }
  },
  mounted(){
    //获取用户的帖子论坛大致信息
     this.$axios.post('http://182.92.239.145/apis/blog/getUserBlogInfo',
              this.qs.stringify({
                id:0
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                this.id=res.data.id;
                this.img=res.data.img;
                this.name=res.data.name;
                this.list=[{num:res.data.blogNum,tip:"贴子"},{num:res.data.likeNum,tip:"获赞"},{num:res.data.tipNum,tip:"评论"},]
              })
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(this.$route.path)
      console.log(key, keyPath);
    },
    createblog(){
      this.$router.push({path:"/BlogEdit/"+this.id+'/'+123})
      //获取用户的帖子论坛大致信息
     this.$axios.post('http://182.92.239.145/apis/blog/createblog',
              this.qs.stringify({
                
              }),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                 this.$router.push({path:"/BlogEdit/"+this.id+res.data.id})
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

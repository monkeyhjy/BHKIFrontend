<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#df5747"
                text-color="#FFFFFF"
                active-text-color="#f9ae8f"
        >
            <div style="float: left">
                <img class="navigationlogo" src="../../assets/logoT02.png" height="60" width="160"/>
            </div>
            <el-menu-item index="1" style="margin-left: 6rem; font-size: large" @click="gotoMain">首页</el-menu-item>
            <el-menu-item index="2" style="margin-left: 2rem; font-size: large" >查看门户</el-menu-item>
            <el-menu-item index="3" style="margin-left: 2rem; font-size: large" @click="gotoBlog">帖子广场</el-menu-item>
            <el-menu-item index="4" style="margin-left: 2rem; font-size: large">消息中心</el-menu-item>
            <el-submenu index="5" style="margin-left: 2rem;">
                <template slot="title" style="font-size: large">更新数据</template>
                <el-menu-item index="5-1" >文件夹1</el-menu-item>
                <el-menu-item index="5-2" >文件夹2</el-menu-item>
                <el-menu-item index="5-3" >文件夹3</el-menu-item>
            </el-submenu>
            <el-menu-item style="margin-left: 16rem" @click="gotoLogin">
                    <span style="font-size: large">登录</span>
            </el-menu-item>
            <el-menu-item>
                <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        style="margin-left: 20px">
                    <div class="text item">
                        <div style="width: 200px; height: 50px; margin-top: -10px">
                            <el-row class="demo-avatar demo-basic">
                                <el-col :span="8" :offset="1">
                                    <div class="demo-basic--circle" style="margin-top: 10px">
                                        <div class="block">
                                            <el-avatar :size="50" :src="picture"></el-avatar>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <h2 style="margin-top: 20px">{{personName}}</h2>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider></el-divider>
                        <div style="margin-top: 8px; margin-bottom:0px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyinfo">个人信息</el-link>
                        </div>
                        <!--                                        <el-divider></el-divider>-->
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyLike">我的关注</el-link>
                        </div>
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyCollection">个人收藏</el-link>
                        </div>
                    </div>
                    <el-button slot="reference" type="warning" class="el-icon-user" style="border-color: #f9ae8f;background-color: #fbede4;"></el-button>
                </el-popover>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NewNavigation",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                personName: '张小牛',
                picture: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            };
        },
        mounted(){
            this.getData()
        },
        methods: {
            gotoMyinfo(){
              this.$router.push('/personinfo/information')
            },
            gotoMyLike(){
                this.$router.push('/personinfo/following')
            },
            gotoMyCollection(){
                this.$router.push('/personinfo/collected')
            },
            gotoLogin(){
              this.$router.push('/login')
            },
            gotoMain(){
              this.$router.push('/Search')
            },
            gotoBlog(){
                this.$router.push('/BlogDashboard/BlogDesktop')
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getData() {
                var that=this
                this.$axios({
                    url:'/http://182.92.239.145/apis',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.personName = res.data.personName
                    that.picture = res.data.picture
                })
            }
        }
    }
</script>

<style scoped>
    .navigationlogo {
        height: 60px;
    }
</style>
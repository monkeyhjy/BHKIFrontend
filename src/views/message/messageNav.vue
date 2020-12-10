<template>
    <div>
        <div>
            <new-navigation></new-navigation>
        </div>
        <div class="personInfo">
            <el-row class="main" :gutter="20" style="text-align:center;">
                <el-col :span="3" >
                    <el-menu
                            router
                            default-active=activeIndex
                            class="el-menu-vertical-demo"
                            @select="handleSelect"
                            background-color="#df5747"
                            text-color="#fff"
                            active-text-color="rgb(255,221,0)"
                            style="margin-top: 20px">
                        <el-menu-item index="/messageNav/privacyMsg">
                            <i class="el-icon-message-solid nav-icon"></i>
                            <span slot="title">私信消息</span>
                        </el-menu-item>
                        <el-menu-item index="/messageNav/likeMsg">
                            <!-- <img class="nav-icon" src="../icons/attribute.png"/> -->
                            <i class="el-icon-user-solid nav-icon"></i>
                            <span slot="title">收藏消息</span>
                        </el-menu-item>
                        <el-menu-item index="/messageNav/commentMsg">
                            <i class="el-icon-star-on nav-icon"></i>
                            <span slot="title">评论消息</span>
                        </el-menu-item>
                        <el-menu-item index="/messageNav/reportedMsg">
                            <i class="el-icon-s-management nav-icon"></i>
                            <span slot="title">举报消息</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="21">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NewNavigation from "../navigatorandsearch/NewNavigation";

    export default {
        name: "massageNav",
        components: {
            NewNavigation,
        },
        data(){
            return{
                activeIndex: this.$route.path,
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(this.$route.path)
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .nav-icon{
        color:white
    }
    .personInfo{
        margin-left:3%
    }
</style>
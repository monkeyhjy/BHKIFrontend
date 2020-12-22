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
            <el-menu-item index="2" style="margin-left: 2rem; font-size: large" @click="gotoDoor">查看门户</el-menu-item>
            <el-menu-item index="3" style="margin-left: 2rem; font-size: large" @click="gotoBlog">帖子广场</el-menu-item>
            <el-menu-item index="4" style="margin-left: 2rem; font-size: large" @click="gotoMsgCollection">
                消息中心
                <el-badge :value="totalMsgNum" >
                </el-badge>
            </el-menu-item>
            <el-submenu index="5" style="margin-left: 2rem;font-size: large" v-show="admin">
                <template slot="title" style="font-size: large">后台管理</template>
                <el-menu-item index="5-1" @click="gotoReported">处理举报</el-menu-item>
                <el-menu-item index="5-2" @click="gotoLog">查看日志</el-menu-item>
            </el-submenu>
            <el-submenu index="6" style="margin-left: 2rem;font-size: large" v-show="admin">
                <template slot="title" style="font-size: large">更新数据</template>
                <el-menu-item index="6-1" @click="dialogFormVisible_author = true">更新作者信息</el-menu-item>
                <el-menu-item index="6-2" @click="dialogFormVisible_paper = true">更新论文信息</el-menu-item>
            </el-submenu>

            <el-menu-item style="display: block;float: right">
                <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        style="margin-left: 10px">
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
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="logout" v-show="keepLogout">退出登录</el-link>
                        </div>
                    </div>
                    <el-button slot="reference" type="warning" class="el-icon-user"
                               style="border-color: #f9bb99;background-color: #f9bb99; border-radius: 50px"></el-button>
                </el-popover>
            </el-menu-item>
            <el-menu-item style="float: right" @click="gotoLogin" v-show="keepLogin">
                <span style="font-size: large">登录</span>
            </el-menu-item>

            <el-dialog title="更新作者信息" :visible.sync="dialogFormVisible_author">
                <el-form :model="form">
                    <el-form-item label="开始行数" :label-width="formLabelWidth">
                        <el-input v-model="form.start" autocomplete="off" style="width: 600px">
                        </el-input>
                        <el-button style="margin-left: 15px" @click="getAuthorLine()">自动获取</el-button>
                    </el-form-item>
                    <el-form-item label="结尾行数" :label-width="formLabelWidth">
                        <el-input v-model="form.end" autocomplete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_author = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible_author = false, updateAuthor(form.start,form.end)">确 定
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="更新论文信息" :visible.sync="dialogFormVisible_paper">
                <el-form :model="form_2">
                    <el-form-item label="开始行数" :label-width="formLabelWidth">
                        <el-input v-model="form_2.start" autocomplete="off" style="width: 600px">
                        </el-input>
                        <el-button style="margin-left: 15px" @click="getPaperLine()">自动获取</el-button>
                    </el-form-item>
                    <el-form-item label="结尾行数" :label-width="formLabelWidth">
                        <el-input v-model="form_2.end" autocomplete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_paper = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible_paper = false, updatePaper(form_2.start,form_2.end)">确 定
                    </el-button>
                </div>
            </el-dialog>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NewNavigation",
        data() {
            return {
                admin: '',
                keepLogin: true,
                keepLogout: false,
                activeIndex: '1',
                activeIndex2: '1',
                personName: '',
                picture: "",
                dialogFormVisible_author: false,
                dialogFormVisible_paper: false,
                form: {
                    start: '',
                    end: '',
                    delivery: false,
                },
                form_2: {
                    start: '',
                    end: '',
                    delivery: false,
                },
                formLabelWidth: '80px',
                formLabelWidth_2: '80px',
                userId: '',
                totalMsgNum: '',
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            updateAuthor(start, end) {
                var that = this
                this.$axios.post('/apis/search/updateacademicdb',
                    {
                        administratorid: that.userId,
                        file: "author",
                        startline: start,
                        linesnumber: (end - start + 1)
                    })
                    .then(res => {
                        console.log(res);
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '更新失败'
                    });
                });
            },
            updatePaper(start, end) {
                var that = this
                this.$axios.post('/apis/search/updateacademicdb',
                    {
                        administratorid: that.userId,
                        file: "paper",
                        startline: start,
                        linesnumber: (end - start + 1)
                    })
                    .then(res => {
                        console.log(res);
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '更新失败'
                    });
                });
            },
            getAuthorLine() {
                var that = this
                this.$axios.post('/apis/search/getupdatebyfilename',
                    {
                        filename: "author",
                        pagenumber: 1,
                    })
                    .then(res => {
                        console.log(res);
                        that.form.start = res.data[0].finishlinenum
                    })
            },
            getPaperLine() {
                var that = this
                this.$axios.post('/apis/search/getupdatebyfilename',
                    {
                        filename: "paper",
                        pagenumber: 1,
                    })
                    .then(res => {
                        console.log(res);
                        that.form_2.start = res.data[0].finishlinenum
                    })
            },
            logout() {
                this.$axios({
                    url: '/apis/user/logout',
                    method: "post",
                }).then(res => {
                    console.log(res);
                    this.personName = '',
                    this.picture = '',
                    this.keepLogin = true,
                    this.keepLogout = false,
                    this.admin = false,
                    this.gotoLogin()
                })
            },
            gotoLog() {
                this.$router.push('/log')
            },
            gotoReported() {
                this.$router.push('/blogreported')
            },
            gotoDoor() {
                this.$router.push('/authoritem')
            },
            gotoMsgCollection() {
                this.$router.push('/messageNav/likeMsg')
            },
            gotoMyinfo() {
                this.$router.push('/personinfo/information')
            },
            gotoMyLike() {
                this.$router.push('/personinfo/following')
            },
            gotoMyCollection() {
                this.$router.push('/personinfo/collected')
            },
            gotoLogin() {
                this.$router.push('/login')
            },
            gotoMain() {
                this.$router.push('/Search')
            },
            gotoBlog() {
                this.$router.push('/BlogDashboard/BlogDesktop')
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getData() {
                var that=this
                this.$axios({
                    url:'/apis/personality/get',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.personName = res.data.username
                    that.picture = res.data.avatar
                    that.admin = res.data.is_admin
                    that.userId = res.data.userid
                    if(this.personName !== ""){
                        this.keepLogin = false;
                        this.keepLogout = true;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .navigationlogo {
        height: 60px;
    }

    body {
        background-image: url('../../assets/image/user/image/login-back.png');
    }
</style>
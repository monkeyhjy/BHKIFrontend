<template>
    <el-container>
        <el-main>
            <div v-for="item in (index,msgCollection)" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        {{ item.name }} 评论了你的 {{item.blog_title}}
                    </div>
                    <el-button type="primary" style="margin:10px; float: right" @click="dele(item.message_id)">
                        已阅
                    </el-button>

                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import NewNavigation from "../navigatorandsearch/NewNavigation";
    export default {
        name: 'commentMsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                blank: false,
                msgCollection:[
                    {
                        name: '',
                        blog_title: '',
                        message_id: '',
                    }
                ],
            }
        },
        mounted() {
            // alert( activeIndex),
            this.getCommentMsg()
        },
        methods: {
            getCommentMsg() {
                var that=this
                this.$axios({
                    url:'/apis/message/getcommentmessage',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.msgCollection = res.data.data.msgCollection
                })
            },
            del(id){
                var index=this.msgCollection.findIndex(item => {
                    if(item.id==id) {
                        return true;
                    }
                })
                this.msgCollection.splice(index,1)
            },
            dele(id){
                var that = this
                this.$axios.post('/apis/message/readcommentmessage',
                    {
                        message_id: id
                    },).then(res=>{
                    console.log(res);
                    that.del(id)
                })
            }
        }
    }
</script>

<style scoped>
    body{
        background-image: url('../../assets/image/user/image/login-back.png');
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 1200px;
    }
</style>
<template>
    <el-container>
        <el-main>
            <div v-for="(item,index) in msgCollection" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        <p>{{ item.user }} 给你发了一条私信: </p>
                        {{item.message}}
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
        name: 'reportedMsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                msgCollection:[
                    {
                        user:'',
                        message:'',
                        message_id:'',
                    },
                ]
            }
        },
        mounted() {
            // alert( activeIndex),
            this.getPrivacyMsg()
        },
        methods: {
            getPrivacyMsg() {
                var that=this
                this.$axios({
                    url:'/apis/message/getimessage',
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
                this.$axios.post('/apis/message/readimessage',
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
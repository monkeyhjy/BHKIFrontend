<template>
    <el-container>
        <el-main>
            <div v-for="item in (index,msgCollection)" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        <p>{{ item.name }} 给你发了一条私信: </p>
                        {{item.content}}
                    </div>
                    <el-button :type="item.type==type?'primary':''" style="margin:10px; float: right" @click="dele(item.id)">
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
                        id: 1,
                        name: '1XXX',
                        content: 'YYY',
                    },
                    {
                        id: 2,
                        name: '2XXX',
                        content: 'YYY',
                    },
                    {
                        id: 3,
                        name: '3XXX',
                        content: 'YYY',
                    }
                ]
            }
        },
        mounted() {
            alert( activeIndex),
            this.getPrivacyMsg()
        },
        methods: {
            getPrivacyMsg() {
                var that=this
                this.$axios.post('/apis/message/getimessage',
                ).then(res=>{
                    console.log(res);
                    that.msgCollection = res.data.msgCollection
                })
            },
            dele(id){
                var index=this.msgCollection.findIndex(item => {
                    if(item.id==id) {
                        return true;
                    }
                })
                this.msgCollection.splice(index,1)
            },
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
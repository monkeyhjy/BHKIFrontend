<template>
    <el-container>
        <el-main>
            <div v-for="item in (index,msgCollection)" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        {{ item.name }} 收藏了你的 {{item.paper}}
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
        name: 'likemsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                msgCollection:[
                    {
                        id: 1,
                        name: '1XXX',
                        paper: 'YYY',
                    },
                    {
                        id: 2,
                        name: '2XXX',
                        paper: 'YYY',
                    },
                    {
                        id: 3,
                        name: '3XXX',
                        paper: 'YYY',
                    }
                ]
            }
        },
        mounted() {
            alert( activeIndex),
            this.getLikeMsg()
        },
        methods: {
            getLikeMsg() {
                var that=this
                this.$axios.post('/apis/message/getstarmessage',
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
            }
        }
    }
</script>

<style scoped>
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
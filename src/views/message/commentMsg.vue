<template>
    <el-container>
        <el-main>
            <div v-for="item in (index,msgCollection)" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        {{ item.name }} 评论了你的 {{item.paper}}
                    </div>
                    <el-button :type="item.type==type?'primary':''" style="margin:10px; float: right" >
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
                msgCollection:[
                    {
                        name: 'XXX',
                        paper: 'YYY',
                    },
                    {
                        name: 'XXX',
                        paper: 'YYY',
                    },
                    {
                        name: 'XXX',
                        paper: 'YYY',
                    }
                ]
            }
        },
        mounted() {
            alert( activeIndex);
        },
        methods: {
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
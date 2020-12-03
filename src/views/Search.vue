<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <div style="height: 280px;">
                <img src="../assets/logoT.png" height="320" width="350"/></div>
            <div style="margin-top: 15px; margin-bottom: 90px;">
                <el-input placeholder="请输入内容" v-model="input3"  style="width: 900px;">
                    <el-select v-model="value" slot="prepend" placeholder="请选择" style="width: 140px;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div style="margin-top: 50px; margin-bottom: 80px">
                <el-carousel :interval="4000" type="card" height="200px" style="width: 80%; margin-left: 11%">
                    <el-carousel-item class="slide" v-for="item in lights"
                                      :key="item.value"
                                      :title="item.title"
                                      :content="item.content">
                        <div style="width: 80%;">
                            <h1 class="medium" style="vertical-align: top; float: left; margin: 10px 0px 0px 10px; font-size: 30px">
                                <i class="el-icon-s-promotion" ></i>
                                {{ item.title }}
                            </h1>
                        </div>
                        <div style="margin-top: 8%">
                            <el-divider></el-divider>
                        </div>
                        <div style="margin-top: 8%;">
                            <h4 style="float: left; margin: -30px 20px 0px 20px;">{{item.content}}</h4>
                        </div>
                        <div  style="margin-top: 22%;">
                            <h2 v-bind:href="item.url" style="float: right; margin: -50px 10px 0px 0px;vertical-align: bottom;">
                                更多
                                <el-link :underline="false" v-bind:href="item.url">
                                    <i class="el-icon-right" style="font-size: 50px; color: white"></i>
                                </el-link>
                            </h2>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <el-row style="margin-bottom: 60px">
<!--                卡片-1-左-->
                <el-col :span="6" :offset="2">
                    <div>
                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px;" >
                            <div slot="header" class="clearfix" >
                                <span style="float: left">热门学术成果</span>
                            </div>
                            <div>
<!--                                <el-input placeholder="请输入学者姓名" v-model="professor" class="search_input">-->
<!--                                    <el-popover-->
<!--                                            slot="prepend"-->
<!--                                            trigger="click"-->
<!--                                            v-bind:title="professor"-->
<!--                                            v-bind:content="proRank+ '\r' + proIntroduction">-->
<!--                                        <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--                                    </el-popover>-->
<!--                                </el-input>-->
                            </div>
                            <div style="width: 380px;height: 200px;">
                                <div v-for="rank in ranks" style="width: 380px; height: 50px;">
                                    <i class="el-icon-s-flag" style="float: left; width: 40px;height: 30px; margin: 20px 0px 0px 0px;"></i>
                                    <ul style="width: 300px; height: 30px; margin: 20px 0px 0px 0px; float: right;">
                                        <el-link v-bind:href="rank.url" style="float: left;">{{rank.name}}</el-link>
                                    </ul>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
<!--                卡片-1-中-->
                <el-col :span="7" :offset="1">
                    <div>
                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">
                            <div slot="header" class="clearfix">
                                <span style="float: left">热门专家</span>
                            </div>
                            <div style="width: 380px; height: 240px">
                                <div v-for="lib in library" style="width: 380px; height: 50px; margin-top: -8px">
                                    <i class="el-icon-user-solid" style="float: left;margin-top: 5px;margin-left: 5px"></i>
                                    <ul style="float:right; width: 300px; margin-top: 5px">
                                        <el-link v-bind:href="lib.url" style="float: left">{{lib.name}}</el-link>
                                    </ul>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
<!--                卡片-1-右-->
                <el-col :span="8">
                    <div>
                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">
                            <div slot="header" class="clearfix">
                                <span style="float: left">热门帖子</span>
                            </div>
                            <div v-for="sci in science" class="text item" style="width: 380px; height: 60px;margin-top: 3% ">
                                <div style=" width: 270px ;float: left;margin-top: 3%">
                                    <el-link v-bind:href="sci.url">{{sci.name}} </el-link>
                                </div>
                                <div style="width: 100px; float: right">
                                    <img v-bind:src="sci.image" style="width: 100px; height: 60px;">
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
<!--            <el-row>-->
<!--                &lt;!&ndash;                卡片-2-左&ndash;&gt;-->
<!--                <el-col :span="6" :offset="2">-->
<!--                    <div>-->
<!--                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">-->
<!--                            <div slot="header" class="clearfix">-->
<!--                                <span style="float: left">技术洞察</span>-->
<!--                            </div>-->
<!--                            <div v-for="list in 4" :key="o" class="text item">-->
<!--                                {{'列表内容 ' + o }}-->
<!--                            </div>-->
<!--                        </el-card>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--                &lt;!&ndash;                卡片-2-中&ndash;&gt;-->
<!--                <el-col :span="7" :offset="1">-->
<!--                    <div>-->
<!--                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">-->
<!--                            <div slot="header" class="clearfix">-->
<!--                                <span style="float: left">开放数据</span>-->
<!--                            </div>-->
<!--                            <div v-for="o in 4" :key="o" class="text item">-->
<!--                                {{'列表内容 ' + o }}-->
<!--                            </div>-->
<!--                        </el-card>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--                &lt;!&ndash;                卡片-2-右&ndash;&gt;-->
<!--                <el-col :span="8">-->
<!--                    <div>-->
<!--                        <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">-->
<!--                            <div slot="header" class="clearfix">-->
<!--                                <span style="float: left">必读论文与会议</span>-->
<!--                            </div>-->
<!--                            <div v-for="o in 4" :key="o" class="text item">-->
<!--                                {{'列表内容 ' + o }}-->
<!--                            </div>-->
<!--                        </el-card>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->
        </el-main>
        <el-footer>

        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                professor: '',
                proRank: '#1',
                proIntroduction: 'Pro Introduction',
                options: [{
                    value: '选项1',
                    label: '医学'
                }, {
                    value: '选项2',
                    label: '机械工程'
                }, {
                    value: '选项3',
                    label: '计算机科学'
                }, {
                    value: '选项4',
                    label: '法学'
                }, {
                    value: '选项5',
                    label: '建筑学'
                }],
                value: '',
                lights:[{
                    value: '1',
                    title: 'AI',
                    content: 'AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...AI is...',
                    url:'https://www.aminer.cn/women-in-ai'
                },{
                    value: '2',
                    title: 'Computer',
                    content: 'Computer is...',
                    url:'https://www.aminer.cn/women-in-ai'
                },{
                    value: '3',
                    title: 'Software',
                    content: 'Software is...',
                    url:'https://www.aminer.cn/women-in-ai',
                },{
                    value: '4',
                    title: 'BUAA',
                    content: 'BUAA is...',
                    url:'https://www.aminer.cn/women-in-ai'
                },{
                    value: '5',
                    title: 'Hedgehog',
                    content: 'Hedgehog is...',
                    url:'https://www.aminer.cn/women-in-ai'
                },{
                    value: '6',
                    title: 'Beijing',
                    content: 'Beijing is...',
                    url:'https://www.aminer.cn/women-in-ai'
                }],
                ranks :[{
                    name: '学术成果1',
                    url: 'https://www.aminer.cn/women-in-ai',
                },{
                    name: '学术成果2',
                    url: 'https://www.aminer.cn/ranks/conf',
                },{
                    name: '学术成果3',
                    url: 'https://www.aminer.cn/ranks/org',
                },{
                    name: '学术成果4',
                    url: 'https://www.aminer.cn/ranks/experts',
                }],
                library:[{
                    name: '清华大学学者库',
                    url: 'https://gct.aminer.cn/eb/series?name=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6',
                },{
                    name: '哈尔滨工业大学学者库',
                    url: 'https://gct.aminer.cn/eb/series?name=%E5%93%88%E5%B0%94%E6%BB%A8%E5%B7%A5%E4%B8%9A%E5%A4%A7%E5%AD%A6',
                },{
                    name: 'CCF-A类会议系列库',
                    url: 'https://gct.aminer.cn/eb/series?name=CCF%E6%8E%A8%E8%8D%90%E4%BC%9A%E8%AE%AE[A%E7%B1%BB]',
                },{
                    name: '图灵奖学者库',
                    url: 'https://gct.aminer.cn/eb/gallery/detail/eb/58997b589ed5db58de40a152',
                },{
                    name: '图灵奖学者库',
                    url: 'https://gct.aminer.cn/eb/gallery/detail/eb/58997b589ed5db58de40a152',
                },{
                    name: '图灵奖学者库',
                    url: 'https://gct.aminer.cn/eb/gallery/detail/eb/58997b589ed5db58de40a152',
                }],
                science: [{
                    name: 'UC伯克利“拿下”最佳论文，复旦黄萱菁出任下一届程序主席丨EMNLP 2020闭幕...',
                    url: 'https://www.aminer.cn/research_report/5fb7a36dbbd017ee63f33055?download=false',
                    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2864430888,3153045832&fm=26&gp=0.jpg',
                },{
                    name: 'EMNLP 2020教程：《自然语言处理模型的可解释性研究》及相关论文...',
                    url:'https://www.aminer.cn/research_report/5fb7a094bbd017ee63f33054?download=false',
                    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2864430888,3153045832&fm=26&gp=0.jpg',
                },{
                    name: '别再熬夜了！同日两篇论文揭示：“日常熬夜”“轮班倒”可加重患心力衰竭、哮...',
                    url:'https://www.aminer.cn/research_report/5fb76bf8e8a87f775ad21f6c?download=false',
                    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2864430888,3153045832&fm=26&gp=0.jpg',
                }],
                input1: '',
                input2: '',
                input3: ''
            }
        },
        mounted(){
            this.getRanks(),
            this.getLibrary(),
            this.getScience(),
            this.getLight()
        },
        methods:{
            getRanks() {
                var that=this
                this.$axios.post('/http://182.92.239.145/apis',
                ).then(res=>{
                    console.log(res);
                    that.ranks = res.data.ranks
                })
            },
            getLibrary(){
                var that=this
                this.$axios.post('/http://182.92.239.145/apis',
                ).then(res=>{
                    console.log(res);
                    that.library = res.data.library
                })
            },
            getScience(){
                var that=this
                this.$axios.post('/http://182.92.239.145/apis',
                ).then(res=>{
                    console.log(res);
                    that.science = res.data.science
                })
            },
            getLight(){
                var that=this
                this.$axios.post('/http://182.92.239.145/apis',
                ).then(res=>{
                    console.log(res);
                    that.lights = res.data.lights
                })
            }
        }
    }
</script>

<style scoped>

    /deep/.el-carousel__item[data-v-1a1d373c]:nth-child(2n+1) {
        background-color: #df5747;
        color: white;
    }
    /deep/.el-carousel__item[data-v-1a1d373c]:nth-child(2n) {
        background-color: #f9ae8f;
        color: white;
    }
    /deep/.el-carousel__mask {
        width: 100%;
        background-color: #FFF;
        opacity: .24;
        transition: .2s;
    }
    /*#df5747*/
    /deep/ .el-card__header {
        background-color: #df5747;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    /deep/ .el-card__body {
        display: flex;
        flex-direction: column;
        background-color: white;
    }
    /deep/ .el-input__inner {
        height: 55px;
        border-style: solid solid solid solid;
        font-size: 16px;
    }

    /deep/ .el-input-group__prepend {
        /*background-color: #db8fbe;*/
        border-style: solid;
        border-radius: 27px 0 0 27px;
        /*color: white;*/
    }
    /deep/ .el-input-group__append {
        /*background-color: #db8fbe;*/
        border-style: solid;
        border-radius: 0 27px 27px 0;
        /*color: white;*/
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .el-carousel__item h3 {
        color: mediumpurple;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
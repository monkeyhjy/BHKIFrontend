<template xmlns:el-col="http://www.w3.org/1999/html">
	<div>
		<el-container>
			<el-header>导航栏</el-header>
			<el-main>
				<el-row>
					<!--				基本信息-->
					<el-col :span="4">
						<div class="grid-content"></div>
					</el-col>

					<el-col :span="20">
						<el-col :span="10" class="profile">
							<el-col :span="24" style="margin-bottom: 1rem" >
								<el-col :span="24">
									<el-popover
													placement="top-start"
													width="240"
													trigger="hover"
													content="点击可跳转到该学者的个人信息页面" style="margin-right: 1rem">
										<el-link slot="reference" style="font-size: 2rem" href="" target="_blank">{{information.name}}</el-link>
									</el-popover>
									<el-button size="mini" style="vertical-align: bottom"
														 v-if="information.isClaimed===1"
														 type="success"
														 @click="claimDisplay">认领门户</el-button>
									<el-button size="mini" style="vertical-align: bottom"
														 v-else type="info" disabled>门户已被认领</el-button>

									<el-button size="mini"
														 style="vertical-align: bottom; margin-left: 0.5rem"
														 v-if="information.isOwn===0"
														 type="danger"
														 @click="reportDisplay">举报冒领门户</el-button>

									<el-button size="mini"
														 style="vertical-align: bottom; margin-left: 0.5rem"
														 v-if="information.isFollow"
														 type="primary"
														 @click="follow">关注</el-button>

									<el-button size="mini"
														 style="vertical-align: bottom; margin-left: 0.5rem"
														 v-else
														 type="info"
														 @click="disFollow">取消关注</el-button>

									<el-button size="mini"
														 style="vertical-align: bottom; margin-left: 0.5rem"
														 type="warning">私信TA</el-button>
								</el-col>
							</el-col>
							<el-col :span="24" style="margin-bottom: 1rem; margin-left: 0;">{{information.company}}</el-col>
							<el-col :span="24" style="margin-bottom: 1rem">{{information.field}}</el-col>
							<el-col :span="24" style="margin-bottom: 1rem">{{information.email}}</el-col>
<!--							<el-col :span="24">-->
<!--								<el-col :span="4"><strong>代表作：</strong></el-col>-->
<!--								<el-col :span="20" style="text-align: left">-->
<!--									<el-col :span="24" style="margin-bottom: 0.5rem">{{information.work[0].title}}</el-col>-->
<!--									<el-col :span="24" style="margin-bottom: 0.5rem">{{information.work[1].title}}</el-col>-->
<!--									<el-col :span="24" style="margin-bottom: 0.5rem">{{information.work[2].title}}</el-col>-->
<!--								</el-col>-->

<!--							</el-col>-->

							<el-col :span="24" style="margin-top: 0.5rem">
								<el-col :span="4"><strong>作者简介：</strong></el-col>
								<el-col :span="20">{{information.introduction}}</el-col>
							</el-col>
							<el-col :span="24" style="font-size: 1.2rem; text-align: center; margin-top: 1.5rem">
								<el-col :span="6">
									<el-col :span="24" style="margin-bottom: 1rem">发表论文数</el-col>
									<el-col :span="24">{{information.paperNum}}</el-col>
								</el-col>
								<el-col :span="6">
									<el-col :span="24" style="margin-bottom: 1rem">发表项目数</el-col>
									<el-col :span="24">{{information.projectNum}}</el-col>
								</el-col>
								<el-col :span="6">
									<el-col :span="24" style="margin-bottom: 1rem">发表专利数</el-col>
									<el-col :span="24">{{information.patentNum}}</el-col>
								</el-col>
								<el-col :span="6">
									<el-col :span="24" style="margin-bottom: 1rem">被引量</el-col>
									<el-col :span="24">{{information.citeNum}}</el-col>
								</el-col>
							</el-col>
						</el-col>

						<el-col :span="9"
										style="margin-right: 1rem;">
							<div class="grid-content">
								<span style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem">相关专家网络</span>
									<div id="myNetwork"
											 style="margin-top: 1rem;
											 width: 100%; height: 25rem;
											 overflow: hidden; border: 2px solid #1da8e8"/>
							</div>
						</el-col>

						<!--					搜索框与排序按钮（搜索本人发表的所有论文）-->
						<el-col :span="24" style="margin-top: 1rem">
							<el-col :span="6">
								<el-input v-model="searchInput" placeholder="请输入内容"></el-input>
							</el-col>
							<el-col :span="3" style="text-align: left; margin-left: 0.5rem">
								<el-button type="primary" icon="el-icon-search">搜索</el-button>
							</el-col>
							<el-col :span="9" style="text-align: left; margin-left: 1rem">
								<el-button type="primary" icon="el-icon-key" @click="allSort('citeNum')">按被引量排序</el-button>
								<el-button type="primary" icon="el-icon-time" @click="allSort('declareTime')">按发表时间排序</el-button>
<!--								<el-button type="primary" icon="el-icon-s-fold" @click="allSort('title')">按名称排序</el-button>-->
							</el-col>
						</el-col>
						<!--					学术成果展示-->
						<el-col :span="24"
										style="margin-top: 1rem"
										v-for="(item, index) in information.work.slice((currentPage-1)*pageSize, currentPage*pageSize)"
										:key="index">
							<el-col :span="21" style="border: 1px solid">
								<el-col :span="24" style="margin-bottom: 1rem">
									<el-col :span="24" style="margin-bottom: 0.5rem">
										<el-col :span="12" style="text-align: left">
											{{item.title}}
										</el-col>
										<el-col :span="12" style="text-align: left">
											作者：{{item.author}}
										</el-col>
									</el-col>
									<el-col :span="24">
										<el-col :span="4">
											发表时间：{{item.declareTime}}
										</el-col>
										<el-col :span="4">
											来源：{{item.source}}
										</el-col>
										<el-col :span="4">
											被引量：{{item.citeNum}}
										</el-col>
									</el-col>

								</el-col>
							</el-col>
						</el-col>
<!--						分页器-->

					</el-col>

				</el-row>
			</el-main>

			<el-footer>
				<el-col :span="4"><div class="grid-content"></div></el-col>
				<el-col :span="16">
					<div>
							<el-pagination
											background
											layout="prev, pager, next"
											:total="information.work.length"
											:page-size="pageSize"
											:current-page="currentPage"
											@current-change="handleCurrentChange">
							</el-pagination>
						</div>
				</el-col>
				<el-col :span="4"><div class="grid-content"></div></el-col>
			</el-footer>
		</el-container>
<!--		认领门户输入框-->
		<el-dialog
						title="填写认领验证信息"
						:visible.sync="claimVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="claimClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="claimText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitClaim(claimText)">确定认领
			</el-button>
		</el-dialog>

<!--		举报冒领输入框-->
		<el-dialog
						title="填写举报信息"
						:visible.sync="reportVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="reportClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="reportText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitReport(reportText)">提交举报
			</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: "Portal",
		data() {
			return {
				information: {
					name: "tony",
					company: "BUAA",
					field: "SE",
					email: "12345@qq.com",
					introduction: '作者简介',
					work: [
						{
							title: "编译原理与技术",
							author: [
									"111",
									"222",
									"333",
							],
							declareTime: "2018-07-02",
							source: "BUAA",
							citeNum: 20,
						},
						{
							title: "软件系统分析与设计",
							author: [
								"111",
								"222",
								"333",
							],
							declareTime: "2018-08-16",
							source: "BUAA",
							citeNum: 30,
						},
						{
							title: "计算机网络",
							author: [
								"111",
								"222",
								"333",
							],
							declareTime: "2019-02-16",
							source: "BUAA",
							citeNum: 15,
						},
						{
							title: "计算机组成",
							author: [
								"111",
								"222",
								"333",
							],
							declareTime: "2019-07-25",
							source: "BUAA",
							citeNum: 40,
						},
						{
							title: "算法导论",
							author: [
								"111",
								"222",
								"333",
							],
							declareTime: "2020-01-11",
							source: "BUAA",
							citeNum: 10,
						},
						{
							title: "数字电路分析设计",
							author: [
								"111",
								"222",
								"333",
							],
							declareTime: "2017-05-19",
							source: "BUAA",
							citeNum: 50,
						},
					],
					paperNum: 10,
					projectNum: 5,
					patentNum: 2,
					citeNum: 366,
					isClaimed: 1,
					isOwn: 0,
					relativePerson: [
						{
							name: '111',
							id: '1',
						},
						{
							name: '222',
							id: '2',
						},
						{
							name: '333',
							id: '3',
						},
					]
				},
				pageSize: 2,
				currentPage: 1,
				searchResult: [

				],
				searchInput: '',
				reportVisible: false,
				reportText: '',
				claimVisible: false,
				claimText: '',
				isFollow: false,
				myChart: null,
				chartData:[],
				chartLink:[],
				upCite: false,
				upDeclareTime: false,
				upTitle: false,
				sortType: '',
			}
		},
		mounted () {
			this.graph();
		},
		methods: {
			graph() {
				let dom = document.getElementById('myNetwork');
				this.myChart = echarts.init(dom);
				this.chartData=this.dataEChart();
				this.chartLink=this.linkEChart();
				let option = {
					tooltip:{
						show:false
					},
					series: [
						{
							edgeLabel: {
								normal: {
									formatter:"{c}",
									show:true
								}
							},
							edgeSymbol:'circle',
							force:{
								repulsion: 2000
							},
							layout:'force',
							roam:true,
							itemStyle:{
								normal:{
									color: '#6495ED'
								},
								//鼠标放上去有阴影效果
								emphasis: {
									shadowColor: '#3721db',
									shadowOffsetX: 0,
									shadowOffsetY: 0,
									shadowBlur: 40,
								},
							},
							label:{
								normal:{
									show:true
								}
							},
							//头像
							// symbol: ,
							symbolSize:70,
							type:'graph',
							links: this.chartLink,
							data:this.chartData
						}
					],
					graphic: {
						elements: [{
							type: 'circle',
							draggable: false,
						}]
					},
					animation: true,

				};
				this.myChart.setOption(option);
				this.myChart.on('click', function (params) {
					console.log(params.data)//获取点击的头像的数据信息
				});
			},
			dataEChart(){
				let data = this.information.relativePerson;
				return data;
			},
			linkEChart(){
				let dataLink = [];
				for(let i = 1;i < this.information.relativePerson.length; i++){
					dataLink.push({
						value: "",
						source: "1",
						target: this.information.relativePerson[i].id,
					})
				}
				return dataLink;
			},

			claimDisplay() {
				this.claimVisible = true;
			},
			submitClaim(text) {

			},
			claimClose(done) {
				this.claimVisible = false;
			},
			reportDisplay() {
				this.reportVisible = true;
			},
			submitReport(text) {

			},
			reportClose(done) {
				this.reportVisible = false;
			},
			handleCurrentChange(val) {
				this.currentPage = val
			},
			follow() {

			},
			disFollow() {

			},


			//排序需要的函数
			allSort(type) {
				if(type === 'citeNum'){
					this.upCite = !this.upCite
					if(this.upCite)
						this.sort1(type)
					else
						this.sort2(type)
				}
				else if(type === 'declareTime'){
					this.upDeclareTime = !this.upDeclareTime
					if(this.upDeclareTime)
						this.sort1(type)
					else
						this.sort2(type)
				}

			},
			sort1(type) {
				this.sortType = type;
				this.information.work.sort(this.compare1(type));
			},
			sort2(type) {
				this.sortType = type;
				this.information.work.sort(this.compare2(type));
			},
			compare1(attr) {
				if(attr === 'citeNum'){
					return function (a, b) {
						let val1 = a[attr];
						let val2 = b[attr];
						return val1 - val2;
					}
				}
				else {
					return function (a, b) {
						let val1 = new Date(a[attr]);
						let val2 = new Date(b[attr]);
						return val1 - val2;
					}
				}
			},
			compare2(attr) {
				if(attr === 'citeNum'){
					return function (a, b) {
						let val1 = a[attr];
						let val2 = b[attr];
						return val2 - val1;
					}
				}
				else {
					return function (a, b) {
						let val1 = new Date(a[attr]);
						let val2 = new Date(b[attr]);
						return val2 - val1;
					}
				}
			},
		},
		computed: {

		},
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	&:last-child {
		 margin-bottom: 0;
	 }
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.profile {
		text-align: left;
		/*border: 2px #d3dce6;*/
		/*border-right-style: solid;*/
	}

	.echartLayout {
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
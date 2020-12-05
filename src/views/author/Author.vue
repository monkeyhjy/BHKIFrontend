<template xmlns:el-col="http://www.w3.org/1999/html">
	<div>
		<el-container>
			<el-header>
				导航栏
			</el-header>
			<el-main style="padding: 0">
				<el-row>
					<!--				基本信息-->
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-right: 0.5rem">
							<img :src="imgUrl_left" alt="" style="width: 100%; height: 100%">
						</div>
					</el-col>

					<el-col :span="16" style="margin: 0">
						<el-col :span="12" class="profile">
							<div class="grid-content">
								<div style="font-weight: 700;
								font-size: 1.2rem;
								margin-bottom: 0.5rem;
								text-align: center">基本信息</div>
								<div style="height: 25rem; margin-top: 1rem">

									<el-col :span="24" style="margin-bottom: 1rem" >
										<el-col :span="24">
											<el-popover
															placement="top-start"
															width="240"
															trigger="hover"
															content="点击可跳转到该学者的个人信息页面" style="margin-right: 1rem">
												<el-link
																slot="reference"
																style="font-size: 2rem"
																href=""
																@click="jump_to_info(author.user_id)">{{author.name}}</el-link>
											</el-popover>
											<el-button size="mini" style="vertical-align: bottom"
																 v-if="author.is_claimed===0"
																 type="success"
																 @click="submitClaim">认领门户</el-button>
<!--											<el-button size="mini" style="vertical-align: bottom"-->
<!--																 v-else type="info" disabled>门户已被认领</el-button>-->

											<el-button size="mini"
																 style="vertical-align: bottom; margin-left: 0.5rem"
																 v-if="author.is_claimed===1&&author.is_reported===0"
																 type="danger"
																 @click="reportDisplay">举报冒领门户</el-button>

											<el-button size="mini"
																 style="vertical-align: bottom; margin-left: 0.5rem"
																 v-if="author.is_claimed===1&&author.is_reported===1"
																 type="danger"
																 disabled>冒领门户已被举报</el-button>

											<el-button size="mini"
																 style="vertical-align: bottom; margin-left: 0.5rem"
																 v-if="author.is_followed===1&&author.is_claimed!==2"
																 type="primary"
																 @click="follow(0)">关注</el-button>

											<el-button size="mini"
																 style="vertical-align: bottom; margin-left: 0.5rem"
																 v-if="author.is_followed===0&&author.is_claimed!==2"
																 type="info"
																 @click="follow(1)">取消关注</el-button>

											<el-button size="mini"
																 style="vertical-align: bottom; margin-left: 0.5rem"
																 v-if="author.is_claimed!==2"
																 type="warning"
																 @click="privateMessageDisplay">私信TA</el-button>
										</el-col>
									</el-col>
									<el-col :span="24" style="margin-bottom: 1rem; margin-left: 0;">
										<i class="el-icon-office-building"></i>
										{{author.orgs}}</el-col>
									<el-col :span="24" style="margin-bottom: 1rem">
								<div style="margin-bottom: 0.5rem;" v-for="(item, index) in author.tags" :key="index">
									<i class="el-icon-s-grid"></i>
									{{item.t}}
								</div>
									</el-col>
									<el-col :span="24" style="font-size: 1.2rem; text-align: center; margin-top: 1.5rem">
										<el-col :span="8">
											<el-col :span="24" style="margin-bottom: 1rem">发表论文数</el-col>
											<el-col :span="24">{{author.n_pubs}}</el-col>
										</el-col>
										<el-col :span="8">
											<el-col :span="24" style="margin-bottom: 1rem">h指数</el-col>
											<el-col :span="24">{{author.h_index}}</el-col>
										</el-col>
										<el-col :span="8">
											<el-col :span="24" style="margin-bottom: 1rem">被引量</el-col>
											<el-col :span="24">{{author.n_citation}}</el-col>
										</el-col>
									</el-col>
								</div>
							</div>


						</el-col>

						<el-col :span="12">
							<div class="grid-content">
								<span style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem">相关专家网络</span>
									<div id="myNetwork"
											 style="margin-top: 1rem;
											 width: 100%; height: 25rem;
											 overflow: hidden; border: 2px solid #1da8e8"/>
							</div>
						</el-col>

						<!--					排序按钮-->
						<el-col :span="24" style="margin-top: 1rem; text-align: right">
								<el-button type="primary" icon="el-icon-key" @click="">按被引量排序</el-button>
								<el-button type="primary" icon="el-icon-time" @click="">按发表时间排序</el-button>
<!--								<el-button type="primary" icon="el-icon-s-fold" @click="allSort('title')">按名称排序</el-button>-->
						</el-col>
						<!--					学术成果展示-->
						<el-col :span="24"
										style="margin-top: 1rem; text-align: left"
										v-for="(item, index) in author.pubs"
										:key="index">
							<el-card class="box-card">
								<div class="text item">
									<el-col :span="12" style="margin-bottom: 1rem">
										<el-link @click="jump_to_paper(item.paper_id)" style="font-size: 1.2rem">
											<i class="el-icon-document"></i>
											{{item.title}}
										</el-link>
									</el-col>
									<el-col :span="12" style="text-align: right">
										<el-button v-if="item.is_display" @click="pub_display(index, 1)">展示给他人</el-button>
										<el-button v-else @click="pub_display(index, 0)">不展示给他人</el-button>
									</el-col>
									<el-col :span="24"
													style="margin-bottom: 1rem">
										<el-link v-for="(author, index2) in item.author"
														 :key="index2"
														 style="margin-right: 0.5rem; font-size: 16px"
														 @click="jumpToPortal(author.author_id)">
											{{author.author_name}}
											<span v-if="index2!==item.author.length-1">,</span>
										</el-link>
									</el-col>
									<el-col :span="24" style="margin-bottom: 1rem">
										{{item.venue_raw}}({{item.year}})
									</el-col>
									<el-col :span="24" style="margin-bottom: 1rem">
										<span>被引量：{{item.n_citation}}</span>
									</el-col>
								</div>
							</el-card>
						</el-col>
					</el-col>
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-left: 0.5rem">
							<img :src="imgUrl_right" alt="" style="width: 100%; height: 100%">
						</div>
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
											:total="author.n_pubs"
											:page-size="author.page_size"
											:current-page="author.current_page"
											@current-change="handleCurrentChange">
							</el-pagination>
						</div>
				</el-col>
				<el-col :span="4"><div class="grid-content"></div></el-col>
			</el-footer>
		</el-container>

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

<!--私信输入框-->
		<el-dialog
						title="请填写私信内容"
						:visible.sync="privateMessageVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="privateMessageClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="privateMessageText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitPrivateMessage(author.user_id, privateMessageText)">发送私信
			</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: "Author",
		data() {
			return {
				/*按钮的逻辑：
				1.认领：is_claimed
					0 -> 未被认领
					1 -> 已被他人认领
					2 -> 已被自己认领
				2.举报：is_reported
					0 -> 未被举报，显示举报冒领门户的按钮
					1 -> 已被举报（自己或他人），显示不能点击的按钮
				3.关注：is_followed
					0 -> 未关注
					1 -> 已关注
				*/
				imgUrl_left: require('../../assets/image/author/stair-left.jpg'),
				imgUrl_right: require('../../assets/image/author/stair-right.jpg'),
				author: {
					author_id: 0,
					user_id: 1,
					name: "tony",
					orgs: "BUAA",
					h_index: 100,
					tags: [
						{
							w: 2,
							t: '计算机网络',
						},
						{
							w: 1,
							t: '生物科学',
						},
						{
							w: 5,
							t: '软件工程',
						},
						{
							w: 3,
							t: '人工智能',
						},
					],
					n_pubs: 6,
					n_citation: 366,
					is_claimed: 1,
					is_reported: 0,
					is_followed: 0,
					relative_author: [
						{
							name: 'jinyun Hou',
							author_id: 1,
							symbolSize: 70,
						},
						{
							name: '222',
							author_id: 2,
							symbolSize: 60,
						},
						{
							name: '333',
							author_id: 3,
							symbolSize: 55,
						},
						{
							name: '444',
							author_id: 4,
							symbolSize: 50,
						},
						{
							name: '555',
							author_id: 5,
							symbolSize: 40,
						},
						{
							name: '666',
							author_id: 6,
							symbolSize: 40,
						},
						{
							name: '777',
							author_id: 7,
							symbolSize: 40,
						},
					],
					pubs: [
						{
							paper_id: 0,
							title: "编译原理与技术",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2018-07-02",
							venue_raw: "BUAA",
							n_citation: 20,
							is_display: 1,
						},
						{
							paper_id: 0,
							title: "软件系统分析与设计",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2018-08-16",
							source: "BUAA",
							n_citation: 30,
							is_display: 1,
						},
						{
							paper_id: 0,
							title: "计算机网络",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2019-02-16",
							source: "BUAA",
							n_citation: 15,
							is_display: 1,
						},
						{
							paper_id: 0,
							title: "计算机组成",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2019-07-25",
							source: "BUAA",
							n_citation: 40,
							is_display: 1,
						},
						{
							paper_id: 0,
							title: "算法导论",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2020-01-11",
							source: "BUAA",
							n_citation: 10,
							is_display: 1,
						},
						{
							paper_id: 0,
							title: "数字电路分析设计",
							author: [
								{
									author_id: 1,
									author_name: '111',
								},
								{
									author_id: 2,
									author_name: '222',
								},
								{
									author_id: 3,
									author_name: '333',
								},
							],
							year: "2017-05-19",
							source: "BUAA",
							n_citation: 50,
							is_display: 1,
						},
					],
					page_num: 2,
					page_size: 3,
					current_page: 1,
					status: 0,
				},
				searchInput: '',
				reportVisible: false,
				reportText: '',
				privateMessageVisible: false,
				privateMessageText: '',
				myChart: null,
				chartData:[],
				chartLink:[],
			}
		},
		mounted () {
			this.get_author_id();
			this.$axios.post('http://182.92.239.145/apis/',
					this.qs.stringify({
						author_id: this.author_id,
					}),
					{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.then(res => {
						if(res.data.author.status === 0){
							console.log("进入门户成功")
						}
					})
			this.graph();
		},
		methods: {
			get_author_id() {
				this.author_id = JSON.parse(this.$Base64.decode(this.$route.query.author_id))
				//console.log(this.pid);
			},
			graph() {
				let dom = document.getElementById('myNetwork');
				this.myChart = echarts.init(dom);
				this.chartData=this.dataEChart();
				this.chartLink=this.linkEChart();
				let option = {
					tooltip:{
						show:false,
					},
					series: [
						{
							//symbolSize: 40,
							type:'graph',
							layout:'force',
							links: this.chartLink,
							data:this.chartData,
							hoverAnimation: true,
							edgeLabel: {
								normal: {
									formatter:"{c}",
									show: true
								},
							},
							edgeSymbol:'circle',
							force:{
								repulsion: 1500,
								//edgeLength: 50,
								layoutAnimation: true,
							},
							focusNodeAdjacency: true,
							cursor: 'pointer',
							//roam:true,
							itemStyle:{
								normal:{
									color: {
										type: 'radial',
										x: 0.5,
										y: 0.5,
										r: 0.6,
										colorStops: [{
											offset: 0, color: 'skyblue' // 0% 处的颜色
										}, {
											offset: 1, color: 'green' // 100% 处的颜色
										}],
										global: false // 缺省为 false
									},
									borderColor: 'blue',
									borderWidth: 2,
									borderType: 'dotted',

								},
								//鼠标放上去有阴影效果
								emphasis: {
									shadowColor: '#ea7f20',
									shadowOffsetX: 0,
									shadowOffsetY: 0,
									shadowBlur: 20,
								},

							},
							lineStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: 'red' // 0% 处的颜色
									}, {
										offset: 1, color: 'blue' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								//type: 'dashed',
								curveness: 0.2,
							},
							label:{
								normal:{
									show: true,
									//position: 'right',
									//color: 'auto',
									fontFamily: 'Arial',
									fontSize: 14,
								},
							},
							categories: {

							},
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
					//console.log(params.data)//获取点击的头像的数据信息
				});
			},
			dataEChart(){
				let data = this.author.relative_author;
				return data;
			},
			linkEChart(){
				let dataLink = [];
				for(let i = 0;i < this.author.relative_author.length; i++){
					dataLink.push({
						value: this.author.relative_author[i].symbolSize,
						source: 0,
						target: this.author.relative_author[i].author_id,
					})
				}
				return dataLink;
			},

			//按钮：认领、举报、私信、关注
			//认领
			submitClaim() {
				this.$axios.post('http://182.92.239.145/apis/',
						this.qs.stringify({
							author_id: this.author.author_id,
						}),
						{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
						.then(res => {
							if(res.data.status === 0)
								this.$message({
									type: 'success',
									message: '认领成功',
								})
							this.author.is_claimed = 2
						})
			},
			//举报
			reportDisplay() {
				this.reportVisible = true;
			},
			submitReport(text) {
				if(this.reportText === '')
					this.$alert('举报内容不能为空', '系统提示', {
						confirmButtonText: '确定',
				})
				else{
					this.$axios.post('http://182.92.239.145/apis/',
					this.qs.stringify({
						report_text: text,
						author_id: this.author.author_id,
						author_user_id: this.author.user_id,
					}),
							{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.then(res => {
						if(res.data.status === 0){
							this.author.is_reported = 1 - this.author.is_reported
							this.$message({
								type: 'success',
								message: '举报成功，请等待管理员处理',
							})
						}

					})
				}
			},
			reportClose(done) {
				this.reportVisible = false;
			},
			//私信
			privateMessageDisplay() {
				if(this.author.is_claimed === 0){
					this.$alert('该门户未被认领！', '系统提示', {
						confirmButtonText: '确定'
					})
				}
				else
					this.privateMessageVisible = true;
			},
			submitPrivateMessage(id, text) {
				if(this.privateMessageText === '')
					this.$alert('私信内容不能为空', '系统提示', {
						confirmButtonText: '确定',
					})
				else{
					this.$axios.post('http://182.92.239.145/apis/',
							this.qs.stringify({
								user_id: id,
								private_message_text: text
							}),
							{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
							.then(res => {
								if(res.data.status === 0)
									this.$message({
										type: 'success',
										message: '私信发送成功',
									})
							})
				}
			},
			privateMessageClose(done) {
				this.privateMessageVisible = false;
			},
			//关注
			follow(flag) {
				if(this.author.is_claimed === 0){
					this.$alert('该门户未被认领！', '系统提示', {
						confirmButtonText: '确定'
					})
				}
				else{
					this.$axios.post('http://182.92.239.145/apis/',
							this.qs.stringify({
								user_id: this.user_id,
								flag: flag
							}),
							{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.then(res => {
						if(res.data.status === 0){
							this.author.is_followed = 1 - this.author.is_followed
							this.$message({
								type: "success",
								message: "操作成功",
							})
						}
					})

				}
			},
			//是否给别人看某个学术成果
			pub_display(index, flag) {
				this.author.pubs[index].is_display = 1-this.author.pubs[index].is_display
				this.$axios.post('http://182.92.239.145/apis/',
					this.qs.stringify({
						paper_id: this.author.pubs[index].id,
						flag: flag
					}),
					{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.then(res => {
						if(res.data.status === 0){
							this.$message({
								type: "success",
								message: "设置成功",
							})
						}
					})
			},
			//跳转门户所绑定用户的个人信息页面
			jump_to_info(user_id) {
				this.$router.push({
					path: '',
					query: {
						user_id: this.$Base64.encode(JSON.stringify(user_id)),
					}
				})
			},
			//跳转对应学术成果
			jump_to_paper(paper_id){
				this.$router.push({
					path: '/paper',
					query: {
						paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
					}
				})
			},
			//跳转对应专家门户
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/author',
					query: {
						author_id: this.$Base64.encode(JSON.stringify(author_id)),
					}
				})
			},
			//请求分页数据
			handleCurrentChange(val) {
				this.$axios.post('http://182.92.239.145/apis/',
						this.qs.stringify({page: val}),
						{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
						.then(res => {
							this.author.pubs = res.data.pubs
							if(res.data.status === 0)
								console.log('切换到第' + val + '页成功')
						})
				this.current_page = val
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
		width: 100%;
	}

	.el-select .el-input {
		width: 130px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>
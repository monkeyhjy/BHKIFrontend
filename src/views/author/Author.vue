<template xmlns:el-col="http://www.w3.org/1999/html">
	<div>
		<div>
			<new-navigation></new-navigation>
		</div>
		<el-container>
			<el-main style="padding-left: 0; padding-right: 0">
				<el-row>
					<!--				基本信息-->
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-right: 0.5rem">
<!--							<img :src="imgUrl_left" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>

					<el-col :span="16">
						<div style="margin: 0 1rem">
							<el-col :span="24">
								<div style="font-weight: 700;
								font-size: 1.5rem;
								text-align: center; margin-bottom: 1rem">基本信息</div>
								<div style="height: 25rem">
									<el-col :span="24">
										<el-col :span="24" style="margin-bottom: 1rem;">
											<el-card style="background-color: #fabca2; border-radius: 10px">
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

												<!--											<el-button size="mini" style="vertical-align: bottom"-->
												<!--																 v-else type="info" disabled>门户已被认领</el-button>-->
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===2"
																	 type="danger"
																	 @click="cancelClaim">解除认领</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===1&&author.is_reported===0"
																	 type="danger"
																	 @click="reportDisplay">举报冒领门户</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===1&&author.is_reported===1"
																	 type="danger"
																	 disabled>冒领门户已被举报</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_followed===1&&author.is_claimed!==2"
																	 type="primary"
																	 @click="follow(0)">关注</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_followed===0&&author.is_claimed!==2"
																	 type="info"
																	 @click="follow(1)">取消关注</el-button>

												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed!==2"
																	 type="warning"
																	 @click="privateMessageDisplay">私信TA</el-button>
											</el-card>

										</el-col>
									</el-col>

									<el-col :span="24" style="margin-left: 0">
										<el-card style="margin-bottom: 1rem; background-color: #fabca2;  border-radius: 10px">
											<i class="el-icon-office-building" style="margin-right: 0.5rem"></i>
											<strong>工作单位：</strong>{{author.orgs[0]}}
										</el-card>
										<el-col :span="24" style="font-size: 1rem; margin-bottom: 1rem">
											<el-card style="background-color: #fabca2;  border-radius: 10px">
												<div>
													<i class="el-icon-s-opportunity" style="margin-right: 0.5rem; margin-bottom: 0.5rem"></i>
													<strong>相关领域：</strong>
												</div>
												<el-col :span="8" style="margin-bottom: 0.5rem;" v-for="(item, index) in author.tags" :key="index">
													{{item.t}}
												</el-col>
											</el-card>

										</el-col>
										<el-col :span="24" style="font-size: 1.2rem; text-align: center; margin-bottom: 1rem">
											<el-card style="background-color: #fabca2;  border-radius: 10px">
												<el-col :span="8" style="margin-bottom: 1rem">
													<el-col :span="24" style="margin-bottom: 1rem">发表论文数</el-col>
													<el-col :span="24">{{author.n_pubs}}</el-col>
												</el-col>
												<el-col :span="8" style="margin-bottom: 1rem">
													<el-col :span="24" style="margin-bottom: 1rem">h指数</el-col>
													<el-col :span="24">{{author.h_index}}</el-col>
												</el-col>
												<el-col :span="8" style="margin-bottom: 1rem">
													<el-col :span="24" style="margin-bottom: 1rem">被引量</el-col>
													<el-col :span="24">{{author.n_citation}}</el-col>
												</el-col>
											</el-card>
										</el-col>
									</el-col>
								</div>
							</el-col>

							<el-col :span="24">
								<div class="grid-content" style="text-align: center">
									<span style="font-weight: 700; font-size: 1.5rem; margin-bottom: 0.5rem">相关专家网络</span>
									<div id="myNetwork"
											 style="margin-top: 1rem;
											 width: 100%; height: 30rem;
											 overflow: hidden; text-align: center"/>
								</div>
							</el-col>
							<!--					学术成果展示-->
							<el-col :span="24">
								<div style="text-align: center; font-size: 1.6rem"><strong>学术成果</strong></div>
								<el-divider></el-divider>
							</el-col>

							<el-col :span="24"
											style="margin-top: 1rem; text-align: left"
											v-for="(item, index) in author.pubs"
											:key="index">
								<el-card class="box-card" style="background-color: #f9aebf; border-radius: 15px" shadow="hover">
									<div class="text item">
										<el-col :span="12" style="margin-bottom: 1rem">
											<el-link @click="jump_to_paper(item.paper_id)" style="font-size: 1.2rem">
												<i class="el-icon-document"></i>
												{{item.title}}
											</el-link>
										</el-col>
										<el-col :span="12" style="text-align: right">
											<el-button v-if="item.is_display&&author.is_claimed===2" @click="pub_display(index, 1)">展示给他人</el-button>
											<el-button v-if="!item.is_display&&author.is_claimed===2" @click="pub_display(index, 0)">不展示给他人</el-button>
										</el-col>
										<el-col :span="24"
														style="margin-bottom: 1rem">
											<el-link v-for="(author, index2) in item.author"
															 :key="index2"
															 style="margin-right: 0.5rem; font-size: 16px"
															 @click="jumpToPortal(author.id)">
												{{author.name}}
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
						</div>

					</el-col>
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-left: 0.5rem">
<!--							<img :src="imgUrl_right" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>
				</el-row>
			</el-main>
			<el-footer>
				<el-col :span="4"><div class="grid-content"></div></el-col>
				<el-col :span="16">
					<div style="text-align: center;">
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
	import NewNavigation from "../navigatorandsearch/NewNavigation";

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
					is_claimed: 2,
					is_reported: 0,
					is_followed: 0,
					relative_author: [
						// {
						// 	name: 'jinyun Hou',
						// 	author_id: 1,
						// 	graph_id: 1,
						// 	symbolSize: 70,
						// 	org: '',
						// },
						// {
						// 	name: '222',
						// 	author_id: 2,
						// 	graph_id: 2,
						// 	symbolSize: 60,
						// 	org: '',
						// },
						// {
						// 	name: '333',
						// 	author_id: 3,
						// 	graph_id: 3,
						// 	symbolSize: 55,
						// 	org: '',
						// },
						// {
						// 	name: '444',
						// 	author_id: 4,
						// 	graph_id: 4,
						// 	symbolSize: 50,
						// 	org: '',
						// },
						// {
						// 	name: '555',
						// 	author_id: 5,
						// 	graph_id: 5,
						// 	symbolSize: 40,
						// 	org: '',
						// },
						// {
						// 	name: '666',
						// 	author_id: 6,
						// 	graph_id: 6,
						// 	symbolSize: 40,
						// 	org: '',
						// },
						// {
						// 	name: '777',
						// 	author_id: 7,
						// 	graph_id: 7,
						// 	symbolSize: 40,
						// 	org: '',
						// },
					],
					pubs: [
						// {
						// 	paper_id: 0,
						// 	title: "编译原理与技术",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2018-07-02",
						// 	venue_raw: "BUAA",
						// 	n_citation: 20,
						// 	is_display: 1,
						// },
						// {
						// 	paper_id: 0,
						// 	title: "软件系统分析与设计",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2018-08-16",
						// 	source: "BUAA",
						// 	n_citation: 30,
						// 	is_display: 1,
						// },
						// {
						// 	paper_id: 0,
						// 	title: "计算机网络",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2019-02-16",
						// 	source: "BUAA",
						// 	n_citation: 15,
						// 	is_display: 1,
						// },
						// {
						// 	paper_id: 0,
						// 	title: "计算机组成",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			author_name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			author_name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2019-07-25",
						// 	source: "BUAA",
						// 	n_citation: 40,
						// 	is_display: 1,
						// },
						// {
						// 	paper_id: 0,
						// 	title: "算法导论",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2020-01-11",
						// 	source: "BUAA",
						// 	n_citation: 10,
						// 	is_display: 1,
						// },
						// {
						// 	paper_id: 0,
						// 	title: "数字电路分析设计",
						// 	author: [
						// 		{
						// 			id: 1,
						// 			name: '111',
						// 		},
						// 		{
						// 			id: 2,
						// 			name: '222',
						// 		},
						// 		{
						// 			id: 3,
						// 			name: '333',
						// 		},
						// 	],
						// 	year: "2017-05-19",
						// 	source: "BUAA",
						// 	n_citation: 50,
						// 	is_display: 1,
						// },
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
				is_login: 0,
				user_id: -1,
			}
		},
		mounted () {
			this.get_author_id();
			this.get_login_status();
			this.get_author();
		},
		methods: {
			//完成
			get_login_status() {
				this.$axios.post('/apis/user/getstatus')
						.then(res => {
							this.is_login = res.data.status
							this.user_id = res.data.userid
						})
			},
			//完成
			get_author_id() {
				// this.author.author_id = JSON.parse(this.$Base64.decode(this.$route.query.author_id))
				this.author.author_id = this.$route.query.author_id
			},
			//未完成
			get_author() {
				this.$axios.post('/apis/search/getauthorbyid',
						{
							authorid: this.author.author_id,
						})
						.then(res => {
							if(res.status === 200){
								console.log("进入门户成功")
								this.author.author_id = res.data.id
								this.author.name = res.data.name
								this.author.h_index = res.data.h_index
								this.author.n_pubs = res.data.n_pubs
								this.author.tags = res.data.tags
								this.author.n_citation = res.data.n_citation
								this.author.orgs = res.data.orgs
								for(let i = 0; i < res.data.pubs.length; i++) {
									// this.author.pubs[i].paper_id = res.data.pubs[i].i;
									// this.author.pubs[i].is_display = res.data.pubs[i].is_display;
									//学术成果
									// this.$axios.post('/apis/search/getpaperbyid',
									// 		{
									// 			paperid: res.data.pubs[i].i
									// 		}).then(res2 => {
									// 	console.log(res2)
									// 	let obj = {
									// 		paper_id: res.data.pubs[i].i,
									// 		is_display: res.data.pubs[i].is_display,
									// 		title: res2.data.title,
									// 		author: res2.data.authors,
									// 		venue_raw: res2.data.venue_raw,
									// 		year: res2.data.year,
									// 		keywords: res2.data.keywords,
									// 		n_citation: res2.data.n_citation,
									// 		page_start: res2.data.page_start,
									// 		page_end: res2.data.page_end,
									// 		volumn: res2.data.volumn,
									// 		issue: res2.data.issue,
									// 		isbn: res2.data.isbn,
									// 		doi: res2.data.doi,
									// 		abstract: res2.data.abstract,
									// 	}
									// 	this.author.pubs.push(obj)
									// 	// this.author.pubs[i].title = res2.data.title
									// 	// this.author.pubs[i].author = res2.data.authors
									// 	// this.author.pubs[i].venue_raw = res2.data.venue_raw
									// 	// this.author.pubs[i].year = res2.data.year;
									// 	// this.author.pubs[i].keywords = res2.data.keywords
									// 	// this.author.pubs[i].n_citation = res2.data.n_citation
									// 	// this.author.pubs[i].page_start = res2.data.page_start
									// 	// this.author.pubs[i].page_end = res2.data.page_end
									// 	// this.author.pubs[i].volumn = res2.data.volume
									// 	// this.author.pubs[i].issue = res2.data.issue
									// 	// this.author.pubs[i].isbn = res2.data.isbn
									// 	// this.author.pubs[i].doi = res2.data.doi
									// 	// this.author.pubs[i].abstract = res2.data.abstract
									// })

								}
								//相关专家
								this.$axios.post('/apis/search/getrelatedauthor',
										{
											authorid: this.author.author_id
										}).then(res3 => {
									if(res3.data.length !== 0){
										for(let i = 0; i < res3.data.length; i++) {
											let obj = {
												name: res3.data[i].name,
												author_id: res3.data[i].id,
												graph_id: i + 1,
												symbolSize: res3.data[i].account_cooperation * 0.3 + 40,
												org: res3.data[i].org
											}
											this.author.relative_author.push(obj)
											// this.author.relative_author[i].name = res3.data[i].name
											// this.author.relative_author[i].author_id = res3.data[i].id
											// this.author.relative_author[i].graph_id = i+1
											// this.author.relative_author[i].
											// this.author.relative_author[i].org = res3.data[i].org
										}
									}
								})
								//相似专家
								this.$axios.post('/apis/search/getsimilarauthor',
										{
											authorid: this.author.author_id
										}).then(res4 => {
											if(res4.data.length !== 0) {
												let tmp_len = this.author.relative_author.length;
												for(let j = 0; j < res4.data.length; j++){
													let obj = {
														name: res4.data[j].name,
														author_id: res4.data[j].id,
														graph_id: j+tmp_len + 1,
														symbolSize: 60,
														org: res4.data[j].org
													}
													this.author.relative_author.push(obj)
													// this.author.relative_author[j+tmp_len].name = res4.data[j].name
													// this.author.relative_author[j+tmp_len].author_id = res4.data[j].id
													// this.author.relative_author[j+tmp_len].graph_id = j+tmp_len+1
													// this.author.relative_author[j+tmp_len].symbolSize = 60
													// this.author.relative_author[j+tmp_len].org = res4.data[j].org
													// this.author.relative_author[j+tmp_len] = res4.data[j]
													// JSON.parse(JSON.stringify(this.author.relative_author))
												}
												let q = JSON.parse(JSON.stringify(this.author.relative_author))
												this.graph(q);
											}
								})
							}
						})

			},
			//完成
			graph(q) {
				let dom = document.getElementById('myNetwork');
				this.myChart = echarts.init(dom);
				this.chartData = this.dataEChart(q);
				this.chartLink = this.linkEChart(this.chartData);
				let option = {
					tooltip:{
						show: false,
					},
					series: [
						{
							//symbolSize: 40,
							type:'graph',
							layout:'force',
							links: this.chartLink,
							data: this.chartData,
							hoverAnimation: true,
							edgeLabel: {
								normal: {
									formatter:"{c}",
									show: true
								},
							},
							edgeSymbol:'circle',
							force:{
								repulsion: 1300,
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
											offset: 0, color: 'pink' // 0% 处的颜色
										}, {
											offset: 1, color: 'orange' // 100% 处的颜色
										}],
										global: false // 缺省为 false
									},
									borderColor: 'grey',
									borderWidth: 2,
									borderType: 'dotted',

								},
								//鼠标放上去有阴影效果
								emphasis: {
									shadowColor: '#eab820',
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
			//完成
			dataEChart(q){
				let data = [];
				data.push({
					name: this.author.name,
					symbolSize: 100,
					graph_id: 0,
				})
				for(let i = 0; i < q.length; i++){
					data.push(q[i])
				}

				return data;
			},
			//完成
			linkEChart(data){
				let dataLink = [];
				for(let i = 0;i < data.length; i++){
					dataLink.push({
						value: data[i].symbolSize,
						source: 0,
						target: data[i].graph_id,
					})
				}
				return dataLink;
			},

			//按钮：认领、举报、私信、关注
			//解除认领，调试
			cancelClaim() {
				console.log(this.user_id)
				this.$axios.post('/apis/search/disassociatetoAuthor',
						{
							userid: this.user_id
						})
						.then(res => {
							if(res.data.status === 0){
								this.$message({
									type: 'success',
									message: '解除认领成功',
								})
								this.$router.push('/authoritem')
							}
						})
			},
			//举报输入框，未完成
			reportDisplay() {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				this.reportVisible = true;
			},
			//提交举报门户，未完成
			submitReport(text) {
				if(this.reportText === '')
					this.$alert('举报内容不能为空', '系统提示', {
						confirmButtonText: '确定',
				})
				else{
					this.$axios.post('/apis/blog/reportauthor',
				{
						author_id: this.author.author_id,
						author_user_id: this.author.user_id,
						text: text
				}).then(res => {
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
			//私信，未完成
			privateMessageDisplay() {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				else if(this.author.is_claimed === 0){
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
					this.$axios.post('/apis/message/sendmeaasge',
							{
								id: id,
								message: text
							}).then(res => {
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
			//关注，完成
			follow(flag) {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				else if(this.author.is_claimed === 0){
					this.$alert('该门户未被认领！', '系统提示', {
						confirmButtonText: '确定'
					})
				}
				else{
					this.$axios.post('/apis/user/change_follow_state',
							{
								userid: this.author.user_id,
							}).then(res => {
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
			//是否给别人看某个学术成果，完成
			pub_display(index, flag) {
				this.author.pubs[index].is_display = 1-this.author.pubs[index].is_display
				//展示出来
				if(flag === 0){
					this.$axios.post('/apis/search/paperdisplay',
							{
								user_id: this.user_id,
								paper_id: this.author.pubs[index].id,
							}).then(res => {
						if(res.status === 0){
							this.$message({
								type: "success",
								message: "设置展示成功",
							})
						}
					})
				}
				else {
					this.$axios.post('/apis/search/papernotdisplay',
							{
								user_id: this.user_id,
								paper_id: this.author.pubs[index].id,
							}).then(res => {
						if(res.status === 0){
							this.$message({
								type: "success",
								message: "设置隐藏成功",
							})
						}
					})
				}
			},
			//跳转门户所绑定用户的个人信息页面，未完成
			// jump_to_info(user_id) {
			// 	this.$router.push({
			// 		path: '',
			// 		query: {
			// 			user_id: this.$Base64.encode(JSON.stringify(user_id)),
			// 		}
			// 	})
			// },
			//跳转对应学术成果，已完成
			jump_to_paper(paper_id){
				this.$router.push({
					path: '/paper',
					query: {
						// paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
						paper_id: paper_id,
					}
				})
			},
			//跳转对应专家门户，已完成
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/author',
					query: {
						author_id: author_id,
					}
				})
			},
			//请求分页数据，未完成
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
		components: {
			NewNavigation,
		}
	}
</script>

<style>
	body{
		background-image: url('../../assets/image/user/image/login-back.png');
	}
</style>

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
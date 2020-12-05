<template>
	<div>
		<el-container>
			<el-header>导航栏</el-header>
			<el-main>
				<el-col :span="24">
					<el-col :span="4"><div class="grid-content"></div></el-col>
					<el-col :span="16" style="background-color: #fbede4;">
						<!--					标题-->
						<el-col :span="24" style="text-align: center">
							<div>
								<div style="text-align: right">
									<el-button
														 type="primary"
														 icon="el-icon-star-on"
														 v-if="paper.is_star===0"
														 circle
														 @click="star(1)"></el-button>
									<el-button
														 type="info"
														 icon="el-icon-star-off"
														 v-else
														 circle
														 @click="star(0)"></el-button>
								</div>
								<div><strong style="font-size: 1.5rem">{{paper.title}}</strong>
									<!--						作者，点击可跳转到该学者的门户页面--></div>
								<div style="margin-top: 1rem" >
									<span v-for="(item, index) in paper.authors" :key="index">
										<el-link style="font-size: 1.2rem"  @click="jumpToPortal(item.author_id)">{{item.author_name}}</el-link>
										<span style="font-size: 1.2rem"  v-if="index!==paper.authors.length-1">, </span>
									</span>
								</div>
								<!--						来源-->
								<div style="margin-top: 1rem">
									<span>{{paper.venue_raw}}, </span>
									<span v-if="paper.volumn!==''">Volumn {{paper.volumn}}, </span>
									<span v-if="paper.issue!==''">Issue {{paper.issue}}, </span>
									<span v-if="paper.year!==''">{{paper.year}}, </span>
									<span v-if="paper.page_start!==''&&paper.page_end!==''">
										Pages {{paper.page_start}}-{{paper.page_end}}
									</span>
								</div>
							</div>
						</el-col>
<!--						摘要-->
						<el-col :span="24" style="text-align: left; margin-top: 3rem">
							<strong>摘要：</strong>
							<p>{{paper.abstract}}</p>
						</el-col>
<!--						关键词-->
						<el-col :span="24" style="text-align: left">
							<strong>关键词：</strong>
							<span v-for="(item, index) in paper.keywords" :key="index">
								{{item}};
							</span>
						</el-col>
<!--						原文链接-->
						<el-col :span="24" style="text-align: left; margin-top: 1rem">
							<strong>原文链接：</strong>
							<el-link :href="paper.url" target="_blank">{{paper.url}}</el-link>
						</el-col>
<!--						被引量-->
						<el-col :span="24" style="text-align: left; margin-top: 1rem">
							<strong>被引量：</strong>
							{{paper.n_citation}}
						</el-col>
<!--						ISSN-->
						<el-col :span="24" v-if="url!==''" style="text-align: left; margin-top: 1rem">
							<strong>ISSN：</strong>
							<span>{{paper.issn}}</span>
						</el-col>
<!--							doi-->
						<el-col :span="24" v-if="url!==''" style="text-align: left; margin-top: 1rem">
							<strong>doi：</strong>
							<span>{{paper.doi}}</span>
						</el-col>
					</el-col>
					<el-col :span="4"><div class="grid-content"></div></el-col>
				</el-col>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "AcademicAchievement",
		data() {
			return {
				paper: {
					paper_id: 0,
					title: '软件系统分析与设计',
					authors: [
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
					venue_raw: '北京航空航天大学学报',
					year: 2018,
					keywords: [
						'22',
						'33',
						'44',
					],
					n_citation: 200,
					page_start: '84',
					page_end: '90',
					volumn: '60',
					issue: '25',
					issn: '',
					doi: '',
					url: 'www.baidu.com',
					abstract: '这是一篇文章的摘要',
					is_star: 0,
				},
			}
		},
		mounted() {
			this.get_paper_id();
			this.$axios.post('http://182.92.239.145/apis/',
					this.qs.stringify({
						paper_id: this.paper_id,
					}),
					{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
					.then(res => {
						if(res.data.paper.status === 0){
							this.paper = res.data.paper
							console.log("进入学术成果详情页成功")
						}
					})
		},
		methods: {
			get_paper_id() {
				this.paper_id = JSON.parse(this.$Base64.decode(this.$route.query.paper_id))
				//console.log(this.pid);
			},
			star(flag) {
				this.paper.is_star = 1 - this.paper.is_star;
				this.$axios.post('http://182.92.239.145/apis/',
						this.qs.stringify({
							paper_id: this.paper_id,
							flag: flag,
						}),
						{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
						.then(res => {
							if(res.data.status === 0){
								this.paper = res.data.paper
							}
						})
			},
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/portal',
					query: {
						author_id: this.$Base64.encode(JSON.stringify(author_id)),
					}
				})
			}
		}
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
</style>
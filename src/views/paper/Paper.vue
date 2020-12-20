<template>
	<div>
		<div>
			<new-navigation></new-navigation>
		</div>
		<el-container>
			<el-main style="padding-left: 0; padding-right: 0">
				<el-col :span="24">
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-right: 0.5rem">
<!--							<img :src="imgUrl_footer" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>
					<el-col :span="16" style="background-color: #fbede4; padding-bottom: 5rem">
						<!--					标题-->
						<div >
							<el-col :span="24" style="text-align: center; background-color: #fdc6d9; padding-bottom: 3rem">
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
										<el-link style="font-size: 1.2rem"  @click="jumpToPortal(item.id)">{{item.name}}</el-link>
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
							<div style="margin: 0 1rem">
								<!--						摘要-->
								<el-col :span="24" style="text-align: left; margin-top: 3rem">
									<strong style="font-size: 1.5rem">摘要：</strong>
									<p style="margin: 0.5rem 0 0.5rem 1rem">{{paper.abstract}}</p>
								</el-col>
								<!--						关键词-->
								<el-col :span="24" style="text-align: left; font-size: 1.5rem; margin-top: 3rem">
									<strong>关键词：</strong>
									<span v-for="(item, index) in paper.keywords" :key="index">
								{{item}};
							</span>
								</el-col>
								<!--						原文链接-->
<!--								<el-col :span="24" style="text-align: left; margin-top: 3rem; font-size: 1.5rem">-->
<!--									<strong>原文链接：</strong>-->
<!--									<el-link :href="paper.url" target="_blank" style="font-size: 1.5rem">{{paper.url}}</el-link>-->
<!--								</el-col>-->
								<!--						被引量-->
								<el-col :span="24" style="text-align: left; margin-top: 3rem; font-size: 1.5rem">
									<strong>被引量：</strong>
									{{paper.n_citation}}
								</el-col>
								<!--						isbn-->
								<el-col :span="24" style="text-align: left; margin-top: 1rem">
									<strong>ISBN：</strong>
									<span>{{paper.isbn}}</span>
								</el-col>
								<!--							doi-->
								<el-col :span="24" style="text-align: left; margin-top: 1rem">
									<strong>doi：</strong>
									<span>{{paper.doi}}</span>
								</el-col>
							</div>

						</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-left: 0.5rem">
<!--							<img :src="imgUrl_footer" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>
				</el-col>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import NewNavigation from "../navigatorandsearch/NewNavigation";

	export default {
		name: "Paper",
		components: {
			NewNavigation,
		},
		data() {
			return {
				paper: {
					paper_id: 0,
					title: '软件系统分析与设计',
					authors: [
						{
							id: 1,
							name: '111',
						},
						{
							id: 2,
							name: '222',
						},
						{
							id: 3,
							name: '333',
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
					isbn: '',
					doi: '',
					abstract: '这是一篇文章的摘要',
					is_star: 0,
				},
				user_id: -1,
				imgUrl_left: require('../../assets/image/paper/flower-left.jpg'),
				imgUrl_right: require('../../assets/image/paper/flower-right.jpg'),
				imgUrl_footer: require('../../assets/image/paper/flower2.jpg'),
			}
		},
		mounted() {
			this.get_paper_id();
			//console.log(this.paper.paper_id)

			this.$axios.post('/apis/search/getpaperbyid',
					{
						paperid: this.paper.paper_id
					})
					.then(res => {
						if(res.status === 200) {
							console.log(res)
							this.paper.title = res.data.title
							this.paper.authors = res.data.authors
							this.paper.venue_raw = res.data.venue.raw
							this.paper.year = res.data.year
							this.paper.keywords = res.data.keywords
							this.paper.n_citation = res.data.n_citation
							this.paper.page_start = res.data.page_start
							this.paper.page_end = res.data.page_end
							this.paper.volumn = res.data.volume
							this.paper.issue = res.data.issue
							this.paper.isbn = res.data.isbn
							this.paper.doi = res.data.doi
							this.paper.abstract = res.data.abstract
						}
						else {
							alert('抱歉，您所点击的论文还未收录')
							this.$router.go(-1)
						}
					})
		},
		methods: {
			get_login_status() {
				this.$axios.post('/apis/user/getstatus')
						.then(res => {
							this.user_id = res.data.userid
						})
			},
			get_paper_id() {
				this.paper.paper_id = this.$route.query.paper_id
			},
			star(flag) {
				this.paper.is_star = 1 - this.paper.is_star;
				this.$axios.post('http://182.92.239.145/apis/',
						{
							userid: this.user_id,
							paperid: this.paper.paper_id
						}
				).then(res => {
							if(res.data.status === 0){
								this.paper = res.data.paper
							}
						})
			},
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/author',
					query: {
						author_id: author_id,
					}
				})
			}
		},
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
</style>
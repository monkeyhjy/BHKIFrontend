<template>
	<div>
		<el-container>
			<el-header>导航栏</el-header>
			<el-main>
				<el-col :span="24">
					<el-col :span="4"><div class="grid-content"></div></el-col>
					<el-col :span="16" style="background-color: #98f1ee;">
						<!--					标题-->
						<el-col :span="24" style="text-align: center">
							<div>
								<div style="text-align: right">
									<el-button size="small"
														 type="primary"
														 icon="el-icon-star-on"
														 v-if="achievement.isCollected"
														 circle
														 @click="collectFail"></el-button>
									<el-button size="small"
														 type="info"
														 icon="el-icon-star-off"
														 v-else
														 circle
														 @click="collectSuccess"></el-button>
								</div>
								<strong style="font-size: 1.5rem">{{achievement.title}}</strong>
								<!--						作者，点击可跳转到该学者的门户页面-->
								<div style="margin-top: 1rem">
									<el-popover
													placement="top-start"
													width="240"
													trigger="hover"
													content="点击可跳转到该学者的门户页面"
													style="margin-left: 1rem; display: inline; text-align: center"
													v-for="(item, index) in achievement.author"
													:key="index">
										<el-link slot="reference" href="" target="_blank">{{item.name}}</el-link>
									</el-popover>
								</div>
								<!--						机构-->
								<div style="margin-top: 1rem">
									<span>{{achievement.company}}</span>
								</div>
								<!--						来源-->
								<div style="margin-top: 1rem">
									<span>{{achievement.source}}</span>
								</div>
							</div>
						</el-col>

						<el-col :span="24" style="text-align: left; margin-top: 4rem">
							<strong>摘要：</strong>
							{{achievement.abstract}}
						</el-col>
						<el-col :span="24" style="text-align: left; margin-top: 1rem">
							<strong>关键词：</strong>
							<span v-for="(item, index) in achievement.keyword" :key="index">
								{{item}};
							</span>
						</el-col>
						<el-col :span="24" style="text-align: left; margin-top: 1rem">
							<strong>原文链接：</strong>
							<el-link :href="'https://' + achievement.originLink" target="_blank">{{achievement.originLink}}</el-link>
						</el-col>
						<el-col :span="24" style="text-align: left; margin-top: 1rem">
							<strong>分类号：</strong>
							{{achievement.ISBN}}
						</el-col>
						<el-col :span="24" style="text-align: left; margin: 1rem 0">
							<strong>被引量：</strong>
							{{achievement.citeNum}}
						</el-col>

						<el-col :span="24">
							<div style="font-weight: 700; font-size: 1.5rem; margin-top: 5rem; margin-bottom: 1rem;text-align: left">
								作者简介
							</div>
						</el-col>
						<el-col :span="24"
										:gutter="20"
										v-for="(item,index) in achievement.author"
										:key="index">
							<el-col :span="2"><div class="grid-content"></div></el-col>
							<el-col :span="20">
								<el-card shadow="hover" style="text-align: left">
									<div>
										<el-link href="" style="font-size: 1.5rem">{{item.name}}</el-link>
									</div>
									<el-col :span="3">
										<p>作者简介：</p>
									</el-col>
									<el-col :span="21">
										<p style="color:gray">{{item.introduction}}</p>
									</el-col>
								</el-card>
							</el-col>
							<el-col :span="2"><div class="grid-content"></div></el-col>
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
		name: "AcadamicAchievement",
		data() {
			return {
				achievement: {
					title: '软件系统分析与设计',
					author: [
						{
							name: '111',
							introduction: '作者简介1',
						},
						{
							name: '222',
							introduction: '作者简介2',
						},
						{
							name: '333',
							introduction: '作者简介3',
						},
					],
					company: 'BUAA',
					source: '北京航空航天大学学报',
					abstract: '123123123',
					keyword: [
							'22',
							'33',
							'44',
					],
					originLink: 'www.baidu.com',
					ISBN: 'TF306.6',
					citeNum: 200,
					isCollected: true,
				}
			}
		},
		methods: {
			collectSuccess() {
				this.achievement.isCollected = !this.achievement.isCollected;
			},
			collectFail() {
				this.achievement.isCollected = !this.achievement.isCollected;
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
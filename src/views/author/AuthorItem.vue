<template>
	<div>
		<div>
			<new-navigation></new-navigation>
		</div>
		<div>
			<el-container>
				<el-main>
					<el-row>
						<el-col :span="24">
							<el-col :span="4"><div class="grid-content"></div></el-col>
							<el-col :span="16">
								<div style="text-align: center; margin: 3rem 0"><strong style="font-size: 2rem">请选择您要认领的门户。</strong></div>
								<el-card
												style="background-color: #fabca2; border-radius: 10px; margin-top: 1rem"
												 v-for="(item, index) in author_item" :key="index">
									<el-col :span="24">
										<span style="font-size: 2rem;">{{item.name}}</span>
										<el-button style="vertical-align: bottom; margin-left: 5rem"
															 type="danger"
															 @click="submitClaim(item.author_id)">认领门户</el-button>
									</el-col>
									<el-col :span="24" style="margin-top: 1rem">
										<span style="font-size: 1.4rem;">
											<i class="el-icon-office-building"></i>
											{{item.orgs}}
										</span>
									</el-col>
									<el-col :span="24" style="margin-top: 1rem">
										<span style="font-size: 1.4rem">
											<i class="el-icon-s-grid"></i>
											相关领域：</span>
										<span style="font-size: 1.4rem;" v-for="(item2, index2) in item.tags" :key="index2">
											{{item2.t}}；</span>
									</el-col>
									<el-col :span="24" style="margin-top: 1rem; margin-bottom: 1rem">
										<span style="font-size: 1.4rem;">
											<i class="el-icon-s-opportunity"></i>
											发表论文数：{{item.n_pubs}}</span>
									</el-col>
								</el-card>
							</el-col>
							<el-col :span="4"><div class="grid-content"></div></el-col>
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
											:total="author_item.length"
											:page-size="page_size"
											:current-page="current_page"
											@current-change="handleCurrentChange">
							</el-pagination>
						</div>
					</el-col>
					<el-col :span="4"><div class="grid-content"></div></el-col>
				</el-footer>
			</el-container>
		</div>

	</div>
</template>

<script>
	import NewNavigation from "../navigatorandsearch/NewNavigation";

	export default {
		name: "AuthorItem",
		data() {
			return {
				author_item: [
				{
					author_id: 1,
					name: "tony",
					orgs: "BUAA",
					tags: [
						{
							w: 2,
							t: '计算机网络',
						},
						{
							w: 1,
							t: '生物科学',
						}
					],
					n_pubs: 6,
				},
				{
					author_id: 2,
					name: "tony",
					orgs: "BUAA",
					tags: [
						{
							w: 5,
							t: '软件工程',
						},
						{
							w: 3,
							t: '人工智能',
						},
					],
					n_pubs: 8,
				},
				{
					author_id: 3,
					name: "tony",
					orgs: "BUAA",
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
					n_pubs: 10,
				},
				{
					author_id: 1,
					name: "tony",
					orgs: "BUAA",
					tags: [
						{
							w: 2,
							t: '计算机网络',
						},
						{
							w: 1,
							t: '生物科学',
						}
					],
					n_pubs: 6,
				},
				{
					author_id: 2,
					name: "tony",
					orgs: "BUAA",
					tags: [
						{
							w: 5,
							t: '软件工程',
						},
						{
							w: 3,
							t: '人工智能',
						},
					],
					n_pubs: 8,
				},
				{
					author_id: 3,
					name: "tony",
					orgs: "BUAA",
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
					n_pubs: 10,
				},
				],
				page_size: 5,
				page_num: 2,
				current_page: 1,
			}
		},
		components: {
			NewNavigation,
		},
		mounted() {
			this.get_author_list();
		},
		methods: {
			get_author_list() {
				this.$axios.post('http://182.92.239.145/apis/',)
				.then(res => {
					if(res.data.status === 0){
						//返回类型，如果type为0代表已认领，直接跳转到认领页面
						//如果type为1代表未认领，此时返回的author为0或者任意负数（反正不能是合法数字）显示备选门户列表
						if(res.data.type === 0){
							this.$router.push({
								path: '/author',
								query: {
									author_id: this.$Base64.encode(JSON.stringify(res.data.author_id)),
								}
							})
						}
						else {
							alert('只有在个人信息页面填入合法姓名之后才能认领门户。\n' +
									'合法姓名例如：Zhang SanSi\n' +
									'（如果已完善姓名，请忽略本信息）')
						}
					}
				})
			},
			submitClaim(author_id) {
				this.$axios.post('http://182.92.239.145/apis/',
						this.qs.stringify({
							author_id: author_id,
						}),
						{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
						.then(res => {
							if(res.data.status === 0){
								this.$message({
									type: 'success',
									message: '认领成功',
								})
								this.$router.go(0);
							}
							else{
								this.$message({
									type: 'danger',
									message: '认领失败',
								})
							}
						})
			},
			handleCurrentChange(val) {
				this.$axios.post('http://182.92.239.145/apis/',
						this.qs.stringify({page: val}),
						{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
						.then(res => {
							this.author_item = res.data.author_item
							if(res.data.status === 0)
								console.log('切换到第' + val + '页成功')
						})
				this.current_page = val
			},
		}
	}
</script>

<style scoped>
	body{
		background-image: url('../../assets/image/user/image/login-back.png');
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
</style>
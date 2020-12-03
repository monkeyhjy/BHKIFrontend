<template>
  <div class="personInfo">
    <el-row class="main" :gutter="20">
      <el-col :span="3" >
          <el-menu
          router
          default-active=activeIndex
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#df5747"
          text-color="#fff"
          active-text-color="rgb(255,221,0)">
          <el-menu-item index="/personinfo/information">
              <!-- <img class="nav-icon" src="../icons/attribute.png"/> -->
              <i class="el-icon-user-solid nav-icon"></i>
              <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/personinfo/following">
              <i class="el-icon-star-on nav-icon"></i>
              <span slot="title">我的关注</span>
          </el-menu-item>
          <el-menu-item index="/personinfo/collected">
              <i class="el-icon-s-management nav-icon"></i>
              <span slot="title">我的收藏</span>
          </el-menu-item>
          </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
    </div>
</template>

<script>

export default {
  name: 'PersonInfo',
  components: {
  },
  data(){
      return{
          activeIndex: this.$route.path,
      }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(this.$route.path)
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
@import "../css/button_tabnav.css";
.nav-icon{
    color:white
}

.el-button--primary {
    color: #FFF;
    background-color:#df5747;
    border-color: #f9ae8f;
}
.el-button--primary:hover {
    background-color: #e07a6e;
    border-color: #f9ae8f;
}
.el-button--default:hover {
    color: #df5747;
    border-color: #df5747;
    background-color: #f8e2d7
}
.el-button--primary:active{
    background:#e24533;
}
.el-button--primary:focus{
    background:#e24533;
    border-color: #f9ae8f;
}
.el-button--default:active{
    background:#f7ceb9;
}
.el-button--default:focus{
    color: #df5747;
    border-color: #f3ccba;
    background-color: #f7eee9
}

</style>

<!--<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.14.1/lib/index.js"></script>-->

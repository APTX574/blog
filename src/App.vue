<template>
  <el-container>
    <el-aside width="320px">
      <div>
        <div class="logo"><strong>LOGO</strong></div>
        <el-card class="box-card">
          <el-avatar size="mini"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <p class="userName">{{ userName }}</p>
          <p></p>
          <p class="userInter">{{ inter }}</p>
        </el-card>
      </div>

    </el-aside>
    <el-container>
      <el-header>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >

          <el-menu-item @click="linkTo(1)" index="1">
            主页
          </el-menu-item>
          <el-menu-item @click="linkTo(2)" index="2">
            发现
          </el-menu-item>
          <el-menu-item @click="linkTo(3)" index="3">
            发布
          </el-menu-item>
          <el-menu-item @click="linkTo(4)" index="4">
            设置
          </el-menu-item>
          <el-menu-item @click="linkTo(5)" index="5">
            关于我们
          </el-menu-item>

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input
                    v-model="serchTexT"
                    placeholder="请输入关键词"
                >
                </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button type="primary">搜索博客</el-button>
            </el-col>
          </el-row>
        </el-menu>
      </el-header>f
      <el-main>
        <transition name="fade" >
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import axios from "axios";


export default {

  name: 'App',
  data() {
    return {
      userName: "s",
      inter: `s`,
      serchTexT: ''
    }
  },
  methods: {
    getUser() {
      axios.get('http://localhost:3001/user', {
        params: {
          id: 0
        }
      }).then((value) => {
        this.inter = value.data.inter;
        this.userName = value.data.userName
        console.log(value.data.userName)
      })
    },
    linkTo(index) {
      switch (index) {
        case 1:
          this.$router.push('/');
          break;
        case 2:
          this.$router.push('/discove');
          break;
        case 3:
          this.$router.push('/write');
          break;
        case 4:
          this.$router.push('/setting');
          break;
        case 5:
          this.$router.push('/about');
          break;

      }
    }
  },

  created() {
    this.getUser();
    // Window.load();

  }
}
</script>


<style>
.el-header {
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  /*text-align: center;*/
  line-height: 20px;
  height: 700px;
}


.userName {
  font-size: 20px;
}

.userInter {
  font-size: 13px;
}


.el-main .el-card {
  padding: 20px;
  margin: 20px;
}

.logo {
  margin-top: 0;
  height: 60px;
  background-color: #fff;
  font-size: 40px;
  line-height: 60px;
}

.el-aside .el-card {
  margin-top: 60px;

  padding: 15px;
  margin-left: 20px;
  margin-right: 20px;
}

.fade-leave {
  opacity: 1
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opcaity: 0
}

</style>

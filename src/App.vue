<template>
  <el-container>
    <el-aside width="320px">
      <div>
        <div class="logo">
          <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f9d0/u1f9d0_u1f924.png"/>
        </div>
        <el-card class="box-card">
          <el-avatar size="mini"
                     src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f62f/u1f62f_u1f924.png"
          ></el-avatar>
          <p class="userName">{{ userName }}</p>
          <p></p>
          <p class="userInter">{{ inter }}</p>
          <el-button type="primary" @click="login">点击发送请求登录</el-button>
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
          <el-menu-item @click="linkTo(3)" ref="3" index="3">
            发布
          </el-menu-item>
          <el-menu-item @click="linkTo(4)" index="4">
            设置
          </el-menu-item>
          <el-menu-item @click="linkTo(5)" ref="5" index="5">
            关于我们
          </el-menu-item>
          <el-menu-item @click="linkTo(6)" index="6">
            {{ this.userId != 0 ? '退出' : '登录/注册' }}
          </el-menu-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input
                    v-model="searchText"
                    placeholder="请输入关键词"
                >
                </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="web3">搜索博客</el-button>
            </el-col>
          </el-row>
        </el-menu>
      </el-header>
      <el-main>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import axios from "axios";
import router from "@/router";
// const web=window.cont;

export default {

  name: 'App',
  data() {
    return {
      userName: "欢迎登录",
      inter: `这是我我们网页的简介`,
      searchText: '',
      blogs: [],
      userId: window.userId
    }
  },
  watch: {
    $route(to) {

      if (to.path === '/home' || to.path === '/write' || to.path === '/setting') {
        if (window.userId === undefined) {
          this.$router.back();
          this.$alert('请点击登录界面', '还未登录', {
            confirmButtonText: '确定',
            callback: () => {
              this.$message({
                type: 'warning',
                message: `请点击登录`
              });
            }
          })
        }

      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const list = ['/discover', '/', '/about'];
    console.log(list.indexOf(to.path))
    if (window.userId === undefined && list.indexOf(to.path) === -1) {

      router.replace('/discover')
    } else {
      next();
    }
  }
  ,
  methods: {
    getUser() {
      console.log('a' + window.userId);
      axios.get(`http://localhost:3002/user`, {
        params: {
          user: window.userId
        }
      }).then((value) => {
        console.log(value);
        this.inter = value.data.user_information;
        this.userName = value.data.user_name;
      })
    }
    ,
    login() {
      window.cont.login().then(userId => {
        window.userId = userId;
        if (window.userId !== undefined) {
          this.getUser();
          this.$router.push({
            path: '/home',
            query: {
              userId: window.userId
            }
          })
        } else {
          this.$alert('点击跳转注册界面', '还未注册', {
            confirmButtonText: '确定',
            callback: () => {
              console.log(this);
              this.$router.push('/register');
            }
          });
        }
        //TODO 设置判断，登录是否成功，登录失败则跳转注册，成功则记录window.userId
      })
    }
    ,
    search() {
      console.log(this.searchText);
      console.log(11);
      this.$router.push({
        path: '/search',
        query: {
          searchText: this.searchText
        }
      })
    }
    ,
    linkTo(index) {
      switch (index) {
        case 1:
          this.$router.push({
            path: '/home',
            query: {
              userId: window.userId
            }
          })
          break;
        case 2:
          this.$router.push('/discover');
          break;
        case 3:
          this.$router.push('/write');
          break;
        case 4:
          this.$router.push('/setting');
          break;
        case 5:
          this.$router.push('/about');
          this.my_reg = 0;
          break;
        case 6:
          this.$router.push('/register');
          break;
      }
    }
  }
  ,

  created() {
    // this.getUser();
    Window.load();
    this.$router.replace('/discover');
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
  display: inline-table;
  height: 710px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.logo img {
  width: 60px;
}

.html, body {
  width: 100%;
  height: 100%;
}
</style>

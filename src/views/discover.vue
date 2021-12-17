<template>
  <transition :name="fade">
    <div>
      <el-card v-for="blog in blogs" :key="blog.id">
        <h2 @click="showBlog(blog.id)">{{ blog.title }}</h2>
        <v-md-preview :text=blog.information.substring(0,100)></v-md-preview>
        <div class="time">{{ setTime(blog.send_time) }}</div>
      </el-card>
      <el-empty v-show="blogs.length===0" description="description"></el-empty>

    </div>
  </transition>
</template>
<script>
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      blogs: [],
      blog: {},
      url:process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    getBlogs() {
      axios.get(
          `http://localhost:3002/discover`
      ).then((value) => {
        this.blogs = value.data;

        console.log(value.data);

      });
    },
    showBlog(id) {
      // console.log(id);
      this.$router.push({
        path: '/show',
        query: {
          blogId: id
        }
      })
    },
    setTime(timestamp) {
      let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000

      let Y = date.getFullYear() + '年';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  created() {
    this.getBlogs();
  }
}
</script>
<style>

.time {
  text-align: right;
  margin-right: 40px;
  color: #9d9d9d;
}

</style>

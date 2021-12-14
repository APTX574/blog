<template>
  <transition :name="fade">
    <div>
      <el-card v-for="blog in blogs" :key="blog.id">
        <h2 @click="showBlog(blog.id)">{{ blog.title }}</h2>
        <v-md-preview :text=blog.information.substring(0,100)></v-md-preview>
        <div class="time">{{ blog.send_time }}</div>
      </el-card>
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
        // console.log(value.data);
        // console.log(this.blogs);
        // console.log(value.data)
        // console.log(this.blogs[1].main)
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

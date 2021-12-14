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
  name: 'search',
  data() {
    return {
      blogs: [],
      searchText:this.$route.query.searchText,

    }
  },
  methods: {
    searchBlogs() {
      console.log(this.searchText);
      axios.get(`http://localhost:3002/search`, {
        params: {
          msg:this.searchText
        }
      }).then((value) => {
        console.log(value.data);
        this.blogs = value.data;

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
    this.searchBlogs();
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

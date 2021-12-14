<template>
  <el-card>
    <h2>{{ blog.title }}</h2>
    <div class="time">
      <p>{{ blog.time }}</p>
    </div>
    <v-md-preview :text=blog.information></v-md-preview>
  </el-card>
</template>
<script>
import axios from "axios";

export default {
  name: "show",
  data() {
    return {
      blogId: this.$route.query.blogId,
      blog: {},
      url: process.env.VUE_APP_BASE_URL

    }
  }, methods: {
    getBlog() {
      axios.get(`http://localhost:3002/getblogs`, {
        params: {
          id: this.blogId,
        }
      }).then((value) => {
        this.blog = value.data[0];
        console.log(this.blog);
        // console.log(value.data)
        // console.log(this.blogs[1].main)
      });
    },
  }
  ,
  computed: {
    // blog(){
    //   return this.$router.query.blog
    // }
  },
  created() {
    this.getBlog();
  }

}
</script>
<style>

.el-card {
  padding: 20px;
  margin: 20px;
}

.v-md {
  background-color: #fff;
  height: 600px;
  width: 1000px;
  margin: 0 auto;
}


</style>

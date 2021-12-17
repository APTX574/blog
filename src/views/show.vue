<template>
  <el-card>
    <h2>{{ blog.title }}</h2>

    <v-md-preview :text=blog.information></v-md-preview>
    <div class="time">
      <p>发布于{{setTime( blog.send_time )}}</p>
    </div>
    <div class="time">
      <p >最后修改于{{setTime( blog.send_time )}}</p>
      <p>文章hash值为：{{blog.hash_code}}}</p>
      <el-button type="primary" size="medium" round @click="addBlog">上区块链链验证文章</el-button>

    </div>

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


    }
  }, methods: {
    getBlog() {
      axios.get(`http://localhost:3002/getblogs`, {
        params: {
          id: this.blogId,
        }
      }).then((value) => {
        this.blog = value.data[0];

      });
    },
    setTime(timestamp) {
      let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '年';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

      return Y + M + D + h + m;
    }
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

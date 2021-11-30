<template>
  <transition name="fade" >
    <div>
      <el-card>
        <h2>{{ blog.title }}</h2>
        <div class="time">
          <p>{{ blog.time }}</p>
        </div>
        <v-md-preview :text=blog.main></v-md-preview>
      </el-card>

    </div>
  </transition>
</template>
<script>
import axios from "axios";

export default {
  name: "show",
  data() {
    return {
      blogId: this.$route.query.blogId,
      blog:{}
    }
  }, methods: {
    getBlog(){
      axios.get('http://localhost:3001/getblog',{params:{
        id:this.blogId
        }}).then(value => {
        this.blog=value.data
      })
    }
  },
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

.el-card{
  padding: 20px;
  margin: 20px;
}
.v-md {
  background-color: #fff;
  height: 600px;
  width: 1000px;
  margin: 0 auto;
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

<template>
  <transition :name="fade">
    <div>
      <v-md-editor v-model="text" height="450px"></v-md-editor>
      <el-row>
        <el-col align="right" class="button">
          <el-button type="primary" size="medium" round @click="addBlog">发布博客</el-button>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      text: '',
      url: process.env.VUE_APP_BASE_URL

    };
  },
  computed: {
    title() {
      let t=this.text.split('\n')[0];
      return t.split('#')[t.split('#').length-1];
    },
    information() {
      let len=this.text.split('\n')[0].length;
      return this.text.slice(len+1);
    },
    time(){
      let now=Date();
      return now;
    }
  },
  methods: {
    addBlog() {
      let now=Date("yy-mm-dd hh:mm:ss");
      console.log(now);
      console.log(this.time);
      axios.request({
        url:'http://localhost:3002/addblog',
        method:'post',
        params:{
          blog: {
            title: this.title,
            information: this.information,
            owner: 1,
            send_time:this.now,
            alter_time:this.now
          }
        }
      }).then((value)=>{
        if(value.data){
          this.text="添加成功";
        }
      })

    }
  }
};
</script>
<style>
.v-md-editor {
  margin-top: 40px;
}

.button {
  margin-top: 30px;
}
</style>

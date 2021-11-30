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

    };
  },
  computed: {
    title(){
      return this.text.split('\n')[0];
    },
    main1(){
      return this.text.slice(this.title.length);
    }
  },
  methods: {
    addBlog() {
    axios.post('http://localhost:3001/addblog',{

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

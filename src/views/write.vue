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

import {sha256} from "js-sha256";

export default {
  data() {
    return {
      text: '',


    };
  },
  components:{

  },
  computed: {
    title() {
      let t = this.text.split('\n')[0];
      return t.split('#')[t.split('#').length - 1];
    },
    information() {
      let len = this.text.split('\n')[0].length;
      return this.text.slice(len + 1);
    },

  },
  methods: {
    addBlog() {
      let hashcode='0x'+sha256(this.information);
      window.cont.addBlog(this.title, hashcode).then(value => {
        console.log(value);
        let data=value.events.addBlog_event.returnValues;
        let addtime=data.add_time;
        let blogid=data.blog_id;
        console.log(hashcode.length);
        let blog={
          title: this.title,
          information: this.information,
          owner: window.userId,
          send_time:addtime,
          alter_time:addtime,
          hash_code:hashcode,
          id:blogid
        }
        // console.log(blog)
        axios.post(
            'http://localhost:3002/addblog',
            {
              blog: blog
            }).then((value) => {
              console.log(value);
        })
        this.$alert(`发布内容哈希：
        ${hashcode.slice(0,33)}
        ${hashcode.slice(33,66)}
        ${'\t\t区块高度：'+value.blockNumber}
        ${'\t\t gas花费：'+value.gasUsed}`, '发布成功', {
          confirmButtonText: '确定',
          // callback: action => {
          //   this.$message({
          //     type: '',
          //     message: ` `
          //   });
          // }
        });
      })
    }
  },

}

</script>
<style>
.v-md-editor {
  margin-top: 40px;
}

.button {
  margin-top: 30px;
}
</style>

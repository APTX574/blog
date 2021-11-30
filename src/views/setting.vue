<template>

    <el-card class="set">
      <div class="set-dev">

      <h2>个人信息</h2>
      <el-row class="userName">
        <el-col :span=3><label>昵称：</label></el-col>
        <el-col :span=19>
          <el-input v-model="name"></el-input>
        </el-col>
      </el-row>

      <el-row class="textarea">
        <el-col :span=3><label>简介：</label></el-col>
        <el-col :span=19>
          <el-input type="textarea" rows="11" v-model="inter"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" id="setbut">提交修改</el-button>
      </el-row>
      </div>

    </el-card>

</template>
<script>
import axios from "axios";

export default {
  name: 'setting',
  data() {
    return {
      name: '',
      inter: ''
    }
  },
  methods: {
    getUser() {
      axios.get('http://localhost:3001/user', {
        params: {
          id: 0
        }
      }).then((value) => {
        this.inter = value.data.inter;
        this.name = value.data.userName
      })
    },
  },
  created() {
    this.getUser();
  }
}
</script>
<style>

.set-dev{
  margin: 0 auto;
  padding-left: 20px;

}
.set {
  height: 500px;
  width: 1000px;
}

.textarea {
  height: 250px;
  line-height: 250px;
  font-size: 20px;

}

.userName {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}

#setbut {
  margin-top: 40px;
  margin-left: 430px;
}
</style>

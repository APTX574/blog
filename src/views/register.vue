<template>

  <el-card class="set">
    <div class="set-dev">

      <h2>注册</h2>
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
        <el-button type="primary" id="setbut" @click="register">注册</el-button>

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
      inter: '',

    }
  },
  methods: {


    register() {
      if (window.userId!==undefined) {
        this.$alert('即将跳转', '已经登录', {
          confirmButtonText: '确定',
          function () {
            console.log(this);
            this.$router.push('/home');
          }
        });
      } else {
        window.cont.register(this.name, this.inter).then( (value)=> {
          let data = value.events.creatUser.returnValues;
          let userId = data.userId;
          let hashcode = data.hash;
          axios.post("http://localhost:3002/register", {
            user: {
              id: userId,
              hash_code: hashcode,
              address: window.cont.account,
              user_information: this.inter,
              user_name: this.name
            }
          }).then( (data)=>{
            if (data) {
              window.userId = userId;
              this.$alert('即将跳转', '注册成功', {
                confirmButtonText: '确定',
                callback:  ()=> {
                  this.$router.push('/home');
                }
              });
            }
          })
        })
      }
    }

  },
  created() {
  }
}
</script>
<style>

.set-dev {
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

<template>
  <div>
    <p style="border-bottom: 1px solid #E5E5E5;">当前余额:<span class="money">{{ $store.state.user.ubanlance }}￥</span></p>
    <p style="font-size: 25px">账户充值:</p>
    <div>
      <span>请选择充值金额:</span>
      <el-radio-group v-model.number="money">
        <el-radio-button label="100">100￥</el-radio-button>
        <el-radio-button label="200">200￥</el-radio-button>
        <el-radio-button label="300">300￥</el-radio-button>
        <el-radio-button label="500">500￥</el-radio-button>
      </el-radio-group>
      <div class="bottom">
        充值<el-input v-model.number="money" placeholder="输入" type="number"></el-input>元
        <p>
          <el-button style="margin-left: 40px" type="success" size="small" @click="submit">确认充值</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";

export default {
  name: "ShowBalance",
  data() {
    return {
      money: 100
    }
  },
  methods: {
    submit() {
      this.$confirm('是否确定充值？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      }).then(() => {
        if (this.money <= 0) {
          this.$alert("请输入正确的金额！")
        } else {
          requests({
            url: 'http://localhost:8081/ssm/UpdateBalance',
            params: {money: this.money, uid: this.$store.state.user.uid},
            method: 'post'
          }).then(response => {
            this.$store.state.user = response.data
            this.$message.success("充值成功！")
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.money {
  font-size: 25px;
  color: red;
}

/deep/ .el-radio-button__inner {
  margin: 0 5px;
  border: 1px solid #E5E5E5;
}

/deep/ .el-input__inner {
  width: 80px;
  display: inline;
  margin: 0 6px;
}

/deep/ .el-input {
  display: inline;
}

.bottom {
  margin-top: 20px;
}
</style>
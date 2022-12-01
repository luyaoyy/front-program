<template>
  <div class="body">
    <div class="bk">
      <div class="left">
      </div>
      <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginForm" label-width="auto"
               label-position="left">
        <h2 class="loginTitle">Sign in Here</h2>
        <el-form-item prop="username" label="用户名:">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"
                    auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="false" ref="aaa"
                    prefix-icon="el-icon-s-goods" show-password></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码:">
          <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码" auto-complete="false"
                    style="width: 150px;margin-right: 10px" @keyup.enter.native="submit"></el-input>
          <img :src="loginForm.codeUrl" @click="changeImg">
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="loginForm.identity">
            <el-radio label="用户"></el-radio>
            <el-radio label="系统管理员"></el-radio>
          </el-radio-group>
          <br>
          <input type="checkbox"> <span>记住密码</span>
          <el-button size="mini" type="primary" @click="dialogVisible = true" style="margin-left: 120px">用户注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 85%;margin: 0 auto" @click="submit">登入</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
          center
          :visible.sync="dialogVisible"
          width="45%"
          :before-close="handleClose">
        <h2 slot="title" style="margin: 0;padding: 0">用户注册</h2>
        <el-form
            :model="registeForm"
            ref="registeForm"
            label-position="right"
            :rules="rules"
            label-width="90px"
            class="registeForm">
          <el-form-item label="用户名:" prop="uname">
            <el-input placeholder="请输入姓名" name="name" v-model="registeForm.uname"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="ugender">
            <el-select v-model="registeForm.ugender" clearable placeholder="请选择性别">
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="uage">
            <el-input placeholder="请输入年龄" v-model.number="registeForm.uage"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="upassword">
            <el-input type="password" placeholder="请输入密码" v-model="registeForm.upassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" placeholder="请再次输入密码" v-model="registeForm.checkPass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="uphone">
            <el-input placeholder="请输入手机号" v-model="registeForm.uphone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱(选填):">
            <el-input placeholder="请输入邮箱" v-model="registeForm.uemail"></el-input>
          </el-form-item>
          <el-form-item label="地址(选填):">
            <el-input placeholder="请输入地址" v-model="registeForm.uadress"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfireRegister">确 定</el-button>
          <el-button @click="resetForm('registeForm')">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";
import {getCode, registe, checkName} from "@/api";

export default {
  name: 'LoginForm',
  data() {
    var checkUname = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('用户名不能为空'));
      } else if (value.length > 10) {
        return callback(new Error('用户名长度超过10'))
      } else {
        checkName(value).then((response) => {
          if (!response.data) {
            callback(new Error("用户名重复"))
          } else {
            callback()
          }
        })
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error('年龄不能为空'));
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value <= 0 || value >= 110) {
          callback(new Error('您输入的年龄大小有误'));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
      callback()
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registeForm.upassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
      callback()
    }
    return {
      dialogVisible: false,
      loginForm: {
        username: "",
        password: "",
        identity: "用户",
        code: "",
        codeUrl: ""
      },
      registeForm: {
        uname: '',
        uage: null,
        upassword: '',
        checkPass: '',
        ugender: '',
        uphone: '',
        uemail: '',
        uadress: '',
      },
      genders: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        uname: [{required: true, validator: checkUname, trigger: 'blur'}],
        upassword: [{required: true, validator: validatePass, trigger: 'blur'}],
        checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}],
        uage: [{required: true, validator: checkAge, trigger: 'blur'}],
        ugender: [{required: true, message: "请选择性别", trigger: 'blur'}],
        uphone: [{required: true, message: "请输入电话号码", trigger: 'blur'}]
      }
    }
  },

  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.loginForm.identity == "用户") {
            requests({
              method: 'get',
              url: 'http://localhost:8081/ssm/UserLogin',
              params: {
                uname: this.loginForm.username,
                upassword: this.loginForm.password,
                inputCode: this.loginForm.code.toLowerCase()
              }
            }).then(response => {
              if (response.data.is) {
                this.$message.success(response.data.message)
                setTimeout(() => {
                      this.$store.state.user = response.data.user
                      this.$router.push('/UserHomePage')
                    }, 1000
                )
              } else {
                this.$message.error(response.data.message)
              }
            })
          } else {
            requests({
              method: 'get',
              url: "http://localhost:8081/ssm/AdminLogin",
              params: {
                aname: this.loginForm.username,
                apassword: this.loginForm.password,
                inputCode: this.loginForm.code.toLowerCase()
              }
            }).then(response => {
              if (response.data.is) {
                this.$message.success(response.data.message)
                setTimeout(() => {
                  this.$store.state.admin = response.data.admin
                  this.$router.push('/adminSucess')
                }, 1000)
              } else {
                this.$message.error(response.data.message)
              }
            })
          }
        } else {
          this.$message.error("请填写表单信息!")
        }
      })
    },
    changeImg() {
      getCode().then(response => {
        // console.log(response.data)
        return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      }).then(res => {
        this.loginForm.codeUrl = res;
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
          });
    },
    comfireRegister() {
      this.$refs.registeForm.validate((valid) => {
        if (valid) {
          registe({
            uname: this.registeForm.uname,
            uage: this.registeForm.uage,
            upassword: this.registeForm.upassword,
            ugender: this.registeForm.ugender,
            uphone: this.registeForm.uphone,
            uemail: this.registeForm.uemail,
            uadress: this.registeForm.uadress
          }).then(() => {
            this.$message.success("注册成功!")
            this.$refs.registeForm.resetFields() //表单重置
          })
          setTimeout(() => {
            this.dialogVisible = false
          }, 1000)
        } else {
          this.$message.error("请填写表单信息!")
        }
      })
    },
    resetForm() {
      this.$refs.registeForm.resetFields()
    }
  },
  beforeCreate() {
    document.body.style.backgroundSize = '100%'
    // document.body.style.backgroundImage = 'url(' + require('./images/loginbk.jpeg') + ')'
    document.body.style.backgroundImage =" url('https://source.fomal.cc/img/home_bg.webp')"
  },
  beforeDestroy() {
    document.body.style.backgroundImage = ''
  },
  mounted() {
    getCode().then(response => {
      return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    }).then(res => {
      this.loginForm.codeUrl = res;
    })
  }
}
</script>

<style scoped>
el-form-item {
  margin-bottom: 10px;
}


.loginTitle {
  margin-top: 0;
  text-align: center;
}

.loginForm img {
  display: inline-block;
  vertical-align: middle;
}

.loginForm {
  padding: 15px 30px;
  height: 402px;
  width: 403px;
  margin: 0;
  display: inline-block;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px

}

.left {
  display: inline-block;
  height: 432px;
  width: 500px;
  background: url("./images/loginform.jpg") no-repeat;
  background-size: 100% 100%;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px
}

.bk {
  width: 962px;
  height: 432px;
  border: 1px solid #BDB2B7;
  /*height: 433px;*/
  margin: 140px auto;
  border-radius: 15px;
}
</style>

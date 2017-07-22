<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link" @click="showLoginDia()">
                    <!-- <img class="user-logo" src="../../../static/img/img.jpg"> -->
                    {{username}}
                </span>
                <span class="el-dropdown-link" @click="showRegisterDia()">
                    <!-- <img class="user-logo" src="../../../static/img/img.jpg"> -->
                    {{regist}}
                </span>
                <!-- <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu> -->
            </el-dropdown>

            <div id="register">
              <el-dialog title="用户注册" :visible.sync="register">
                <el-form >
                  <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                    <el-input v-model="email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                  </el-form-item>

                  <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="password" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
                  </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="register = false;registLoad = false">取 消</el-button>
                <el-button type="primary" @click="registerTo()" :loading="registLoad">注 册</el-button>
              </div>
              </el-dialog>
            </div>

            <div id="login">
              <el-dialog title="用户登录" :visible.sync="loginDi">
                <el-form >
                  <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                    <el-input v-model="email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                  </el-form-item>

                  <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="password" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
                  </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="loginDi = false;loginLoad = false">取 消</el-button>
                <el-button type="primary" @click="loginTo()" :loading="loginLoad">登 录</el-button>
              </div>
              </el-dialog>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                api: 'http://localhost:10352/api/',
                username: '登录',
                regist: '注册',
                register: false,
                email: '',
                password: '',
                formLabelWidth: '100px',
                code: '',
                msg: '',
                registLoad: false,

                loginDi: false,
                loginLoad: false
            }
        },
        computed:{
            // username(){
            //     // let username = localStorage.getItem('ms_username');
            //     let username = '登录'
            //     return username;
            // }
        },
        created() {
          this.checkLogin();
        } ,
        methods:{
            checkLogin() {
              // this.username = '登';
              if(!this.getCookie('lowPowerName')) {
                this.username = '登录';
                this.regist = '注册';
              }else {
                this.username = this.getCookie('lowPowerName');
                this.regist = '';

              }
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    // localStorage.removeItem('ms_username')
                    // this.$router.push('/login');
                }
            },
            showRegisterDia() {
              this.register = true;
            },
            registerTo() {
              this.registLoad = true;
              var qs = require('qs');
                this.$axios.post(this.api + 'register', qs.stringify({
                  userEmail: this.email,
                  password: this.password
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then(response => {
                  console.log(response.data);
                  this.code = response.data.code;
                  this.msg = response.data.msg;
                  if(this.code != 200) {
                    this.$message({
                      type: 'error',
                      message: this.msg
                    });
                  }else if(this.code == 200){
                    this.$message({
                      type: 'success',
                      message: "注册信息已提交，请注意查收验证邮件" + this.password
                    });
                    this.register = false;
                  }
                  this.registLoad = false;

                })
            },
            showLoginDia() {
              if(this.username == '登录') {
                this.loginDi = true;
              }else {
                this.logoutTo();
              }

            },
            loginTo() {
              this.loginLoad = true;
              var qs = require('qs');
                this.$axios.post(this.api + 'login', qs.stringify({
                  userEmail: this.email,
                  password: this.password
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then(response => {
                  console.log(response.data);
                  this.code = response.data.code;
                  this.msg = response.data.msg;
                  if(this.code != 200) {
                    this.$message({
                      type: 'error',
                      message: this.msg
                    });
                  }else if(this.code == 200){
                    this.$message({
                      type: 'success',
                      message: "登录成功"
                    });
                    this.username = this.email;
                    this.regist = '';
                    this.loginDi = false;
                    //TODO 保存用户信息，刷新时不要重新登录
                    //如果登录成功则保存登录状态并设置有效期
                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                    this.setCookie('lowPowerToken', response.data.data, expireDays);
                    this.setCookie('lowPowerName', this.email, expireDays);
                    this.$router.push('/baseform');
                  }
                  this.loginLoad = false;
                })
            },
            logoutTo() {
              this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                //TODO 删除用户信息
                this.delCookie('lowPowerToken');
                this.delCookie('lowPowerName');
                this.username = '登录';
                this.regist = '注册';
                // console.log(row.bookid);
                // var url = this.api + 'deleteBook/' + row.bookId;
                // var qs = require('qs');
                // this.$axios.post(url, qs.stringify({
                //   // book_id: row.book_id
                // }),
                // {
                //   headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                //   }
                // }).then(response => {
                //   console.log(response.data);
                // })
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
                // this.tableData.splice(index, 1);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

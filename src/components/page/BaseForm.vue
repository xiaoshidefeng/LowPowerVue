<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 绑定</el-breadcrumb-item>
                <el-breadcrumb-item>绑定宿舍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>绑定说明</h3>
            <article>

                <p>在宿舍号中填写对应的宿舍号（须按要求填写，否则不能准确获得低电推送）</p>
                <p>宿舍号格式如下：</p>
                <p>楼号-寝室号</p>
                <p>例如：东区1幢101寝室，填写1-101即可（东西区不用填写）</p>
                <br></br>
                <p>部分特殊寝室号说明：</p>
                <p>东区15幢寝室分为A B两个部分，填写格式为：</p>
                <p>寝室号+A或B</p>
                <p>例如：东区15幢101寝室A，填写101A即可（不需要填写15-）</p>

                <br>
                <p>西区9幢和西区老9幢填写的时候需要进行区分</p>
                <p>西区老9幢要勾选 西区老9幢选项</p>

            </article>
        </div>
        <br>
        <br>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="宿舍号">
                    <el-input v-model="form.dormName"></el-input>
                    <el-checkbox  v-model="form.checked">西区老9幢</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="bindingLoad">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    dormName: '',
                    region: '',
                    date1: '',
                    date2: '',
                    checked: false,
                    delivery: true,
                    type: ['西区老9幢'],
                    resource: '小天才',
                    desc: ''
                },
                api: 'http://localhost:10352/api/',
                token: '',
                bindingLoad: false
            }
        },
        methods: {
            onSubmit() {
              this.bindingLoad = true;
              this.token = this.getCookie('lowPowerToken');
              var qs = require('qs');
              this.$axios.post(this.api + 'bindingDorm', qs.stringify({
                dorm: this.form.dormName,
                token: this.token,
                oldNine: this.form.checked

              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(response => {
                console.log(response.data);
                if(response.data.code != 200) {
                  this.$message({
                    type: 'error',
                    message: response.data.msg
                  });
                }else if(response.data.code == 200){
                  this.$message({
                    type: 'success',
                    message: this.form.dormName + "寝室绑定成功"
                  });

                }
                this.bindingLoad = false;
              })
              // this.$message.success('提交成功！');
            }
        }
    }
</script>

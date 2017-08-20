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
                <p>在寝室楼中选择对应的寝室</p>
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
                <p>西区老9幢带k的寝室要填上对应的k</p>
                <p>例如：9-101k</p>

            </article>
        </div>
        <br>

        <br>
        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="寝室楼：">
                <el-select v-model="select_floor" placeholder="楼幢号" class="handle-select mr10">
                    <el-option key="1" label="东区1号楼" value="东区1号楼"></el-option>
                    <el-option key="3" label="东区3号楼" value="东区3号楼"></el-option>

                    <el-option key="4" label="东区4号楼" value="东区4号楼"></el-option>
                    <el-option key="24" label="西区4号楼" value="西区4号楼"></el-option>

                    <el-option key="25" label="西区5号楼" value="西区5号楼"></el-option>
                    <el-option key="26" label="西区6号楼" value="西区6号楼"></el-option>
                    <el-option key="5" label="东区5.6号楼" value="东区5.6号楼"></el-option>

                    <el-option key="7" label="东区7号楼" value="东区7号楼"></el-option>
                    <el-option key="27" label="西区7号楼" value="西区7号楼"></el-option>

                    <el-option key="8" label="东区8号楼" value="东区8号楼"></el-option>
                    <el-option key="28" label="西区8号楼" value="西区8号楼"></el-option>

                    <el-option key="9" label="东区9号楼" value="东区9号楼"></el-option>
                    <el-option key="29" label="西区9号楼" value="西区9号楼"></el-option>
                    <el-option key="39" label="西区老9栋" value="西区老9栋"></el-option>

                    <el-option key="10" label="东区10号楼" value="东区10号楼"></el-option>
                    <el-option key="20" label="西区10号楼" value="西区10号楼"></el-option>

                    <el-option key="11" label="东区11号楼" value="东区11号楼"></el-option>
                    <el-option key="21" label="西区11号楼" value="西区11号楼"></el-option>

                    <el-option key="12" label="西区12号楼" value="西区12号楼"></el-option>
                    <el-option key="22" label="东区12号楼" value="东区12号楼"></el-option>

                    <el-option key="13" label="东区13号楼" value="东区13号楼"></el-option>
                    <el-option key="23" label="西区13号楼" value="西区13号楼"></el-option>

                    <el-option key="14" label="东区14号楼" value="东区14号楼"></el-option>
                    <el-option key="34" label="西区14号楼" value="西区14号楼"></el-option>

                    <el-option key="15" label="东区15号楼" value="东区15号楼"></el-option>
                    <el-option key="16" label="东区16号楼" value="东区16号楼"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="宿舍号：">
                    <el-input v-model="form.dormName"></el-input>
                    <!-- <el-checkbox  v-model="form.checked">西区老9幢</el-checkbox> -->
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
                api: 'http://118.89.159.95:10352/api/',
                token: '',
                bindingLoad: false,
                select_floor: '东区1号楼'
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
                floor: this.select_floor

              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(response => {
                // console.log(response.data);
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

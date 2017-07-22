<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>使用说明</h3>
            <article>
                <h1>低电查询与推送</h1>
                <!-- <p></p> -->
                <h2>低电查询</h2>
                <p>点击左侧低电表格来进行低电查询</p>
                <!-- <p>该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。</p> -->
                <h2>低电推送</h2>
                <p>注册用户账号并验证邮箱成功后，登录系统，绑定要推送的寝室号即可。</p>
                <p>推送会以邮件的形式发送低电通知到您的邮箱（注册邮箱）。</p>

                <h2>补充说明</h2>
                <p>目前仅支持丽水学院低电查询与推送。</p>
                <p>如果从没收到低电提醒邮件，请去邮箱的垃圾箱检查是否被系统判别为垃圾邮件了。</p>

                <p>本意是方便大家更好的获取低电信息，避免因未及时充值电费，造成不必要的损失。
                  自己租的服务器性能有限，希望大家不要做会损害服务器的事。</p>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>

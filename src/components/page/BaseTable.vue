<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>低电表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <!-- <el-select v-model="select_area" placeholder="东/西区" class="handle-select mr10">
                <el-option key="1" label="东区" value="东区"></el-option>
                <el-option key="2" label="西区" value="西区"></el-option>
            </el-select> -->
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
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="buildingName" label="楼幢号" sortable width="200">
            </el-table-column>
            <el-table-column prop="dormNum" label="寝室号" sortable width="200">
            </el-table-column>
            <el-table-column prop="powerNum" label="电量" sortable width="200">
            </el-table-column>
            <el-table-column prop="dateNum" label="日期" width="200">
            </el-table-column>
            <el-table-column label="备注" :formatter="formatter">
                <!-- <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template> -->
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: 'http://118.89.159.95:10352/api/',
                api: 'http://118.89.159.95:10352/api/',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_area: '',  //选择东西区
                select_floor: '东区1号楼',  //选择楼号
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.buildingName.indexOf(self.select_floor) > -1 &&
                            (d.buildingName.indexOf(self.select_word) > -1 ||
                            d.dormNum.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                // if(process.env.NODE_ENV === 'development'){
                //     self.url = '/ms/table/list';
                // };
                self.$axios.get(self.api + 'lowpower').then((response) => {
                  self.tableData = response.data.data;
                  // console.log(self.tableData)
                })
                // self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                //     self.tableData = res.data.list;
                // })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>

<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 权限模板</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              
                <el-button type="primary" icon="add" @click="handlerUserAdd">新增权限模板</el-button>

                <!-- <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="name" label="模板名称" width="150" align="center">
                </el-table-column>
                
                <el-table-column prop="common" label="中文名" align="center" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" 
                :page-count="page_total"
                :page-size="page_size"
                :current-page="cur_page">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">

            <el-form ref="form" :model="form" label-width="60px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="模板名称">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="中文名称">
                    <el-input  v-model="form.common" ></el-input>
                </el-form-item>
              

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增模板" :visible.sync="addVisible" width="30%">
            <div>模板名称命名：sre:admin(sre管理员) sre:common(sre普通用户)</div>
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="模板名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input  v-model="form.common" ></el-input>
                </el-form-item>
               

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                page_size: 50,
                page_total: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                form: {
                    id: 0,
                    name: '',
                    common:'',
                },
                idx: -1,
                value:''
            }
        },
        created() {
            // this.getData();
            this.getData();
        },
        computed: {
            data() {
                return {
                    data: this.$store.state.templates.data
                 
                    }
                    // )}
            }
        },
   
        methods: {
            ...mapActions([
            'getTemplates',
            'deleteTemplate',
            'addTemplate'
           ]),
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            async getData() {
                this.loading = true;
                try {
                await this.getTemplates({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                this.page_total = this.$store.state.templates.pages;
                this.tableData = this.$store.state.templates.data
                 } finally {
                        this.loading = false;
                }
            },
            async loadData() {
                this.loading = true;
                try {
                await this.getTemplates({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                 } finally {
                        this.loading = false;
                }
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.status;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handlerUserAdd(){
                this.addVisible=true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    name: item.name,
                    common: item.common,
                }
                if (!item.is_active){
                    this.value = "禁用"
                }else{
                    this.value = "启用"
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                // var form = this.form
                this.form.password = this.tableData[this.idx].password
                this.form.public_key = this.tableData[this.idx].public_key
                this.$set(this.tableData, this.idx, this.form);
                this.updateUser(this.tableData[this.idx])
                // this.updateUser(form[this.idx])
                // this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            saveAdd(){
                console.log("start save user")
                this.addTemplate(this.form)
                this.addVisible = false
            },
            // 确定删除
            deleteRow(){
                var del_id = this.tableData[this.idx].id
                this.tableData.splice(this.idx, 1);
                this.deleteTemplate(del_id)
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
        /* float: right; */
        margin-left:300px;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
        /* float: right; */
    }
</style>

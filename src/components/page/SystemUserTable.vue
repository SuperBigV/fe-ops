<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 系统用户 (用于跳板机登录用户)</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              
                <el-button type="primary" icon="add" @click="handlerUserAdd">新增系统用户</el-button>

                <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="username" label="用户名" width="150" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="150" align="center">
                </el-table-column>
                <el-table-column prop="protocol" label="协议" width="150" align="center">
                </el-table-column>
                <el-table-column prop="priority" label="优先级" width="150" align="center">
                </el-table-column>

            
                <el-table-column prop="protocol" label="协议" align="center" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">

            <el-form ref="form" :model="form" label-width="50px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="用户名" label-width="60px">
                    <el-input v-model="form.username" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="60px">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="60px">
                    <el-input  v-model="form.password" ></el-input>
                </el-form-item>
                <el-form-item label="协议" label-width="60px">
                    <el-input v-model="form.protocol" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="优先级" label-width="60px">
                    <el-input v-model="form.priority" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="私钥" label-width="60px">
                    <!-- <el-input v-model="form.private_key" type='textarea' :rows="4"></el-input> -->
                    <el-upload
                        ref="upload"
                        action=""
                        :on-change="private_file_path"
                        :multiple="false"
                        :limit="1"
                        :file-list="private_file"
                        :auto-upload="false"
                    >
                    <el-button size="small" type="primary" @click="clearUploadFile">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传id_rsa</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="shell">
                    <el-input v-model="form.shell" type='textarea' :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="sudo">
                    <el-input v-model="form.sudo" type='textarea' :rows="4"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select  v-model="form.is_active" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->

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
        <el-dialog title="新增用户" :visible.sync="addVisible" width="30%">

            <el-form ref="form" :model="form" label-width="50px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
               <el-form-item label="用户名" label-width="60px">
                    <el-input v-model="form.username"  ></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="60px">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="60px">
                    <el-input  v-model="form.password" ></el-input>
                </el-form-item>
                <el-form-item label="协议" label-width="60px">
                    <el-input v-model="form.protocol" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="优先级" label-width="60px">
                    <el-input v-model="form.priority" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="私钥" label-width="60px">
                    <!-- <el-input v-model="form.private_key" type='textarea' :rows="4"></el-input> -->
                    <el-upload
                        ref="upload"
                        action=""
                        :on-change="private_file_path"
                        :multiple="false"
                        :limit="1"
                        :file-list="private_file"
                        :auto-upload="false"
                    >
                    <el-button size="small" type="primary" @click="clearUploadFile">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传id_rsa</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="shell">
                    <el-input v-model="form.shell" type='textarea' :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="sudo">
                    <el-input v-model="form.sudo" type='textarea' :rows="4"></el-input>
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
                private_file: [],
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
                    username: '',
                    password:'',
                    protocol: 'ssh',
                    priority: '10',
                    private_key: '',
                    sudo: '',
                    shell: ''

                },
                idx: -1,
                options: [{id: 1, value: false, label:"禁用"}, {id:2, value: true, label:"启用"}],
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
                    data: this.$store.state.systemusers.data
                    // data: this.$store.state.users.filter((u) => {
                    //     let d = u
                    //     for (let i=0;i<u.length;i++){
                    //         console.log("start change")
                    //         if (!d[i].is_active){
                    //             d[i].is_active = "禁用"
                    //         }else{
                    //             d[i].is_active = "启用"
                    //         }
                    //         console.log("status===>"+d[i].is_active)
                    //     }
                    //     return d
                    }
                    // )}
            }
        },
   
        methods: {
            ...mapActions([
            'getSystemUsers',
            'updateSystemUser',
            'deleteSystemUser',
            'addSystemUser'
           ]),
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            async getData() {
                this.loading = true;
                try {
                await this.getSystemUsers({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                this.page_total = this.$store.state.systemusers.pages;
                this.tableData = this.$store.state.systemusers.data
                 } finally {
                        this.loading = false;
                }
            },
            async loadData() {
                this.loading = true;
                try {
                await this.getSystemUsers({
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
                    username: item.username,
                    protocol: item.protocol,
                    priority: item.priority,
                    password: "",
                    private_key: "",
                    
                    // password: item.password,
                    // public_key: item.public_key
                }
            
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            private_file_path(file, fileList){
                this.private_file = fileList
                // console.log(">>>private:", this.form.private_key)
            },
            clearUploadFile(){
                this.$refs.upload.clearFiles()
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
                let formData = new FormData();
                formData.append("name", this.form.name)
                formData.append("username", this.form.username)
                formData.append("password", this.form.password)
                formData.append("sudo", this.form.sudo)
                formData.append("shell", this.form.shell)
                formData.append("private_key", this.private_file[0]?this.private_file[0].raw:"")
                console.log(this.form.name)
                this.updateSystemUser(formData)
                this.editVisible = false
            },
            saveAdd(){
                let formData = new FormData();
                formData.append("name", this.form.name)
                formData.append("username", this.form.username)
                formData.append("password", this.form.password)
                formData.append("sudo", this.form.sudo)
                formData.append("shell", this.form.shell)
                formData.append("private_key", this.private_file[0]?this.private_file[0].raw:"")
                console.log("start save user:"+this.form.username)
                this.addSystemUser(formData)
                this.loadData()
                this.addVisible = false
            },
            // 确定删除
            deleteRow(){
                var del_id = this.tableData[this.idx].id
                this.tableData.splice(this.idx, 1);
                this.deleteSystemUser(del_id)
                // this.$message.success('删除成功');
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

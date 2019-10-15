<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 系统初始化</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" @click="handlerJobAdd">新增任务</el-button>
                <el-button type="primary" icon="self" @click="handlerSelfJobAdd">手动初始化</el-button>
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable"  v-loading="loading">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="编号" prop="id" width="80" align="center"  ></el-table-column> 
                <el-table-column prop="node" label="节点" align="center">
                </el-table-column>
                <el-table-column prop="account" label="执行账号" width="200" align="center">
                </el-table-column>
                <el-table-column prop="git" label="git地址"  align="center">
                </el-table-column>
                <el-table-column prop="user" label="维护人" width="200" align="center">
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-menu" class="cadetblue" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">

            <el-form ref="system" :model="form" label-width="60px">

                <el-form-item label="节点"  >
                    <el-input v-model="form.node" :disabled="true"></el-input>
                </el-form-item>
                <!-- <el-form-item label="账号">
                    <el-input  v-model="jobs.account" ></el-input>
                </el-form-item> -->
                <el-form-item label="账号">
                    <el-col class="col">
              <el-form-item>
                <el-select
                  v-model="form.account"
                  placeholder="选择执行账号"
                >
                  <el-option
                    v-for="t in accounts"
                    :key="t.id"
                    :label="t.name"
                    :value="t.account"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
                <el-form-item label="git"  width="20px">
                    <el-input  v-model="form.git"></el-input>
                </el-form-item>
                <el-form-item label="维护人">
                    <el-input v-model="form.user" :disabled="true"></el-input>
                    <!-- <el-select v-model="form.user" value-key="username"  multiple filterable clearable placeholder="请选择被授权用户">
                        <el-option
                          v-for="item in users"
                          :key="item.id"
                          :label="item.username"
                          :value="item.username">
                        </el-option>
                    </el-select> -->
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
        <el-dialog title="新增初始化任务" :visible.sync="addVisible" width="60%">

            <el-form ref="system" :model="jobs" label-width="60px">

                <el-form-item label="节点" label-width="70px">
                    <!-- <el-input v-model="jobs.node"></el-input> -->
                    <!-- <el-select v-model="n_value" @change="getChangedNode" filterable multiple clearable placeholder="请选择节点" style="width:500px"> -->
                    <el-select v-model="jobs.node" value-key="business" filterable  clearable multiple placeholder="请选择节点" style="width:500px">
                        <el-option
                          v-for="item in nodes"
                          :key="item.tag_id"
                          :label="item.business"
                          :value="item.business">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="账号">
                    <el-input  v-model="jobs.account" ></el-input>
                </el-form-item> -->
                <el-form-item label="账号" label-width="70px">
                    <el-col class="col">
              <el-form-item>
                <el-select
                  v-model="jobs.account"
                  placeholder="选择执行账号"
                >
                  <el-option
                    v-for="t in accounts"
                    :key="t.id"
                    :label="t.name"
                    :value="t.account"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
                <el-form-item label="git" label-width="70px">
                    <el-input  v-model="jobs.git"></el-input>
                </el-form-item>
                <el-form-item label="维护人" label-width="70px">
                    <el-select v-model="jobs.user" value-key="username"  multiple filterable clearable placeholder="请选择被授权用户">
                    <!-- <el-select v-model="u_value" @change="getChangedUser" multiple filterable clearable placeholder="请选择被授权用户"> -->
                        <el-option
                          v-for="item in users"
                          :key="item.id"
                          :label="item.username"
                          :value="item.username">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 手动初始化弹出框 -->
        <el-dialog title="手动初始化任务" :visible.sync="selfVisible" width="30%">

            <el-form ref="system" :model="jobs">

                <el-form-item label="节点" label-width="70px">
                    <el-select v-model="selfJob.node" value-key="business" filterable  clearable multiple placeholder="请选择节点" style="width:350px">
                        <el-option
                          v-for="item in nodes"
                          :key="item.tag_id"
                          :label="item.business"
                          :value="item.business">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主机名" label-width="70px">
                    <el-input  v-model="selfJob.hostname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selfVisible = false">取 消</el-button>
                <el-button type="primary" @click="elfAction">确 定</el-button>
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
                tableData:[],
                jobs:{
                   id: 0,
                    node: [],
                    account:'',
                    git:'',
                    user:'',
                },
                selfJob: {
                    node: '',
                    hostname: ''
                },
                loading: false,
                points:[],
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
                infoVisible: false,
                selfVisible: false,
                accounts:[
                    {
                        id: 1,
                        name: "root",
                        account: "root"
                    },
                    {
                        id: 2,
                        name: "work",
                        account: "work"
                    }
                ],
                form: {
                    id: 0,
                    node: '',
                    account:'',
                    git:'',
                    user:'',
                },
                idx: -1,
                value:'',
                selectlistRow:[],
                nodes: [],
                users: []
                

            }
        },
        created() {
            this.getData()
            this.getJobs();
        },
        // watch:{
        //     tableData(curVal, oldVal){
        //         if (curVal.length == oldVal.length){
        //             this.getData()
        //         }
        //     } 
        // },
        computed: {
            data() {
                return {
                    data: this.$store.state.jobs

                    }
            }
        },
 
        methods: {
            ...mapActions([
                'getJobs',
                'addJob',
                'updateJob',
                 'getUsers',
                 'getNodes',
                 'deleteJob',
                 'doElf'
           ]),
           selectRow (val) {
        this.selectlistRow = val
      },

            // // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                // this.getData();
            },

            async getData() {
                this.loading = true;
                try {
                     await this.getNodes();
                await this.getUsers({
                        page: this.cur_page,
                        pageSize: 2000
                });
                await this.getJobs({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                this.users = this.$store.state.users.data
                // this.page_total = this.$store.state.users.pages;
                 this.nodes = this.$store.state.nodes,
                this.page_total = this.$store.state.jobs.pages;
                this.tableData = this.$store.state.jobs
                 } finally {
                        this.loading = false;
                }
            },
            
            async loadData() {
                this.loading = true;
                try {
                await this.getJobs({
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
            handlerJobAdd(){
                this.addVisible=true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    node: item.node,
                    account: item.account,
                    git: item.git,
                    user: item.user,
                }
                console.log("item.user:", item.user)
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                console.log(">>>>>idx:", index)
                console.log(">>>>>idx:", row)
                this.delVisible = true;
            }, 
            deleteRow(){
                var del_id = this.data.data[this.idx].id
                console.log("del_id:", del_id)
                this.tableData.splice(this.idx, 1);
                this.deleteJob(del_id)
                // this.getData()
                this.delVisible = false;

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                // this.form.public_key = this.tableData[this.idx].public_key
                this.$set(this.tableData, this.idx, this.form);
                this.updateJob(this.tableData[this.idx])
                this.editVisible = false;
                this.getData()
            },
            saveAdd(){
                console.log("start save user")
                this.addJob(this.jobs)
                this.addVisible = false
                this.getData()
                // this.loadData()
            },
            elfAction(){
                console.log(this.selfJob)
                this.doElf(this.selfJob)
                this.selfVisible = false
            },
            handlerSelfJobAdd(){
                this.selfVisible = true
            },
      },
   
   
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

<template>
<el-tabs v-model="activeName">
    <el-tab-pane label="用户权限" name="first">
 
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>用户权限</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="add" @click="handlerUserAdd">新增用户</el-button> -->

                <el-input v-model="select_word" placeholder="用户名/产品线" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索用户权限</el-button>
            </div>
            <el-table :data="tableData.privileges" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号"  prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="username" label="用户名" width="150" align="center">
                </el-table-column>
                <el-table-column prop="tag" label="产品线" align="center">
                </el-table-column>
                <el-table-column prop="template_name" label="模板" align="center" >
                </el-table-column>
                <el-table-column prop="grantor" label="授权人" width="150" align="center">
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

        

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

      

    </div>
       </el-tab-pane>
          <el-tab-pane label="用户临时权限" name="second">

 
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>用户权限</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="add" @click="handlerUserAdd">新增用户</el-button> -->

                <el-input v-model="select_key" placeholder="用户名/主机名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchTempPriv">搜索用户临时权限</el-button>
            </div>
            <el-table :data="tableTempData.privileges" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="username" label="用户名" width="150" align="center">
                </el-table-column>
                <el-table-column prop="hostname" label="主机名" align="center" >
                </el-table-column>
                <el-table-column prop="role" label="角色" align="center" >
                </el-table-column>
                <el-table-column prop="grantor" label="授权人" width="150" align="center">
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="temphandleDelete(scope.$index, scope.row)">删除</el-button>
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

        

        <!-- 删除提示框 -->
        <el-dialog title="删除权限" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="删除临时权限" :visible.sync="delTempVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delTempVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteTempRow">确 定</el-button>
            </span>
        </el-dialog>


      

    </div>
       </el-tab-pane>
        
  </el-tabs>
</template>

<script>
    import {mapActions} from 'vuex'
    import pinyin4js from 'pinyin4js'
import { constants } from 'crypto';
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: {},
                tableTempData: {},
                cur_page: 1,
                page_size: 50,
                page_total: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                select_key: '',
                del_list: [],
                activeName: "first",
                is_search: false,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                delTempVisible: false,
                checkedList:[],
                login_user: '',
                form: {
                    id: 0,
                    tag: '',
                    tag_id: 0,
                    grantor: '',
                    user_id: '',
                    template_id: ''
                },
                form_t: {
                    id: 0,
                    username: '',
                    hostname: '',
                    role: '',
                    grantor: ''
                },

                idx: -1,
                value:'',
                idt: -1,
                value_t:''
            }
        },
        created() {
            // this.getData();
            this.getData();
        },
        computed: {
        //   this.tableData = this.$store.state.user_privs.data
          searchData(){
              console.log("computed:", this.$store.state.search_user_privs.data)
              return {data:this.$store.state.search_user_privs.data}
          },
          searchTempData(){
              return {data:this.$store.state.search_user_temp_privs.data} 
          }
        },
   
        methods: {
            ...mapActions([
            'globalSearchUserPrivs',
            'getUserName',
            'SearchUserPrivs',
            'deleteUserPriv',
            'deleteUserTempPriv',
            'globalSearchUserTempPrivs'
           ]),
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },

            async getData() {
                
                this.loading = true;
                try {
                await this.getUserName();
                
                // this.page_total = this.$store.state.user_privs.pages;
                this.login_user =  this.$store.state.user.username
                await this.SearchUserPrivs(
                        this.login_user
                );
                await this.globalSearchUserTempPrivs(
                        this.login_user
                );
                this.tableData = this.$store.state.user_privs.data
                this.tableTempData = this.$store.state.search_user_temp_privs.data
                 } finally {
                        this.loading = false;
                }
            },
            async loadData() {
               this.tableData = this.searchData.data
                console.log(this.searchData)
                // console.log(this.this.$store.state.user_privs.data)
            },
            
            async findUserPirvsHandler(){
                await this.globalSearchUserPrivs(this.select_word)
                this.tableData = this.searchData.data
            },

            async findUserTempPrivsHandler(){
                await this.globalSearchUserTempPrivs(this.select_key)
                this.tableTempData = this.searchTempData.data
            },

            search() {
                console.log("search:", this.select_word)
                // this.loading = true

                this.findUserPirvsHandler(this.select_word)
                // this.loadData()
            },
            searchTempPriv(){
                this.findUserTempPrivsHandler(this.select_key)
            },

            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            temphandleDelete(index, row){
                this.idt = index;
                this.delTempVisible = true;
            },
       
           delete_priv(){
               console.log("delete")
           },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
             // 确定删除
            deleteRow(){
                console.log(">>>tableData:", this.tableData)
                let data = this.tableData.privileges[this.idx]
                var del_id = data.id
                console.log("del_id:", del_id)
                this.tableData.privileges.splice(this.idx, 1);
                this.form.id = del_id
                this.form.tag = data.tag
                this.form.tag_id = data.tag_id
                this.form.grantor = data.grantor
                this.form.user_id = data.user_id
                this.form.template_id = data.template_id
                this.deleteUserPriv(this.form)
                // this.getData()
                this.delVisible = false;

            }, 
            deleteTempRow(){
                let data = this.tableTempData.privileges[this.idt]
                var del_id = data.id
                console.log("del_temp_id:", del_id)
                this.tableTempData.privileges.splice(this.idt, 1);
                this.form_t.id = del_id
                this.form_t.hostname = data.hostname
                this.form_t.username = data.username
                this.form_t.role = data.role
                this.form_t.grantor = data.grantor
                this.deleteUserTempPriv(this.form_t)
                // this.getData()
                this.delTempVisible = false;

            }, 
         
           
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

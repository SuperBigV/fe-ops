<template>
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
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="username" label="用户名" width="150" align="center">
                </el-table-column>
                 
                
                <el-table-column prop="tag" label="产品线" align="center" >
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
                idx: -1,
                value:''
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
          }
        },
   
        methods: {
            ...mapActions([
            'globalSearchUserPrivs',
            'getUserName',
            'SearchUserPrivs',
            'deleteUserPriv'
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
                console.log("search_username:", this.$store.state.user.username)
                await this.SearchUserPrivs(
                        this.login_user
                );
                this.tableData = this.$store.state.user_privs.data
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


            search() {
                console.log("search:", this.select_word)
                // this.loading = true

                this.findUserPirvsHandler(this.select_word)
                // this.loadData()
            },

            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
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

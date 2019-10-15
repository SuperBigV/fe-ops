<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户组</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" @click="handlerUserAdd">新增组</el-button>

                <!-- <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input> -->
                <!-- <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="编号" type="index" width="80" align="center"></el-table-column> 
                <el-table-column prop="name" label="组名"  align="center">
                </el-table-column>
                 <el-table-column prop="cname" label="中文名"   align="center">
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增组" :visible.sync="addVisible" width="30%">

            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="组名" label-width="70px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="中文名" label-width="70px">
                    <el-input v-model="form.cname"></el-input>
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
    import pinyin4js from 'pinyin4js'
import { constants } from 'crypto';
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                loading: false,
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
                checkedList:[],
                del_name: '',
                form: {
                    name: '',
                    cname: '',
                },

                idx: -1,
            }
        },
        created() {
            // this.getData();
            this.getData();
        },
        computed: {
            data() {
                return {
                    data: this.$store.state.groups
                    }
                    // )}
            }
        },
        watch:{
            tableData(curVal, oldVal){
                if (curVal.length == oldVal.length){
                    this.getData()
                }
            } 
        },
        methods: {
            ...mapActions([
            'addGroup',
            'getGroup',
            'delGroup'
           ]),
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            // async getData() {
            //     this.loading = true;
            //     try {
            //     this.tableData = this.$store.state.groups 
            //      } finally {
            //             this.loading = false;
            //     }
            // },
            async getData() {
                this.loading = true;
                try {
                await this.getGroup();
                this.tableData = this.$store.state.groups 
                 } finally {
                        this.loading = false;
                }
            },
           
            handlerUserAdd(){
                this.form =  {
                    id: 0,
                    username: '',
                    name: '',
                    mail: '',
                    password:'',
                    is_active: '',
                    houseIdentifier:[]

                },
                this.addVisible=true;
            },
            handleEdit(index, row) {
                this.form.id = 0
                this.form.username = ''
                this.form.name = ''
                this.form.mail = ''
                this.form.password = ''
                this.is_active = ''
                this.houseIdentifier = []

                this.idx = index;
                const item = this.data.data[index];
                let hits = []
                if (item.houseIdentifier){
                     hits = item.houseIdentifier.split(",")
                }else{
                     hits = []
                }
                this.form = {
                    id: item.id,
                    username: item.username,
                    protocol: item.protocol,
                    is_active: item.is_active,
                    password: "",
                    public_key: "",
                    houseIdentifier: hits
                    // password: item.password,
                    // public_key: item.public_key
                }
                this.checkedList = hits
                if (!item.is_active){
                    this.value = "禁用"
                }else{
                    this.value = "启用"
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.del_name = row.name;
                this.delVisible = true;
            },
            handleResetPass(index, row){
                const item = this.data.data[index];
                this.resetPass(item.username)
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
                const form = {
                    id: 0,
                    username: '',
                    is_active: '',
                    houseIdentifier:'',
                    del_houseIdentifier: '',
                    add_houseIdentifier: ''
                }
                let privs = []
                let d = this.data.data[this.idx].houseIdentifier
                if (d){
                    privs = d.split(',')
                }else{
                    this.data.data[this.idx].houseIdentifier = []
                    privs = this.data.data[this.idx].houseIdentifier
                }
                let del = privs.filter((v)=>{ return this.checkedList.indexOf(v) == -1 })
                let add = this.checkedList.filter((v)=>{ return privs.indexOf(v) == -1 })
                form.houseIdentifier = this.checkedList.join(',')
                form.del_houseIdentifier = del.join(",")
                form.id = this.data.data[this.idx].id
                form.username = this.form.username
                form.is_active = this.form.is_active ? 1:0
                form.add_houseIdentifier = add.join(",")
                this.updateUser(form)
                this.editVisible = false
                this.getData()
            },
            saveAdd(){
                this.addGroup(this.form)
                this.addVisible = false
                this.getData()
            },
            // 确定删除
            deleteRow(){
                this.delGroup({"name":this.del_name})
                this.tableData.splice(this.idx, 1)
                this.getData()
                this.delVisible = false;

            },
            randomRange(min, max, charStr){
                var returnStr = "",
                    range;
                 if(typeof max == 'string'){
                     charStr = max;
                 }
                 range = ((max && typeof max == 'number') ? Math.round(Math.random() * (max-min)) + min : min);
                 charStr = charStr || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';    
                for(var i=0; i<range; i++){
                    var index = Math.round(Math.random() * (charStr.length-1));
                    returnStr += charStr.substring(index,index+1);
                }
                return returnStr.concat(1);
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

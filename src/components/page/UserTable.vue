<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户 (删除用户会同时禁用邮箱，请谨慎操作!)</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-button type="primary" icon="add" @click="handlerUserAdd">新增用户</el-button>

                <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="username" label="用户名" width="150" align="center">
                </el-table-column>
                 <el-table-column prop="name" label="中文名" width="150" align="center">
                </el-table-column>
                 <el-table-column prop="dep_cname" label="部门" width="150" align="center">
                </el-table-column>
                
                <el-table-column prop="mail" label="邮箱" align="center" >
                </el-table-column>
                <el-table-column prop="houseIdentifier" label="权限" align="center" >
                </el-table-column>
                <el-table-column
            align="center"
            label="状态"
            >
            <template slot-scope="scope" prop="is_active">
              <!-- <div>{{ is_active ? ' 启用'  : ' 禁用' }}</div> -->
              <span v-if="scope.row.is_active == true">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-refresh-right" @click="handleResetPass(scope.$index, scope.row)">重置密码</el-button>
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

            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="用户名" label-width="70px">
                    <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="70px">
                    <!-- <el-input v-model="jobs.node"></el-input> -->
                    <!-- <el-select v-model="n_value" @change="getChangedNode" filterable multiple clearable placeholder="请选择节点" style="width:500px"> -->
                    <el-select v-model="form.department" value-key="department" filterable  clearable  placeholder="请选择部门" style="width:350px">
                        <el-option
                          v-for="item in data.deps"
                          :key="item.name"
                          :label="item.cname"
                          :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="密码">
                    <el-input  v-model="form.password" ></el-input>
                </el-form-item>
                <el-form-item label="公钥">
                    <el-input v-model="form.public_key" type='textarea' :rows="4"></el-input>
                </el-form-item> -->
            <el-form-item label="权限" label-width="70px">
                <template >
                            <el-checkbox-group
                                v-model="checkedList">
                                <el-checkbox   v-for="p in editableList"  :label="p" :key="p">{{p}}</el-checkbox>
                            </el-checkbox-group>
                </template>
            </el-form-item>
                <el-form-item label="状态" label-width="70px">
                    <!-- <el-input v-model="form.status"></el-input> -->
                    <el-select  v-model="form.is_active" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
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
        <el-dialog title="新增用户" :visible.sync="addVisible" width="40%">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="中文名" label-width="70px">
                    <el-input v-model="form.name" @input="convertName"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="70px">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="70px">
                    <!-- <el-input v-model="jobs.node"></el-input> -->
                    <!-- <el-select v-model="n_value" @change="getChangedNode" filterable multiple clearable placeholder="请选择节点" style="width:500px"> -->
                    <el-select v-model="form.department" value-key="department" filterable  clearable  placeholder="请选择部门" style="width:350px">
                        <el-option
                          v-for="item in data.deps"
                          :key="item.name"
                          :label="item.cname"
                          :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="邮箱" label-width="70px">
                    <el-input  v-model="form.mail" ></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px">
                    <el-input  v-model="form.password" ></el-input>
                </el-form-item>
               
                <el-form-item label="状态" label-width="70px">
                    <!-- <el-input v-model="form.status"></el-input> -->
                    <el-select  v-model="form.is_active" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

               <el-form-item label="权限" label-width="70px">
                <template >
                            <el-checkbox-group
                                v-model="checkedList">
                                <el-checkbox   v-for="p in editableList"  :label="p" :key="p">{{p}}</el-checkbox>
                            </el-checkbox-group>
                </template>
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
                editableList:[ "vpn", "doc", "git", "deploy", "log", "jump"],
                form: {
                    id: 0,
                    username: '',
                    name: '',
                    department: '',
                    mail: '',
                    password:'',
                    is_active: '',
                    houseIdentifier:[]

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
                    data: this.$store.state.users.data,
                    deps: this.$store.state.groups
                 
                    }
                    // )}
            }
        },
        // watch:{
        //     tableData(curVal, oldVal){
        //         if (curVal.length == oldVal.length){
        //             this.getData()
        //         }
        //     } 
        // },
        methods: {
            ...mapActions([
            'getUsers',
            'updateUser',
            'deleteUser',
            'addUser',
            'globalSearchUser',
            'resetPass'
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
                await this.getUsers({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                this.page_total = this.$store.state.users.pages;
                this.tableData = this.$store.state.users.data
                 } finally {
                        this.loading = false;
                }
            },
            async loadData() {
                this.loading = true;
                try {
                await this.getUsers({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                 } finally {
                        this.loading = false;
                }
            },
            convertName(e){
                const pinyin = pinyin4js.convertToPinyinString(e, '', pinyin4js.WITHOUT_TONE)
                this.form.username = pinyin
                this.form.mail = pinyin.concat("2014@xiaochuankeji.cn")
                this.form.password = "Xc666888"
            },
            async global_search_user(select_word){
                await this.globalSearchUser(select_word)
                
            },

            search() {
                console.log("search")
                this.global_search_user(this.select_word)
                // this.getData()
            },
           
            formatter(row, column) {
                return row.status;
            },
            filterTag(value, row) {
                return row.tag === value;
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
                this.form.department = ''
                this.form.password = ''
                this.is_active = ''
                this.houseIdentifier = []

                this.idx = index;
                const item = this.data.data[index];
                console.log(">>>>item:", item)
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
                    department: item.department,
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
                    department: '',
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
                form.department = this.form.department
                form.is_active = this.form.is_active ? 1:0
                form.add_houseIdentifier = add.join(",")
                console.log("idel_checklist:", form.del_houseIdentifier)
                console.log("iadd_checklist:", form.add_houseIdentifier)
                this.updateUser(form)
                this.editVisible = false
                this.getData()
            },
            saveAdd(){
                console.log("start save user")
                this.form.houseIdentifier = this.checkedList.join(",")
                this.addUser(this.form)
                this.addVisible = false
                this.getData()
            },
            // 确定删除
            deleteRow(){
                var del_id = this.data.data[this.idx].id
                console.log("del_id:", del_id)
                this.tableData.splice(this.idx, 1);
                this.deleteUser(del_id)
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

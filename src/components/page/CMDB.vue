<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>资产</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" >新增</el-button>
                <el-button type="warning" icon="add" @click="handlerDonwload">模板下载</el-button>
                <!-- <el-button type="success" icon="add" @click="handlerUserAdd">导入</el-button> -->
                <el-button  icon="el-icon-setting" >设置</el-button>
               
                <el-upload
                        class="upload-btn"
                        action=""
                        :file-list="assetsFile"
                        :on-change="uploadFile"
                        :auto-upload="false"
                    >
                    <el-button size="small"  style="margin-left: 10px;" type="success" >导入</el-button>
                </el-upload>
                <el-input v-model="select_word" placeholder="主机名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="hostname" label="主机名" width="150" align="center">
                </el-table-column>
                 <el-table-column prop="bip" label="IP" width="150" align="center">
                </el-table-column>
                <el-table-column prop="mac" label="mac" width="150" align="center">
                </el-table-column>
                <el-table-column prop="instance_id" label="实例ID" align="center" >
                </el-table-column>
                <el-table-column prop="order_id" label="订单ID" align="center" >
                </el-table-column>
                <el-table-column prop="tag" label="产品线" align="center" >
                </el-table-column>
                <el-table-column prop="disk" label="磁盘" align="center" >
                </el-table-column>
                <el-table-column prop="memory" label="内存" align="center" >
                </el-table-column>
                <el-table-column prop="cpu" label="cpu" align="center" >
                </el-table-column>
                <el-table-column prop="charge_type" label="付费类型" align="center" >
                </el-table-column>
                <el-table-column prop="region" label="地区" align="center" >
                </el-table-column>
                <el-table-column prop="zone" label="可用区" align="center" >
                </el-table-column>
                <el-table-column prop="sn" label="序列号" align="center" >
                </el-table-column>
                <el-table-column prop="suite" label="套餐" align="center" >
                </el-table-column>
                <el-table-column prop="os_type" label="系统类型" align="center" >
                </el-table-column>
                <el-table-column prop="os_name" label="操作系统" align="center" >
                </el-table-column>
                <el-table-column prop="vendor" label="供应商" align="center" >
                </el-table-column>
                <el-table-column prop="eip" label="eip" align="center" >
                </el-table-column>
                <el-table-column prop="host_type" label="主机类型" align="center" >
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center" >
                </el-table-column>
                <el-table-column prop="update_time" label="更改时间" align="center" >
                </el-table-column>
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
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
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">

            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="用户名">
                    <el-input v-model="" :disabled="true"></el-input>
                </el-form-item>
              
            <el-form-item label="权限">
                <template >
                            <el-checkbox-group
                                v-model="checkedList">
                                <el-checkbox   v-for="p in editableList"  :label="p" :key="p">{{p}}</el-checkbox>
                            </el-checkbox-group>
                </template>
            </el-form-item>
                <el-form-item label="状态">
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
        </el-dialog> -->

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <!-- <el-dialog title="新增用户" :visible.sync="addVisible" width="40%">

            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="中文名">
                    <el-input v-model="form.name" @input="convertName"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input  v-model="form.mail" ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  v-model="form.password" ></el-input>
                </el-form-item>
               
                <el-form-item label="状态">
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog> -->

    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
import { constants } from 'crypto';
    export default {
        name: 'basetable',
        data() {
            return {
                assetsFile: [],
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
                loading: false,
                idx: -1,
                value:''
            }
        },
        created() {
            this.getData();
        },

        

        computed: {
            data() {
                return {
                    data: this.$store.state.assets.data
                 
                    }
                    // )}
            }
        },
   
        methods: {
            ...mapActions([
            'downloadTemplate',
            'getAssets',
            'globalSearchAsset',
            'uploadAssets',
            'uploadAssetsFile'
           ]),

           handlerDonwload(){
               this.downloadTemplate()
           },
            async upload(form){
                await this.uploadAssetsFile(form)
                
            },
           uploadFile(file, fileList){
                console.log("file:", file)
                let formData = new FormData()
                formData.append('file', file.raw)
                console.log("formData->", formData)
                this.upload(formData)
                this.getData()
                
           },
             async getData() {
                this.loading = true;
                try {
                await this.getAssets({page:this.cur_page, pageSize:this.page_size});
                // this.tableTree = this.$store.state.tree.data;
                this.page_total = this.$store.state.assets.pages
                 } finally {
                        this.loading = false;
                }
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                console.log("page:", val)
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
           

            convertName(e){
                const pinyin = pinyin4js.convertToPinyinString(e, '', pinyin4js.WITHOUT_TONE)
                this.form.username = pinyin
                this.form.mail = pinyin.concat("2014@xiaochuankeji.cn")
                this.form.password = "Xc666888"
            },
            async global_search_asset(select_word){
                await this.globalSearchAsset(select_word)
                
            },

            search() {
                this.global_search_asset(this.select_word)
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
               

                this.idx = index;
                const item = this.data.data[index];
                this.editVisible = false 
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
                const form = {
                    id: 0,
                    username: '',
                    is_active: '',
                    houseIdentifier:'',
                    del_houseIdentifier: '',
                    add_houseIdentifier: ''
                }
                
                
                this.editVisible = false
                this.getData()
            },
            saveAdd(){
                console.log("start save user")
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
    .upload-btn {
        display: inline-block;
    }
</style>

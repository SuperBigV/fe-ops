<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 系统接入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" @click="handlerUserAdd">新增系统</el-button>
            </div>
            <el-table :data="data.data" border class="table" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="name" label="系统名称" width="200" align="center">
                </el-table-column>
                <el-table-column prop="common" label="中文名" width="200" align="center">
                </el-table-column>
                <el-table-column prop="developer" label="开发者" width="200" align="center">
                </el-table-column>
                <el-table-column prop="mail" label="邮件" width="" align="center">
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-menu" class="cadetblue" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
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

            <el-form ref="form" :model="form" label-width="50px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="系统名称">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input  v-model="form.common" ></el-input>
                </el-form-item>
                <el-form-item label="开发者">
                    <el-input  v-model="form.developer" ></el-input>
                </el-form-item>
                <el-form-item label="mail">
                    <el-input  v-model="form.mail" ></el-input>
                    
                </el-form-item>
                <el-button class="el-icon-circle-plus" style="float:right;"  @click.prevent="addEditRow()"></el-button>
                <div>
                <!-- <el-form-item label="权限点"> -->
                    <el-table
                        :data="form.points"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.common"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                            <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleEditDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                <!-- </el-form-item> -->
            </div>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情弹出框 -->
        <el-dialog title="详情" :visible.sync="infoVisible" width="60%">

            <el-form ref="form" :model="form" label-width="60px">
                <!-- <el-form-item label="用户名">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
               <!-- <el-form-item label="编号" v-model="form.id">
                   <span>{{form.id}}</span>
                </el-form-item>  -->
                <el-form-item label="系统名称">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input  v-model="form.common"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="开发者">
                    <el-input  v-model="form.developer"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="mail">
                    <el-input  v-model="form.mail"  :disabled="true"></el-input>
                    
                </el-form-item>
                <div>
                <!-- <el-form-item label="权限点"> -->
                    <el-table
                        :data="form.points"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"  :disabled="true"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.common"  :disabled="true"></el-input>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleEditDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                <!-- </el-form-item> -->
            </div>

            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span> -->
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
        <el-dialog title="新增系统" :visible.sync="addVisible" width="60%">

            <el-form ref="system" :model="system" label-width="60px">

                <el-form-item label="系统名">
                    <el-input v-model="system.name"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input  v-model="system.common" ></el-input>
                </el-form-item>
                <el-form-item label="开发者">
                    <el-input  v-model="system.developer" @input="convertName"></el-input>
                </el-form-item>
                <el-form-item label="邮件">
                    <el-input v-model="system.mail"></el-input>
                </el-form-item>
                <!-- <div class="button" style="width:3%;float:right;"> -->
            </el-form>
      <el-button class="el-icon-circle-plus" style="float:right;"  @click.prevent="addRow()"></el-button>
    <!-- </div> -->

            <div>
                <!-- <el-form-item label="权限点"> -->
                    <el-table
                        :data="system.points"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.common"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                <!-- </el-form-item> -->
            </div>
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
                tableData:[],
                system:{
                   id: 0,
                    name: '',
                    common:'',
                    developer:'',
                    mail:'',
                    points:[] 
                },
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
                form: {
                    id: 0,
                    name: '',
                    common:'',
                    developer:'',
                    mail:'',
                    points:[]

                },
                idx: -1,
                value:'',
                selectlistRow:[]

            }
        },
        created() {
            this.getData()
            this.getSystems();
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
                    data: this.$store.state.systems.data
                   
                    }
            }
        },
 
        methods: {
            ...mapActions([
                'getSystems',
                'addSystem',
                'updateSystem'
           ]),
           selectRow (val) {
        this.selectlistRow = val
      },

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },

            async getData() {
                this.loading = true;
                try {
                await this.getSystems({
                        page: this.cur_page,
                        pageSize: this.page_size
                });
                this.page_total = this.$store.state.systems.pages;
                this.tableData = this.$store.state.systems.data
                 } finally {
                        this.loading = false;
                }
            },
            async loadData() {
                this.loading = true;
                try {
                await this.getSystems({
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
                    developer: item.developer,
                    mail: item.mail,
                    points:item.points 
                    // password: item.password,
                    // public_key: item.public_key
                }
              
                this.editVisible = true;
            },
            handleInfo(index, row){
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    name: item.name,
                    common: item.common,
                    developer: item.developer,
                    mail: item.mail,
                    points:item.points 
                    // password: item.password,
                    // public_key: item.public_key
                }
                this.infoVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                console.log(this.tableData.length)
                this.tableData.pop(index)
                console.log(this.tableData.length)
                // this.delVisible = true;
            },
             handleEditDelete(index, row) {
                this.idx = index;
                console.log(this.form.points.length)
                this.form.points.pop(index)
                console.log(this.form.points.length)
                // this.delVisible = true;
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
                // this.form.password = this.tableData[this.idx].password
                // this.form.public_key = this.tableData[this.idx].public_key
                this.$set(this.tableData, this.idx, this.form);
                this.updateSystem(this.tableData[this.idx])
                this.editVisible = false;
            },
            saveAdd(){
                console.log("start save user")
                this.addSystem(this.system)
                // this.loadData()
                this.addVisible = false
            },
            addRow () {
        var list = {
          point: this.point,
          common: this.common,
        }
           this.system.points.unshift(list)
      },
      convertName(){
          this.system.mail = this.system.developer.concat("2014@xiaochuankeji.cn")
      },
      addEditRow () {
        var list = {
          point: this.point,
          common: this.common,
          system:{
              common: this.tableData[this.idx].common,
              id: this.tableData[this.idx].id,
              name: this.tableData[this.idx].name
          }
        }
           this.form.points.unshift(list)
      },
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        // this.$refs.tableData.clearSelection()
      },




            deleteRow(){
                var del_id = this.tableData[this.idx].id
                this.tableData.splice(this.idx, 1);
                this.deleteUser(del_id)
                this.$message.success('删除成功');
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

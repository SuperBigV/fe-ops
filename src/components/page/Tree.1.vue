<template>
<div class="container">
   <el-row :gutter="20">
  <el-col :span="4">
      <div class="grid-content bg-purple">
          <el-tree
   :data="tableTree"
  ref="tree"
  highlight-current
  :props="defaultProps"
  default-expand-all
  @node-click="getAssets"
  :default-checked-keys="[5]">
  

</el-tree>
 </div></el-col>
  <el-col :span="20">
     <div class="container">
          <el-row>
              <el-col :span=8><div> 
               当前节点：<el-input v-model="cur_tag" class='handle-input' :disabled="true"></el-input>
           </div></el-col>
              <el-col :span=16> <div class="handle-box">
                
               <el-input v-model="select_word" placeholder="主机名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
           </div></el-col>
          </el-row>
          
            <el-table :data="data.hostTable" border  class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="hostname" label="主机名" width="150" align="center">
                </el-table-column>
                <el-table-column align="center" label="ip" prop="bip" width="150">
          </el-table-column>
                <el-table-column class="tag" prop="tag" label="产品线" align="center" :formatter="formatData">
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-refresh-right" @click="handleEdit(scope.$index, scope.row)">重启</el-button>
                        <el-button type="text" icon="el-icon-edit" class="cadetblue" @click="handleDelete(scope.$index, scope.row)">改名</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">下线</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" 
                :page-count="data.page_total"
                :page-size="page_size"
                :current-page="cur_page">
                </el-pagination>
            </div>
        </div>
  </el-col>
</el-row> 
   </div> 
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                url: './vuetable.json',
                tableTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                cur_tag: 'cop.xiaochuan',
                hostTable:[],
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
                    username: '',
                    password:'',
                    protocol: 'ssh',
                    is_active: '',
                    public_key: ''

                },
                idx: -1,
                options: [{id: 1, value: false, label:"禁用"}, {id:2, value: true, label:"启用"}],
                value:'',
                
                
            }
        },
        created() {
            this.getData();
            // this.getUserPrivTags();
        },
        computed: {
            data() {
                return {
                    hostTable:this.$store.state.nodeassets.data,
                    page_total: (this.$store.state.nodeassets.total+this.page_size-1)%this.page_size,
                    cur_tag: this.$store.state.node_path?this.cur_tag=this.$store.state.node_path:this.cur_tag=this.$store.state.node_path,
                    }
            }
        },
   
        methods: {
            ...mapActions([
            'getUserPrivTags',
            'getNodeAssets',
            'getNodePath',
            'getTempInstances'
           
           ]),
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            async getData() {
                this.loading = true;
                
                try {
                await this.getUserPrivTags();
                await this.getTempInstances(this.cur_page, this.page_size);
                this.tableTree = this.$store.state.tree.data;
                
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
                    username: item.username,
                    protocol: item.protocol,
                    is_active: item.is_active,
                    password: "",
                    public_key: ""
                    // password: item.password,
                    // public_key: item.public_key
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
                this.addUser(this.form)
                this.loadData()
                this.addVisible = false
            },
            // 确定删除
            deleteRow(){
                var del_id = this.tableData[this.idx].id
                this.tableData.splice(this.idx, 1);
                this.deleteUser(del_id)
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            getAssets(data, node, component){
                // console.log("node_id:", node_id)
                this.getNodeAssets(data.id)
                this.getNodePath(data.id)
            },
            formatData(row, column, cellValue){
                // console.log(row)
                // console.log("column:"+column)
                return cellValue.length==2?cellValue.join("\n"):cellValue.join("\n")
            }
        }
    }

</script>

<style scoped>
 .tag {
    white-space: pre-line;
    }
     .handle-box {
        margin-bottom: 20px;
        margin-left: 100px;
    }
    .tree{
        width: 18%;
        
    }
     .handle-input {
        width: 300px;
        display: inline-block;
        /* float: right; */
        /* margin-right:10px; */
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
    .cadetblue{
        color: cadetblue;
    }
    .mr10{
        margin-right: 10px;
        /* float: right; */
    }
  
</style>

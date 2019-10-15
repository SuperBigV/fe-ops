<template>
<div class="container">
   <el-row :gutter="20">
  <el-col :span="4">
      <!-- <div class="grid-content bg-purple"> -->
          服务树
         <el-tree
            :data="tableTree"
            :props="defaultProps"
            node-key="id"
            ref="SlotMenuList"
            :filter-node-method="filterNode"
            @node-contextmenu='rihgtClick'
            @node-click="getAssets"
            :default-expanded-keys=[1]
            :default-checked-keys =[1]
            :current-node-key=1
            accordion
            v-loading="loading"
            >
          
          </el-tree>
          <!--鼠标右键点击出现页面-->
          <div v-show="menuVisible">
            <el-menu
              id = "rightClickMenu"
              class="el-menu-vertical"
              @select="handleRightSelect"
              active-text-color="#fff"
              text-color="#fff">
              <el-menu-item index="1" class="menuItem">
                <span slot="title">添加节点</span>
              </el-menu-item>
              <el-menu-item index="2" class="menuItem">
                <span slot="title">修改节点</span>
              </el-menu-item>
              <el-menu-item index="3" class="menuItem">
                <span slot="title">删除节点</span>
              </el-menu-item>
            </el-menu>
 </div>
 </el-col>
  <el-col :span="20">
     <div class="container">
          <el-row>
              <el-col :span=8><div> 
               当前节点：<el-input v-model="cur_tag" class='handle-input' :disabled="true"></el-input>
           </div></el-col>
            <el-col :span=4><div> 
               <el-badge :value="data.counts" class="item">
                    <el-button size="small">主机数量</el-button>
                </el-badge>
           </div></el-col>
              <el-col :span=12> <div class="handle-box">
                
               <el-input v-model="select_word" placeholder="主机名或ip" class="handle-input mr10"></el-input>
                 <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                 <el-button type="success" round @click="hostBind">主机绑定</el-button>
           </div></el-col>
          </el-row>
          
            <el-table :data="data.hostTable" border  class="table" ref="multipleTable" v-loading='loading' @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="id" width="50"></el-table-column>
                <el-table-column prop="hostname" label="主机名" width="150" align="center">
                </el-table-column>
                <el-table-column align="center" label="ip" prop="bip" width="150">
          </el-table-column>
                <!-- <el-table-column prop="tag" label="产品线" align="center" :formatter="formatData"> -->
                <el-table-column prop="tag" label="产品线" align="center">
                    <template slot-scope="scope">
                        <div v-for="currentTag in scope.row.tag" :key="currentTag">
                           {{currentTag}} 
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-refresh-right" @click="handleReboot(scope.$index, scope.row)">重启</el-button>
                        <el-button type="text" icon="el-icon-edit" class="cadetblue" @click="handleRename(scope.$index, scope.row)">改名</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">下线</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" 
                :page-count="page_count"
                :page-size="page_size"
                :current-page="cur_page">
                </el-pagination>
            </div>
        </div>
  </el-col>
</el-row> 
<!-- 主机绑定弹出框 -->
        <el-dialog title="主机绑定" :visible.sync="bindVisible" width="30%">
            <el-form ref="NODE" :model="NODE" label-width="90px">
                <el-form-item label="产品线">
                    <!-- <el-input v-model="NODE.name"></el-input> -->
                    <el-select  v-model="n_value" @change="getChangedNode" filterable placeholder="请选择节点">
                        <el-option
                          v-for="item in nodes"
                          :key="item.tag_id"
                          :label="item.business"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主机">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="bindHosts">
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="bind">绑定</el-button> -->
                <!-- <el-button type="primary" @click="unbind">解绑</el-button> -->
                 <el-button type="success" round @click="bind">绑定</el-button>
                  <el-button type="danger" round @click="unbind">解绑</el-button>
                <el-button @click="bindVisible = false">取 消</el-button>
            </span>
        </el-dialog>
<!-- 新增弹出框 -->
        <el-dialog title="新增节点" :visible.sync="addVisible" width="30%">
            <el-form ref="NODE" :model="NODE" label-width="90px">
                <el-form-item label="节点名称">
                    <el-input v-model="NODE.name"></el-input>
                </el-form-item>
                <el-form-item label="节点别名">
                    <el-input  v-model="NODE.cname" ></el-input>
                </el-form-item>
                <el-form-item label="节点类型">
                    <el-input  v-model="NODE.node_type" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="节点负责人"  >
                    <el-input  v-model="NODE.info.owner" @input="updateOwner" ></el-input>
                </el-form-item>
                <el-form-item label="联系人邮箱">
                    <el-input  v-model="NODE.info.mail" ></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑节点" :visible.sync="editVisible" width="30%">
            <el-form ref="NODE" :model="NODE" label-width="90px">
                <el-form-item label="节点名称">
                    <el-input v-model="NODE.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="节点别名">
                    <el-input  v-model="NODE.cname" ></el-input>
                </el-form-item>
                <el-form-item label="节点类型">
                    <el-input  v-model="NODE.node_type" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="节点负责人">
                    <el-input  v-model="NODE.info.owner" ></el-input>
                </el-form-item>
                <el-form-item label="联系人邮箱">
                    <el-input  v-model="NODE.info.mail" ></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    
    <!-- 重启提示框 -->
        <el-dialog title="主机重启" :visible.sync="rebootVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定重启？</div>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="主机"
                v-model="hosts">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rebootVisible = false">取 消</el-button>
                <el-button type="primary" @click="rebootHost">确 定</el-button>
            </span>
        </el-dialog>
    <!-- 改名提示框 -->
        <el-dialog title="修改主机名" :visible.sync="renameVisible" width="500px" center>
            <el-form ref="name" label-width="90px">
            <el-form-item label="主机名:">
                <el-input v-model="old_name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="新主机名:">
            <el-input
                placeholder="请输入新主机名"
                v-model="new_name"
                clearable>
            </el-input>
            </el-form-item>
            </el-form> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="renameVisible = false">取 消</el-button>
                <el-button type="primary" @click="renameHost">确 定</el-button>
            </span>
        </el-dialog>
    <!-- 下线提示框 -->
        <el-dialog title="主机下线" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">下线不可恢复，是否确定下线？</div>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="主机"
                v-model="hosts">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="offlineHost">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delNodeVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delNodeVisible = false">取 消</el-button>
                <el-button type="primary" @click="NodeDel">确 定</el-button>
            </span>
        </el-dialog>
   </div> 
</template>

<script>
    import {mapActions} from 'vuex'
import { constants } from 'crypto';
    export default {
        data() {
            return {
                url: './vuetable.json',
                tableTree: [],
                counts: "",
                menuVisible: false,
                DATA: null,
                VALUE: null,
                bindHosts:  "",
                NODE: {
                    name: '',
                    cname: '',
                    node_type: '',
                    pid: 0,
                    info:{
                        mail:'',
                        owner: ''
                    }
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                nodes:[],
                cur_tag: 'cop.xiaochuan',
                hostTable:[],
                cur_page: 1,
                page_size: 10,
                page_count: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                delNodeVisible: false,
                rebootVisible: false,
                renameVisible: false,
                infoVisible: false,
                bindVisible: false,
                old_name: "",
                new_name: "",
                idx: -1,
                loading: false,
                value:'',
                n_value:'',
                hosts: undefined,
                bind_form:{
                    node_id:'',
                    host_ids:[]
                }
                
                
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
                    counts:this.$store.state.nodeassets.total,
                    // page_total: (this.$store.state.nodeassets.total+this.page_size-1)%this.page_size,
                    page_total: parseInt((this.$store.state.nodeassets.total+this.page_size-1)/this.page_size),
                    cur_tag: this.$store.state.node_path?this.cur_tag=this.$store.state.node_path:this.cur_tag=this.$store.state.node_path,

                    }
            }
        },
   
        methods: {
            ...mapActions([
            'getUserPrivTags',
            'getNodeAssets',
            'getNodePath',
            'getTempInstances',
            'getNextNodeType',
            'addTreeNode',
            'deleteNode',
            'globalSearch',
            'getNodes',
            'bind_hosts',
            'unbind_hosts',
            'reboot',
            'offline',
            'rename'
           
           ]),
           filterNode(value, data) {
      console.log('value:',value)
      console.log('data:',data)
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getTreeHost();
            },
            async getTreeHost(){
                await this.getNodeAssets(1)
            },
            async getData() {
                this.loading = true;
                try {
                await this.getUserPrivTags();
                await this.getNodes();
                await this.getTempInstances(this.cur_page, this.page_size);
                await this.getNodeAssets(1)
                await this.getNodePath(1)
                this.tableTree = this.$store.state.tree.data;
                this.nodes = this.$store.state.nodes
                
                 } finally {
                        this.loading = false;
                }
            },
            async global_search(select_word){
                await this.globalSearch(select_word)
            },
            updateOwner(u){
                this.NODE.info.mail = u.concat("2014@xiaochuankeji.cn")

            },

            search() {
                this.global_search(this.select_word)
                // this.getData()
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
            handleReboot(index, row) {
                console.log("index:", index)
                console.log("row:", row)
                if (!this.hosts){
                    this.hosts = row["hostname"]
                    this.multipleSelection = row
                }
                this.rebootVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                console.log(">>>row:", row)
                this.delVisible = true;
                // this.getData()
            },
            handleRename(index, row) {
                this.old_name = row["hostname"]
                this.multipleSelection = row
                console.log("row:", row)
                // this.idx = index;
                // const item = this.tableData[index];
                // this.form = {
                //     id: item.id,
                //     username: item.username,
                //     protocol: item.protocol,
                //     is_active: item.is_active,
                //     password: "",
                //     public_key: ""
                //     // password: item.password,
                //     // public_key: item.public_key
                // }
                // if (!item.is_active){
                //     this.value = "禁用"
                // }else{
                //     this.value = "启用"
                // }
                this.renameVisible = true;
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
            async saveAdd(){
                if(this.VALUE.level >= 4){
				    this.$message.error("最多只支持四级！")
				    return false;
                }
                await this.addTreeNode(this.NODE)
                this.addVisible = false
                this.NODE = {
                    name: '',
                    cname: '',
                    node_type: '',
                    pid: 0,
                    info:{
                        mail:'',
                        owner: ''
                    }
                }
                this.getData();
            },
            // 确定删除
            async NodeDel(){
                await this.deleteNode(this.DATA.id)
                // console.log("delete_id:", this.DATA.id)
                this.delNodeVisible = false;
                this.getData()
            },

           rebootHost(){
                console.log("Host:", this.multipleSelection);
                this.reboot(this.multipleSelection)
                this.rebootVisible = false

           },

           renameHost(){
                console.log("new_name:", this.new_name)
                this.multipleSelection["newname"] = this.new_name
                this.rename(this.multipleSelection)
                this.renameVisible = false
           },

           offlineHost(){
               console.log("offlineHosts:", this.multipleSelection)
               this.offline(this.multipleSelection)
               this.delVisible = false
           },

            getAssets(data, node, component){
                // console.log("node_id:", node_id)
                this.getNodeAssets(data.id)
                this.getNodePath(data.id)
            },
            //formatData(row, column, cellValue){
                //console.log("row:",row)
                //console.log("cellvalue:", cellValue) 
                //if (cellValue.length>1){
                                   //return cellValue.join('\n') }
                               //return cellValue[0]
                //// console.log("column:"+column)
                //// return cellValue.length==2?cellValue.join("\n"):cellValue.join("\n")
            //},
            handleRightSelect(key) {
                console.log(key);
                if (key == 1) {
                  this.menuVisible = false;
                //   this.NODE = {
                //     name: '',
                //     cname: '',
                //     node_type: '',
                //     pid: 0,
                //     info:{
                //         mail:'',
                //         owner: ''
                //     }
                // },
                // this.NODE.node_type = this.DATA.node_type
                  this.addVisible = true;
                //   this.NodeAdd(this.NODE, this.DATA);
                } else if (key == 2) {
                  this.NODE.name = this.DATA.name
                  this.NODE.cname = this.DATA.cname
                  this.NODE.info.owner = this.DATA.info.owner
                  this.NODE.info.mail= this.DATA.info.mail
                  this.NODE.node_type = this.DATA.node_type
                  this.editVisible = true;
                  
                } else if (key == 3) {
                //   this.NodeDel(this.NODE, this.DATA);
                  this.delNodeVisible = true
                  this.getData()
                } else if(key == 4){
                  console.log('4')
                  this.menuVisible = false;
                }
            },

    handleRightSelect1(key) {
      console.log(key);
      if (key == 1) {
        //   this.infoVisible = true;
        // this.NodeAdd(this.NODE, this.DATA);
        this.menuVisible2 = false;
      } else if (key == 2) {
        this.NodeEdit(this.NODE, this.DATA);
        this.menuVisible2 = false;
      } else if (key == 3) {
        this.NodeDel();
        this.menuVisible2 = false;
      } else if(key == 4){
        console.log('4')
      }
    },
    getChangedNode(node){
        this.n_value = node.business
        this.bind_form.node_id = node.tag_id
            
    },
    hostBind(){
        this.bind_form.host_ids = []
        this.bind_form.node_id = ''
        let hosts = []
        for(let i = 0; i < this.multipleSelection.length; i++){
            hosts.push(this.multipleSelection[i].hostname)
        }
        console.log("hosts:", hosts)
        console.log("tag:", )
        this.bindHosts = hosts.join('\n')
        this.bindVisible = true
    },
    bind(){
        for(let i = 0; i < this.multipleSelection.length; i++){
            this.bind_form.host_ids.push(this.multipleSelection[i].id)
        }
        console.log("bind_hsots:", this.bind_form)
        this.bind_hosts(this.bind_form)
        this.bindVisible = false
        this.getData()
    },

    unbind(){
        for(let i = 0; i < this.multipleSelection.length; i++){
            this.bind_form.host_ids.push(this.multipleSelection[i].id)
        }
        console.log("bind_hsots:", this.bind_form)
        this.unbind_hosts(this.bind_form)
        this.bindVisible = false
        this.getData()
    },
   
	handleSelectionChange(val) {
        this.multipleSelection = val;
        const hosts = []
        for (let i = 0; i < this.multipleSelection.length; i++){
            hosts.push(val[i].hostname)
        }
        this.hosts = hosts.join("\n")
        console.log("seclection:", this.multipleSelection)

    },
		
    async getNextNT(node_type){
         await this.getNextNodeType(node_type)
        this.NODE.node_type = this.$store.state.node_type.data
    },
    rihgtClick(event, object, value, element) {
      if (this.objectID !== object.id) {
        this.NODE.pid = object.id;
        this.getNextNT(object.node_type)
        this.menuVisible = true;
        this.DATA = object;
        this.VALUE = value;

      } else {
        this.menuVisible = !this.menuVisible;
      }
      document.addEventListener('click',(e)=>{
        this.menuVisible = false;
      })
      let menu = document.querySelector("#rightClickMenu");
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.clientX
      menu.style.top = event.clientY 
      menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
      menu.style.width = 130 + "px";
      console.log("右键被点击的左侧:",menu.style.left);
        console.log("右键被点击的顶部:",menu.style.top);
      //        console.log("右键被点击的event:",event);
      console.log("右键被点击的object:", object);
      console.log("右键被点击的value:", value);
      // console.log("右键被点击的element:", element);
    },
    rihgtClick2(event, object, value, element) {
      if (this.objectID2 !== object.id) {
        this.objectID2 = object.id;
        this.menuVisible2 = true;
        this.DATA = object;
        this.NODE = value;
      } else {
        this.menuVisible2 = !this.menuVisible2;
      }
      document.addEventListener('click',(e)=>{
        this.menuVisible2 = false;
      })
      let menu = document.querySelector("#rightClickMenu2");
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.clientX + 30 + "px";
      menu.style.top = event.clientY + 10 + "px";
      menu.style.position = "fixed"; // 为新创建的DIV指定绝对定位
      menu.style.width = 160 + "px";
      // console.log("右键被点击的左侧:",menu.style.left);
      //  console.log("右键被点击的顶部:",menu.style.top);
      // console.log("右键被点击的event:",event);
      //  console.log("右键被点击的object:",object);
      //  console.log("右键被点击的value:",value);
      //  console.log("右键被点击的element:",element);
    },
    dialogNewFormConfirm() {
      (this.dialogNewFormVisible = false),
        this.$message({
          type: "success",
          message: "新建成功!"
        });
    },
        }
    }

</script>

<style scoped>
.el-table .cell {
  white-space: pre-line;
}
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
  .el-tree{
  padding-left: 10%;
  padding-right: 20%;
  background-color: #FAFAFA;
  font-size: 1.2rem;
}
.el-tree i{
  color: #409EFF;
  padding-right: 20px;
}
.el-tree-node__content>.el-tree-node__expand-icon {
  display: none;
}
.el-menu-vertical{
  border: 3px solid rgb(84, 92, 100);
  border-radius: 10px;
  z-index: 100;
}
.el-menu-vertical i{
  color: #777777;
}
.menuItem{
  height: 40px;
  line-height: 40px;
  background-color: #545c64;
  font-size: 1.2rem;
}
.menuItem:hover{
  background-color: #409EFF;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #303133;
}

</style>

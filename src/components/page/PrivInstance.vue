<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 模板实例管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" @click="handlerInstanceAdd">创建模板实例</el-button>

            </div>
            <el-table :data="templateInstances" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="tag" label="节点" width="%60" align="center">
                </el-table-column>
                <el-table-column prop="template_name" label="模板" width="%20" align="center">
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">继承</el-button>
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

           <el-form ref="instance" :model="instance" label-width="50px">
                <el-form-item label="节点">
                    <el-input v-model.trim="instance.tag" placeholder="节点" ></el-input>
                </el-form-item>
                <el-form-item label="模板">
                    <el-input v-model="instance.template_name" placeholder="模板" :disabled="true"></el-input>
                </el-form-item>
                <div>
                    <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <el-table-column label="系统名称" align="center" width="150px">
                            <template slot-scope="scope">
                                {{ scope.row.name }}
                            </template>
                        </el-table-column>
                        <el-table-column label="系统中文名" align="center" width="150px">
                            <template slot-scope="scope">
                                {{ scope.row.common }}
                            </template>
                        </el-table-column>
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-checkbox-group
                                v-model="checkedList">
                                <div v-if="instance.tag=='cop.xiaochuan'">
                                <el-checkbox   v-for="p in scope.row.points"  :label="p.name" :key="p.id" >{{p.common}}</el-checkbox>
                                </div>
                                <div v-else>
                                <el-checkbox   v-for="p in scope.row.points"  :label="p.name" :key="p.id" :disabled="!editableList.includes(p.name)">{{p.common}}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                            </template>
                         
                        </el-table-column>
                       
                    </el-table>
            </div> 

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情出框 -->
        <el-dialog title="编辑" :visible.sync="infoVisible" width="60%">

           <el-form ref="info" :model="instance" label-width="50px">
                <el-form-item label="节点">
                    <el-input v-model="instance.tag" placeholder="节点" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="模板">
                    <el-input v-model="instance.template_name" placeholder="模板" :disabled="true"></el-input>
                </el-form-item>
                <div>
                    <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <el-table-column label="系统名称" align="center" width="150px">
                            <template slot-scope="scope">
                                {{ scope.row.name }}
                            </template>
                        </el-table-column>
                        <el-table-column label="系统中文名" align="center" width="150px">
                            <template slot-scope="scope">
                                {{ scope.row.common }}
                            </template>
                        </el-table-column>
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-checkbox-group
                                v-model="checkedList">
                                <el-checkbox   v-for="p in scope.row.points"  :label="p.name" :key="p.id" :disabled="!editableList.includes(p.name)">{{p.common}}</el-checkbox>
                            </el-checkbox-group>
                            </template>
                         
                        </el-table-column>
                       
                    </el-table>
            </div> 

            </el-form>
        </el-dialog>

      

        <!-- 新增弹出框 -->
        <el-dialog title="创建模板实例" :visible.sync="addVisible" width="60%">

            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="节点">
                    <el-select v-model="n_value" @change="getChangedNode" filterable placeholder="请选择节点">
                        <el-option
                          v-for="item in nodes"
                          :key="item.tag_id"
                          :label="item.business"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模板">
                    <el-select v-model="t_value"  @change="getChangedTemplate" filterable placeholder="请选择模板">
                        <el-option
                          v-for="item in templates"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div>
                <!-- <el-form-item label="权限点"> -->
                    <el-table
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark"
                        border 
                        stripe
                        >
                        <!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
                        <el-table-column label="系统名称" align="center" width="150px">
                            <template slot-scope="scope">
                                <!-- <el-input  type="" v-model="scope.row.name"></el-input> -->
                                {{ scope.row.name }}
                            </template>
                        </el-table-column>
                        <el-table-column label="系统中文名" align="center" width="150px">
                            <template slot-scope="scope">
                                <!-- <el-input v-model="scope.row.common"></el-input> -->
                                {{ scope.row.common }}
                            </template>
                        </el-table-column>
                        <el-table-column label="权限点" align="center">
                            <template slot-scope="scope">
                                <el-checkbox-group v-model="form.instance.points">
                                    <el-checkbox v-for="p in scope.row.points"  :label="p" :key="p.id">{{p.common}}</el-checkbox>
                                </el-checkbox-group>
                            </template>

                        </el-table-column>
                       
                    </el-table>
                <!-- </el-form-item> -->
            </div> 

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
import { constants } from 'crypto';
    export default {
        name: 'basetable',
        data() {
            return {
                checkedList: [],
                editableList: [],
                tableData: [],
                checkedPoints:[],
                cur_page: 1,
                page_size: 50,
                page_total: 1,
                multipleSelection: [],
                del_list: [],
                is_search: false,
                addVisible: false,
                editVisible: false,
                infoVisible: false,
                delVisible: false,
                nodes: [],
                templates: [],
                templateInstances:[],
                instance_points:{},
                ins: {
                    tag:'',
                    template_name:''
                },
                system:{
                   id: 0,
                    name: '',
                    common:'',
                    developer:'',
                    main:'',
                    points:[] 
                },
                instance: {
                    id: 0,
                    tag_id: 0,
                    tag: '',
                    template_id: 0,
                    template_name: '',
                },
                form: {
                    id: 0,
                    name: '',
                    common: '',
                    instance:{
                            tag: '',
                            tag_id: 0,
                            points:[]
                        },

                },
                template_instances_inhert:{
                    id: 0,
                    name: '',
                    common: '',
                    instance: {
                        // id:0,
                        tag: '',
                        tag_id: 0,
                        points: []
                    },
                    tag:''
                },
                idx: -1,
                n_value: {},
                t_value: {},
            }
        },
        created() {
            // this.getData();
            this.getData();
        },
        computed: {
            // data() {
            //     return {
            //         // data: this.$store.state.users.data
                   
            //         }
            // }
        },
   
        methods: {
            ...mapActions([
            'getNodes',
            'getTemplates',
            'getSystems',
            'createTempateInstance',
            'getTempInstances',
            'getNearestPoints',
            'editTempateInstance'
           ]),

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
         
            async getData() {
                this.loading = true;
                try {
                await this.getNodes();
                await this.getTemplates();
                await this.getSystems();
                await this.getTempInstances(this.cur_page, this.page_size);
                
                this.nodes = this.$store.state.nodes
                this.templates = this.$store.state.templates.data
                this.tableData = this.$store.state.systems.data
                this.templateInstances = this.$store.state.template_instance.data
               
                 } finally {
                        this.loading = false;
                }
            },
            async getNearestPs(){
                this.editableList = []
                this.checkedList = []
                await this.getNearestPoints(this.ins)
                this.instance_points = this.$store.state.nearestPoints.data
                let checked = this.$store.state.nearestPoints.checked 
                for(var key in this.instance_points){
                    let points = this.instance_points[key]
                    for (var i =0; i< points.length; i++){
                        this.editableList.push(points[i].name)
                        // this.checkedList.push(points[i].name)
                    }
                }

               for(var key in checked ){
                    let points = checked[key]
                    for (var i =0; i< points.length; i++){
                        // this.editableList.push(points[i].name)
                        this.checkedList.push(points[i].name)
                    }
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
            handlerInstanceAdd(){
                this.n_value = ''
                this.t_value=''
                this.addVisible=true;
            },
            handleInfo(index, row){
                const item = this.templateInstances[index];
                this.ins = {
                    tag: item.tag,
                    template_name: item.template_name
                }
                // 获取最近的实例权限点
                this.getNearestPs()
                this.instance = {
                    id: item.id,
                    tag: item.tag,
                    template_name: item.template_name,
                }
                this.infoVisible = true;
            },
            handleEdit(index, row) {
                // this.getData()
                this.idx = index;
                const item = this.templateInstances[index];
                this.ins = {
                    tag: item.tag,
                    template_name: item.template_name
                }
                // 获取最近的实例权限点
                this.getNearestPs()
                this.instance = {
                    id: item.id,
                    tag_id: item.tag_id,
                    tag: item.tag,
                    template_id: item.template_id,
                    template_name: item.template_name,
                }
            //   for(var key in this.instance_points){
            //                 console.log("key:"+key)
            //             }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
          
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                // template_instances_inhert:{
                //     id: 0,
                //     name: '',
                //     common: '',
                //     instance: {
                //         id:0,
                //         tag: '',
                //         tag_id: 0,
                //         points: []
                //     },

                // },
                const item = this.templateInstances[this.idx];
                console.log("item.tag:", item.tag)
                console.log("instance.tag:", this.instance.tag)
                if (item.tag === this.instance.tag){
                    this.template_instances_inhert.instance["id"] = this.instance.id
                }
                this.template_instances_inhert.id = this.instance.template_id
                this.template_instances_inhert.name = this.instance.template_name
                this.template_instances_inhert.instance.tag_id = this.instance.tag_id
                this.template_instances_inhert.instance.tag = this.instance.tag
                this.template_instances_inhert.tag = this.instance.tag
                
                console.log("checkList:", this.checkedList)
                 for (var i = 0; i < this.checkedList.length; i++){
                    for(var j = 0; j < this.tableData.length; j++){
                        for (var k =0; k < this.tableData[j].points.length; k++){
                            console.log(">>>>>>>>>>>", this.tableData[j].points[k].name)
                            if (this.tableData[j].points[k].name === this.checkedList[i]){
                                this.template_instances_inhert.instance.points.push(this.tableData[j].points[k])
                                break
                            }else{
                                continue

                            }
                        }
                    }
                }
                // for (var i = 0; i < this.checkedList.length; i++){
                //     for(var j = 0; j < this.templateInstances.length; j++){
                //         for (var k =0; k < this.templateInstances[j].points.length; k++){
                //             console.log(">>>>>>>>>>>", this.templateInstances[j].points[k].name)
                //             if (this.templateInstances[j].points[k].name === this.checkedList[i]){
                //                 this.template_instances_inhert.instance.points.push(this.templateInstances[j].points[k])
                //                 break
                //             }else{
                //                 continue

                //             }
                //         }
                //     }
                // }
                console.log("commit list:", this.template_instances_inhert)
                this.editTempateInstance(this.template_instances_inhert)
                this.editVisible = false
                
            },
            saveAdd(){
                console.log("start create instance")
                this.createTempateInstance(this.form)
                this.addVisible = false
                this.getData()
            },
         

            getChangedNode(node){
                this.n_value = node.business
                this.form.instance.tag = node.business
                this.form.instance.tag_id = node.tag_id

            },
            getChangedTemplate(template){
                console.log("template:"+template)
                this.t_value = template.name
                this.form.name = template.name
                this.form.id = template.id
                this.form.common = template.common 
            }
        }
    }

</script>

<style scoped>
    .el-select {
        width: 500px;
    }
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

<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户授权</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
             <el-form ref="form" :model="form" label-width="60px">
             
                <el-form-item label="主机" >
                    <!-- <el-select v-model="n_value" @change="getChangedNode" filterable multiple clearable placeholder="请选择节点" style="width:500px"> -->
                    <el-select v-model="n_value" value-key="hostname" filterable  clearable multiple placeholder="请选择主机" style="width:500px">
                        <el-option
                          v-for="item in assets"
                          :key="item.id"
                          :label="item.hostname"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="t_value"  @change="getChangedTemplate" filterable  clearable placeholder="请选择角色">
                        <el-option
                          v-for="item in options"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户">
                    <el-select v-model="u_value" value-key="username"  multiple filterable clearable placeholder="请选择被授权用户">
                    <!-- <el-select v-model="u_value" @change="getChangedUser" multiple filterable clearable placeholder="请选择被授权用户"> -->
                        <el-option
                          v-for="item in users"
                          :key="item.id"
                          :label="item.username"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
            </div>    
            <div class="but">
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAdd">授 权</el-button>
            </span>
            </div>
        </div>

    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                page_size: 50,
                page_total: 1,
                users: [],
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                assets: [],
                templates: [],
                // form: {
                //     id: 0,
                //     tag: '',
                //     tag_id: 0,
                //     grantor: '',
                //     user_id: '',
                //     template_id: ''

                // },
                form: {
                    id: 0,
                    tags: [],
                    grantor: '',
                    users: [],
                    template_id: ''
                },
                username: '',
                idx: -1,
                options: [{id: 1, name: "root"}, {id:2, name: "work"}],
                value:'',
                nodes: [],
                // users: [],
                instances: [],
                n_value: [],
                t_value: '',
                t_template_id:'',
                u_value: []
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
                    
                    
                    }
            }
        },
   
        methods: {
            ...mapActions([
            'getUsers',
            'getAllAssets',
            'tempGrant'
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
                        pageSize: 2000
                    });
                    await this.getAllAssets();
                    this.assets = this.$store.state.all_assets
                    console.log("this.assets:", this.assets)
                    this.users = this.$store.state.users.data
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
                console.log("users:", this.data.u_value)
                const form = {
                    id: 0,
                    hosts: this.n_value,
                    grantor: this.$store.state.user.username,
                    users: this.u_value,
                    role: this.t_value
                }
                this.tempGrant(form)
                this.getData()
            },
            // 确定删除
            deleteRow(){
                var del_id = this.tableData[this.idx].id
                this.tableData.splice(this.idx, 1);
                this.deleteUser(del_id)
                this.$message.success('删除成功');
                this.delVisible = false;
            },
             getChangedNode(node){
                console.log("node:" + node.tag_id)
                this.form.tag = node.business
                this.form.tag_id = node.tag_id
                this.n_value = node.business
            },
             getChangedTemplate(template){
                console.log("template:"+template.id)
                this.t_template_id = template.id
                this.t_value = template.name
            },
            getChangedUser(user){
                console.log("user:", user)
                this.form.user_id = user.id
                this.u_value = user.username
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
        width: 200px;
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
    .but{
        margin-left: 1000px;
    }
</style>

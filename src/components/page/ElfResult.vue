<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 系统初始化</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="编号" prop="id" width="80" align="center"></el-table-column> 
                <el-table-column prop="hostnames" label="主机名"  width="400" align="center">
                </el-table-column>
                <el-table-column prop="git_url" label="git地址"  width="400"  align="center">
                </el-table-column>
                <el-table-column prop="init_time" label="初始化时间" width="200" align="center">
                </el-table-column>
                <el-table-column prop="result" label="结果" align="center">
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
                jobs:{
                   id: 0,
                    node: [],
                    account:'',
                    git:'',
                    user:'',
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
                accounts:[
                    {
                        id: 1,
                        name: "root",
                        account: "root"
                    },
                    {
                        id: 2,
                        name: "work",
                        account: "work"
                    }
                ],
                form: {
                    id: 0,
                    node: '',
                    account:'',
                    git:'',
                    user:'',
                },
                idx: -1,
                value:'',
                selectlistRow:[],
                nodes: [],
                users: []
                

            }
        },
        created() {
            this.getData()
        //     this.getJobs();
        },
        // computed: {
        //     data() {
        //         return {
        //             data: this.$store.state.result.data

        //             }
        //     }
        // },
 
        methods: {
            ...mapActions([
                 'getResults'
           ]),
           selectRow (val) {
        this.selectlistRow = val
      },

            async getData() {
                this.loading = true;
                try {
                await this.getResults({page:this.cur_page, pageSize:this.page_size});
                // this.tableTree = this.$store.state.tree.data;
                this.tableData = this.$store.state.result.data
                this.page_total = this.$store.state.result.pages
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
            
            async loadData() {
                this.loading = true;
                try {
                await this.getJobs({
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
         
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
      },
   
   
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

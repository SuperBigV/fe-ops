(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c356e8da"],{"0b3a":function(t,e,a){"use strict";var n=a("592b"),i=a.n(n);i.a},"348a":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 模板实例管理")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-button",{attrs:{type:"primary",icon:"add"},on:{click:t.handlerInstanceAdd}},[t._v("创建模板实例")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:t.templateInstances,border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{label:"编号",prop:"id",width:"80",align:"center"}}),a("el-table-column",{attrs:{prop:"tag",label:"节点",width:"%60",align:"center"}}),a("el-table-column",{attrs:{prop:"template_name",label:"模板",width:"%20",align:"center"}}),a("el-table-column",{attrs:{label:"操作",width:"220",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("继承")]),a("el-button",{staticClass:"cadetblue",attrs:{type:"text",icon:"el-icon-menu"},on:{click:function(a){return t.handleInfo(e.$index,e.row)}}},[t._v("详情")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-count":t.page_total,"page-size":t.page_size,"current-page":t.cur_page},on:{"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"60%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"instance",attrs:{model:t.instance,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"节点"}},[a("el-input",{attrs:{placeholder:"节点"},model:{value:t.instance.tag,callback:function(e){t.$set(t.instance,"tag","string"===typeof e?e.trim():e)},expression:"instance.tag"}})],1),a("el-form-item",{attrs:{label:"模板"}},[a("el-input",{attrs:{placeholder:"模板",disabled:!0},model:{value:t.instance.template_name,callback:function(e){t.$set(t.instance,"template_name",e)},expression:"instance.template_name"}})],1),a("div",[a("el-table",{ref:"table",attrs:{data:t.tableData,"tooltip-effect":"dark",border:"",stripe:""}},[a("el-table-column",{attrs:{label:"系统名称",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.name)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"系统中文名",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.common)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"权限点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-checkbox-group",{model:{value:t.checkedList,callback:function(e){t.checkedList=e},expression:"checkedList"}},["cop.xiaochuan"==t.instance.tag?a("div",t._l(e.row.points,function(e){return a("el-checkbox",{key:e.id,attrs:{label:e.name}},[t._v(t._s(e.common))])}),1):a("div",t._l(e.row.points,function(e){return a("el-checkbox",{key:e.id,attrs:{label:e.name,disabled:!t.editableList.includes(e.name)}},[t._v(t._s(e.common))])}),1)])]}}])})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.infoVisible,width:"60%"},on:{"update:visible":function(e){t.infoVisible=e}}},[a("el-form",{ref:"info",attrs:{model:t.instance,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"节点"}},[a("el-input",{attrs:{placeholder:"节点",disabled:!0},model:{value:t.instance.tag,callback:function(e){t.$set(t.instance,"tag",e)},expression:"instance.tag"}})],1),a("el-form-item",{attrs:{label:"模板"}},[a("el-input",{attrs:{placeholder:"模板",disabled:!0},model:{value:t.instance.template_name,callback:function(e){t.$set(t.instance,"template_name",e)},expression:"instance.template_name"}})],1),a("div",[a("el-table",{ref:"table",attrs:{data:t.tableData,"tooltip-effect":"dark",border:"",stripe:""}},[a("el-table-column",{attrs:{label:"系统名称",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.name)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"系统中文名",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.common)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"权限点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-checkbox-group",{model:{value:t.checkedList,callback:function(e){t.checkedList=e},expression:"checkedList"}},t._l(e.row.points,function(e){return a("el-checkbox",{key:e.id,attrs:{label:e.name,disabled:!t.editableList.includes(e.name)}},[t._v(t._s(e.common))])}),1)]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"创建模板实例",visible:t.addVisible,width:"60%"},on:{"update:visible":function(e){t.addVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"节点"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择节点"},on:{change:t.getChangedNode},model:{value:t.n_value,callback:function(e){t.n_value=e},expression:"n_value"}},t._l(t.nodes,function(t){return a("el-option",{key:t.tag_id,attrs:{label:t.business,value:t}})}),1)],1),a("el-form-item",{attrs:{label:"模板"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择模板"},on:{change:t.getChangedTemplate},model:{value:t.t_value,callback:function(e){t.t_value=e},expression:"t_value"}},t._l(t.templates,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t}})}),1)],1),a("div",[a("el-table",{ref:"table",attrs:{data:t.tableData,"tooltip-effect":"dark",border:"",stripe:""}},[a("el-table-column",{attrs:{label:"系统名称",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.name)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"系统中文名",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(e.row.common)+"\n                        ")]}}])}),a("el-table-column",{attrs:{label:"权限点",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-checkbox-group",{model:{value:t.form.instance.points,callback:function(e){t.$set(t.form.instance,"points",e)},expression:"form.instance.points"}},t._l(e.row.points,function(e){return a("el-checkbox",{key:e.id,attrs:{label:e}},[t._v(t._s(e.common))])}),1)]}}])})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveAdd}},[t._v("确 定")])],1)],1)],1)},i=[],s=(a("7f7f"),a("96cf"),a("3b8d")),l=a("cebc"),o=a("2f62"),c=(a("1c46"),{name:"basetable",data:function(){return{checkedList:[],editableList:[],tableData:[],checkedPoints:[],cur_page:1,page_size:50,page_total:1,multipleSelection:[],del_list:[],is_search:!1,addVisible:!1,editVisible:!1,infoVisible:!1,delVisible:!1,nodes:[],templates:[],templateInstances:[],instance_points:{},ins:{tag:"",template_name:""},system:{id:0,name:"",common:"",developer:"",main:"",points:[]},instance:{id:0,tag_id:0,tag:"",template_id:0,template_name:""},form:{id:0,name:"",common:"",instance:{tag:"",tag_id:0,points:[]}},template_instances_inhert:{id:0,name:"",common:"",instance:{tag:"",tag_id:0,points:[]},tag:""},idx:-1,n_value:{},t_value:{}}},created:function(){this.getData()},computed:{},methods:Object(l["a"])({},Object(o["b"])(["getNodes","getTemplates","getSystems","createTempateInstance","getTempInstances","getNearestPoints","editTempateInstance"]),{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,this.getNodes();case 4:return t.next=6,this.getTemplates();case 6:return t.next=8,this.getSystems();case 8:return t.next=10,this.getTempInstances(this.cur_page,this.page_size);case 10:this.nodes=this.$store.state.nodes,this.templates=this.$store.state.templates.data,this.tableData=this.$store.state.systems.data,this.templateInstances=this.$store.state.template_instance.data;case 14:return t.prev=14,this.loading=!1,t.finish(14);case 17:case"end":return t.stop()}},t,this,[[1,,14,17]])}));function e(){return t.apply(this,arguments)}return e}(),getNearestPs:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,a,n,i,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.editableList=[],this.checkedList=[],t.next=4,this.getNearestPoints(this.ins);case 4:for(a in this.instance_points=this.$store.state.nearestPoints.data,e=this.$store.state.nearestPoints.checked,this.instance_points)for(n=this.instance_points[a],i=0;i<n.length;i++)this.editableList.push(n[i].name);for(a in e)for(s=e[a],i=0;i<s.length;i++)this.checkedList.push(s[i].name);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),search:function(){this.is_search=!0},formatter:function(t,e){return t.status},filterTag:function(t,e){return e.tag===t},handlerInstanceAdd:function(){this.n_value="",this.t_value="",this.addVisible=!0},handleInfo:function(t,e){var a=this.templateInstances[t];this.ins={tag:a.tag,template_name:a.template_name},this.getNearestPs(),this.instance={id:a.id,tag:a.tag,template_name:a.template_name},this.infoVisible=!0},handleEdit:function(t,e){this.idx=t;var a=this.templateInstances[t];this.ins={tag:a.tag,template_name:a.template_name},this.getNearestPs(),this.instance={id:a.id,tag_id:a.tag_id,tag:a.tag,template_id:a.template_id,template_name:a.template_name},this.editVisible=!0},handleDelete:function(t,e){this.idx=t,this.delVisible=!0},handleSelectionChange:function(t){this.multipleSelection=t},saveEdit:function(){var t=this.templateInstances[this.idx];console.log("item.tag:",t.tag),console.log("instance.tag:",this.instance.tag),t.tag===this.instance.tag&&(this.template_instances_inhert.instance["id"]=this.instance.id),this.template_instances_inhert.id=this.instance.template_id,this.template_instances_inhert.name=this.instance.template_name,this.template_instances_inhert.instance.tag_id=this.instance.tag_id,this.template_instances_inhert.instance.tag=this.instance.tag,this.template_instances_inhert.tag=this.instance.tag,console.log("checkList:",this.checkedList);for(var e=0;e<this.checkedList.length;e++)for(var a=0;a<this.tableData.length;a++)for(var n=0;n<this.tableData[a].points.length;n++)if(console.log(">>>>>>>>>>>",this.tableData[a].points[n].name),this.tableData[a].points[n].name===this.checkedList[e]){this.template_instances_inhert.instance.points.push(this.tableData[a].points[n]);break}console.log("commit list:",this.template_instances_inhert),this.editTempateInstance(this.template_instances_inhert),this.editVisible=!1},saveAdd:function(){console.log("start create instance"),this.createTempateInstance(this.form),this.addVisible=!1,this.getData()},getChangedNode:function(t){this.n_value=t.business,this.form.instance.tag=t.business,this.form.instance.tag_id=t.tag_id},getChangedTemplate:function(t){console.log("template:"+t),this.t_value=t.name,this.form.name=t.name,this.form.id=t.id,this.form.common=t.common}})}),r=c,d=(a("0b3a"),a("2877")),u=Object(d["a"])(r,n,i,!1,null,"c0eb76ea",null);e["default"]=u.exports},"592b":function(t,e,a){}}]);
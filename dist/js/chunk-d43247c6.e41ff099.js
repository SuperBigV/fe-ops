(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d43247c6"],{"7a89":function(t,i,s){t.exports=s.p+"img/img.718634f9.jpeg"},"7ed4":function(t,i,s){"use strict";var e=s("2b0e"),a=new e["default"];i["a"]=a},"8c93":function(t,i,s){var e;
/*!
 * sChart JavaScript Library v2.0.1
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
/*!
 * sChart JavaScript Library v2.0.1
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
(function(a,h){e=function(){return h(a)}.call(i,s,i,t),void 0===e||(t.exports=e)})(this,function(t){"use strict";function i(t,i,s,e){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.dpi=window.devicePixelRatio||1,this.type=i,this.data=s,this.dataLength=this.data.length,this.showValue=!0,this.autoWidth=!1,this.width=this.canvas.width*this.dpi,this.height=this.canvas.height*this.dpi,this.topPadding=50*this.dpi,this.leftPadding=50*this.dpi,this.rightPadding=0*this.dpi,this.bottomPadding=50*this.dpi,this.yEqual=5,this.yLength=0,this.xLength=0,this.yFictitious=0,this.yRatio=0,this.bgColor="#ffffff",this.fillColor="#1E9FFF",this.axisColor="#666666",this.contentColor="#eeeeee",this.titleColor="#000000",this.title="",this.titlePosition="top",this.radius=100*this.dpi,this.innerRadius=70*this.dpi,this.colorList=["#1E9FFF","#13CE66","#F7BA2A","#FF4949","#72f6ff","#199475","#e08031","#726dd1"],this.legendColor="#000000",this.legendTop=40*this.dpi,this.totalValue=this.getTotalValue(),this.init(e)}return i.prototype={init:function(t){if(0===this.dataLength)return!1;if(t){var i=["topPadding","leftPadding","rightPadding","bottomPadding","radius","innerRadius","legendTop"];for(var s in t)"colorList"===s&&Array.isArray(t[s])?this[s]=t[s].concat(this[s]):i.indexOf(s)>-1?this[s]=t[s]*this.dpi:this[s]=t[s]}t.autoWidth?(this.width=this.canvas.width=this.canvas.parentNode.offsetWidth*this.dpi,this.height=this.canvas.height=this.canvas.parentNode.offsetHeight*this.dpi,this.canvas.setAttribute("style","width:"+this.canvas.parentNode.offsetWidth+"px;height:"+this.canvas.parentNode.offsetHeight+"px;")):(this.canvas.setAttribute("style","width:"+this.canvas.width+"px;height:"+this.canvas.height+"px;"),this.canvas.width*=this.dpi,this.canvas.height*=this.dpi),"bar"===this.type||"line"===this.type?(this.yLength=Math.floor((this.height-this.topPadding-this.bottomPadding-10)/this.yEqual),this.xLength=Math.floor((this.width-this.leftPadding-this.rightPadding-10)/this.dataLength),this.yFictitious=this.getYFictitious(this.data),this.yRatio=this.yLength/this.yFictitious,this.drawBarUpdate()):this.drawPieUpdate()},drawBarUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawAxis(),this.drawPoint(),this.drawTitle(),this.drawBarChart()},drawPieUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawLegend(),this.drawTitle(),this.drawPieChart()},drawBarChart:function(){this.ctx.fillStyle=this.fillColor,this.ctx.strokeStyle=this.fillColor;for(var t=0;t<this.dataLength;t++)this.data[t].left=this.leftPadding+this.xLength*(t+.25),this.data[t].top=this.height-this.bottomPadding-this.data[t].value*this.yRatio,this.data[t].right=this.leftPadding+this.xLength*(t+.75),this.data[t].bottom=this.height-this.bottomPadding,"line"===this.type?(this.ctx.beginPath(),this.ctx.arc(this.data[t].left+this.xLength/4,this.data[t].top,2,0,2*Math.PI,!0),this.ctx.fill(),0!==t&&(this.ctx.moveTo(this.data[t].left+this.xLength/4,this.data[t].top),this.ctx.lineTo(this.data[t-1].left+this.xLength/4,this.data[t-1].top)),this.ctx.stroke()):"bar"===this.type&&this.ctx.fillRect(this.data[t].left,this.data[t].top,this.data[t].right-this.data[t].left,this.data[t].bottom-this.data[t].top),this.showValue&&(this.ctx.font=12*this.dpi+"px Arial",this.ctx.fillText(this.data[t].value,this.data[t].left+this.xLength/4,this.data[t].top-5))},drawPieChart:function(){for(var t=this.width/2,i=this.height/2,s=0,e=0,a=0;a<this.dataLength;a++)this.ctx.beginPath(),this.ctx.fillStyle=this.colorList[a],this.ctx.moveTo(t,i),this.data[a].start=0===a?-Math.PI/2:this.data[a-1].end,this.data[a].end=this.data[a].start+this.data[a].value/this.totalValue*2*Math.PI,this.ctx.arc(t,i,this.radius,this.data[a].start,this.data[a].end),this.ctx.closePath(),this.ctx.fill(),this.data[a].middle=(this.data[a].start+this.data[a].end)/2,s=Math.ceil(Math.abs(this.radius*Math.cos(this.data[a].middle))),e=Math.floor(Math.abs(this.radius*Math.sin(this.data[a].middle))),this.ctx.strokeStyle=this.colorList[a],this.showValue&&(this.data[a].middle<=0?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i-e),this.ctx.lineTo(t+s+10,i-e-10),this.ctx.moveTo(t+s+10,i-e-10),this.ctx.lineTo(t+s+this.radius/2,i-e-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i-e-5)):this.data[a].middle>0&&this.data[a].middle<=Math.PI/2?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i+e),this.ctx.lineTo(t+s+10,i+e+10),this.ctx.moveTo(t+s+10,i+e+10),this.ctx.lineTo(t+s+this.radius/2,i+e+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i+e+15)):this.data[a].middle>Math.PI/2&&this.data[a].middle<Math.PI?(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i+e),this.ctx.lineTo(t-s-10,i+e+10),this.ctx.moveTo(t-s-10,i+e+10),this.ctx.lineTo(t-s-this.radius/2,i+e+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i+e+15)):(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i-e),this.ctx.lineTo(t-s-10,i-e-10),this.ctx.moveTo(t-s-10,i-e-10),this.ctx.lineTo(t-s-this.radius/2,i-e-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i-e-5)));"ring"===this.type&&(this.ctx.beginPath(),this.ctx.fillStyle=this.bgColor,this.ctx.arc(t,i,this.innerRadius,0,2*Math.PI),this.ctx.fill())},drawAxis:function(){this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+.5,this.topPadding+.5),this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding+.5),this.ctx.stroke()},drawPoint:function(){this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="center",this.ctx.fillStyle=this.axisColor;for(var t=0;t<this.dataLength;t++){var i=this.data[t].name,s=this.xLength*(t+1);this.ctx.moveTo(this.leftPadding+s+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+s+.5,this.height-this.bottomPadding+5.5),this.ctx.fillText(i,this.leftPadding+s-this.xLength/2,this.height-this.bottomPadding+15*this.dpi)}this.ctx.stroke(),this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="right",this.ctx.fillStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding+.5),this.ctx.fillText(0,this.leftPadding-10,this.height-this.bottomPadding+5);for(t=0;t<this.yEqual;t++){var e=this.yFictitious*(t+1),a=this.yLength*(t+1);this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-a+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding-a+.5),this.ctx.stroke(),this.ctx.fillText(e,this.leftPadding-10,this.height-this.bottomPadding-a+5),this.ctx.beginPath(),this.ctx.strokeStyle=this.contentColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-a+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding-a+.5),this.ctx.stroke()}},drawTitle:function(){this.title&&(this.ctx.beginPath(),this.ctx.textAlign="center",this.ctx.fillStyle=this.titleColor,this.ctx.font=16*this.dpi+"px Microsoft YaHei","bottom"===this.titlePosition&&this.bottomPadding>=40?this.ctx.fillText(this.title,this.width/2,this.height-5):this.ctx.fillText(this.title,this.width/2,this.topPadding/2+5))},drawLegend:function(){for(var t=0;t<this.dataLength;t++)this.ctx.fillStyle=this.colorList[t],this.ctx.fillRect(10,this.legendTop+15*t*this.dpi,20,11),this.ctx.fillStyle=this.legendColor,this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="left",this.ctx.fillText(this.data[t].name,35,this.legendTop+10+15*t*this.dpi)},getYFictitious:function(t){var i=t.slice(0);i.sort(function(t,i){return-(t.value-i.value)});var s=Math.ceil(i[0].value/this.yEqual),e=s.toString().length-1;return e=e>2?2:e,Math.ceil(s/Math.pow(10,e))*Math.pow(10,e)},getTotalValue:function(){for(var t=0,i=0;i<this.dataLength;i++)t+=this.data[i].value;return t}},i})},a0b9:function(t,i,s){"use strict";var e=s("afd4"),a=s.n(e);a.a},afd4:function(t,i,s){},e2ad:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("el-card",{staticClass:"mgb20",staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"user-info"},[e("img",{staticClass:"user-avator",attrs:{click:t.info,src:s("7a89"),alt:""}}),e("div",{staticClass:"user-info-cont"},[e("div",{staticClass:"user-info-name"},[t._v(t._s(t.userinfo.username)+" "),e("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleEdit}},[t._v("编辑个人信息")])],1)])]),e("div",{staticClass:"user-info-list"},[t._v("上次登录时间："),e("span",[t._v(t._s(t.datetime))])])]),e("el-card",{staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("接入系统")])]),t._v("\n                ares\n                "),e("el-progress",{attrs:{percentage:71.3,color:"#42b983"}}),t._v("\n                themis\n                "),e("el-progress",{attrs:{percentage:24.1,color:"#f1e05a"}}),t._v("\n                user\n                "),e("el-progress",{attrs:{percentage:3.7}}),t._v("\n                jumpserver\n                "),e("el-progress",{attrs:{percentage:.9,color:"#f56c6c"}})],1)],1),e("el-col",{attrs:{span:16}},[e("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-1"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("20")]),e("div",[t._v("产品线数量")])])])])],1),e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-2"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("321")]),e("div",[t._v("用户数量")])])])])],1),e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-3"},[e("i",{staticClass:"el-icon-lx-goods grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("1500")]),e("div",[t._v("资产数量")])])])])],1)],1),e("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-1"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("38")]),e("div",[t._v("域名数量")])])])])],1),e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-2"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("321")]),e("div",[t._v("待过期域名数量")])])])])],1)],1),e("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-1"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("38")]),e("div",[t._v("证书数量")])])])])],1),e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-2"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("321")]),e("div",[t._v("待过期证书数量")])])])])],1)],1)],1)],1),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover"}},[e("schart",{ref:"bar",staticClass:"schart",attrs:{canvasId:"bar",data:t.data,type:"bar",options:t.options}})],1)],1),e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover"}},[e("schart",{ref:"line",staticClass:"schart",attrs:{canvasId:"line",data:t.data,type:"line",options:t.options2}})],1)],1)],1),e("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(i){t.editVisible=i}}},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"60px"}},[e("el-form-item",{attrs:{label:"用户名"}},[e("el-input",{attrs:{disabled:!0},model:{value:t.form.username,callback:function(i){t.$set(t.form,"username",i)},expression:"form.username"}})],1),e("el-form-item",{attrs:{label:"中文名"}},[e("el-input",{attrs:{disabled:!0},model:{value:t.form.name,callback:function(i){t.$set(t.form,"name",i)},expression:"form.name"}})],1),e("el-form-item",{attrs:{label:"密码"}},[e("el-input",{attrs:{"show-password":""},model:{value:t.form.password,callback:function(i){t.$set(t.form,"password",i)},expression:"form.password"}})],1),e("el-form-item",{attrs:{label:"邮箱"}},[e("el-input",{attrs:{disabled:!0},model:{value:t.form.mail,callback:function(i){t.$set(t.form,"mail",i)},expression:"form.mail"}})],1),e("el-form-item",{attrs:{label:"部门"}},[e("el-input",{model:{value:t.form.department,callback:function(i){t.$set(t.form,"department",i)},expression:"form.department"}})],1),e("el-form-item",{attrs:{label:"电话"}},[e("el-input",{model:{value:t.form.tel,callback:function(i){t.$set(t.form,"tel",i)},expression:"form.tel"}})],1),e("el-form-item",{attrs:{label:"公钥"}},[e("el-input",{attrs:{type:"textarea",rows:4},model:{value:t.form.public_key,callback:function(i){t.$set(t.form,"public_key",i)},expression:"form.public_key"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.editVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},a=[],h=(s("ac6a"),s("cebc")),o=(s("7f7f"),s("2f62")),n=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("canvas",{attrs:{id:t.canvasId}})])},l=[],d=s("8c93"),r=s.n(d),c={data:function(){return{schart:null,opt:{}}},props:{canvasId:{type:String,default:""},type:{type:String,default:"bar"},data:{type:Array,default:[]},options:{type:Object,required:!1}},mounted:function(){this.renderChart()},methods:{renderChart:function(){this.schart=null,this.opt=this.options,this.width&&this.height||(this.opt?this.opt["autoWidth"]=!0:this.opt={autoWidth:!0}),this.schart=new r.a(this.canvasId,this.type,this.data,this.opt)}},watch:{data:function(){this.renderChart()},options:function(){this.renderChart()},type:function(){this.renderChart()}}},g=c,f=s("2877"),u=Object(f["a"])(g,n,l,!1,null,null,null),p=u.exports,x=s("7ed4"),m={name:"dashboard",data:function(){return{form:{id:0,username:"",name:"",mail:"",password:"",tel:"",department:"",public_key:""},editVisible:!1,todoList:[{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要写100行代码加几个bug吧",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!0},{title:"今天要写100行代码加几个bug吧",status:!0}],data:[{name:"2018/09/04",value:1083},{name:"2018/09/05",value:941},{name:"2018/09/06",value:1139},{name:"2018/09/07",value:816},{name:"2018/09/08",value:327},{name:"2018/09/09",value:228},{name:"2018/09/10",value:1065}],options:{title:"最近七天每天的用户访问量",showValue:!1,fillColor:"rgb(45, 140, 240)",bottomPadding:30,topPadding:30},options2:{title:"最近七天用户访问趋势",fillColor:"#FC6FA1",axisColor:"#008ACD",contentColor:"#EEEEEE",bgColor:"#F5F8FD",bottomPadding:30,topPadding:30}}},components:{Schart:p},computed:{userinfo:function(){var t=this.$store.state.user;return t||this.name},datetime:function(){var t=new Date,i="-",s=t.getFullYear(),e=t.getMonth()+1,a=t.getDate();e>=1&&e<=9&&(e="0"+e),a>=0&&a<=9&&(a="0"+a);var h=s+i+e+i+a;return h}},created:function(){this.changeDate()},activated:function(){this.handleListener()},deactivated:function(){window.removeEventListener("resize",this.renderChart),x["a"].$off("collapse",this.handleBus)},methods:Object(h["a"])({},Object(o["b"])(["personalInfoUpdate","getUserName"]),{getData:function(){this.getUserName()},changeDate:function(){var t=(new Date).getTime();this.data.forEach(function(i,s){var e=new Date(t-864e5*(6-s));i.name="".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())})},handleListener:function(){x["a"].$on("collapse",this.handleBus),window.addEventListener("resize",this.renderChart)},handleBus:function(t){var i=this;setTimeout(function(){i.renderChart()},300)},renderChart:function(){this.$refs.bar.renderChart(),this.$refs.line.renderChart()},info:function(){console.log("click")},handleEdit:function(){this.form.id=this.userinfo.id,this.form.username=this.userinfo.username,this.form.name=this.userinfo.name,this.form.mail=this.userinfo.mail,this.form.tel=this.userinfo.tel,this.form.department=this.userinfo.department,this.editVisible=!0},saveEdit:function(){console.log("form:",this.form),this.personalInfoUpdate(this.form),this.editVisible=!1,this.getData()}})},v=m,b=(s("a0b9"),Object(f["a"])(v,e,a,!1,null,"0e873512",null));i["default"]=b.exports}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224530"],{e03b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"custom-pd"},[a("div",{staticClass:"item secondary"},[a("v-card-title",[a("v-icon",{staticClass:"mr-2",attrs:{color:"primary",large:""}},[t._v("mdi-account-circle-outline")]),t._v(" Đơn bán "),a("v-spacer"),a("v-btn",{staticClass:"ml-5 mb-7",on:{click:function(e){t.dialog=!0}}},[t._v("Xuất báo cáo")]),a("v-btn",{staticClass:"ml-5 mb-7 elevation-0",attrs:{color:"primary",small:"",fab:""},on:{click:t.refreshFilter}},[a("v-icon",[t._v(" mdi-refresh ")])],1),a("div",{staticClass:"w300 ml-5"},[a("v-select",{attrs:{items:t.state_list,"item-text":"status","item-value":"id",outlined:"",label:"Trạng thái",dense:""},model:{value:t.filter.status,callback:function(e){t.$set(t.filter,"status",e)},expression:"filter.status"}})],1),a("div",{staticClass:"w300 ml-5"},[a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Tìm mã đơn",outlined:"",dense:""},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchHandle.apply(null,arguments)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),a("v-data-table",{attrs:{headers:t.headers,items:t.data,"items-per-page":10,page:t.page,"server-items-length":t.totalItems,"footer-props":{"items-per-page-options":[10,10]}},on:{"update:page":function(e){t.page=e}},scopedSlots:t._u([{key:"item.created_at",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.created_at))+" ")]}},{key:"item.money",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatMoney(a.money))+" VND ")]}},{key:"item.amount",fn:function(e){var n=e.item;return[a("div",{staticClass:"uppercase"},[t._v(" "+t._s(n.amount)+" "+t._s(n.token)+" ")])]}},{key:"item.status",fn:function(e){var n=e.item;return[t.stateDetail(n.status)?a("p",{style:{color:""+t.stateDetail(n.status).color}},[t._v(" "+t._s(t.stateDetail(n.status).status)+" ")]):t._e()]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-btn",{staticClass:"info mr-2",attrs:{small:""},on:{click:function(e){return t.$router.push("/sell-order/"+n.code)}}},[t._v(" Chi tiết ")])]}}],null,!0)})],1),a("v-dialog",{attrs:{"max-width":"380px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",[t._v("Chọn thời gian xuất")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-divider"),a("div",{staticClass:"ma-6"},[a("v-date-picker",{attrs:{"full-width":"",locale:"vi-vn"},model:{value:t.export_date,callback:function(e){t.export_date=e},expression:"export_date"}})],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"default",on:{click:function(e){t.dialog=!1}}},[t._v(" Hủy ")]),a("v-btn",{attrs:{color:"primary"},on:{click:t.exportReport}},[t._v(" Xác nhận ")]),a("v-spacer")],1)],1)],1)],1)},o=[],r=a("3835"),l=a("b85c"),s=a("5530"),i=(a("4de4"),a("a15b"),a("caad"),a("2532"),a("99af"),a("ac1f"),a("841c"),a("5319"),a("d3b7"),a("25f0"),a("b680"),a("159b"),a("ddb0"),a("2f62")),c={data:function(){return{search:"",dialog:!1,menu1:!1,headers:[{text:"Mã đơn",value:"code"},{text:"SĐT",value:"phone"},{text:"Số lượng",value:"amount"},{text:"Thành tiền",value:"money"},{text:"Trạng thái",value:"status"},{text:"Thời gian",value:"created_at"},{text:"Thao tác",value:"actions",sortable:!1}],data:[],edit_id:"",content:"",chat_id:"",page:0,totalItems:0,state_list:[],filter:{status:"",dates:[]},excel_htmls:"",export_date:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10)}},computed:Object(s["a"])(Object(s["a"])({},Object(i["b"])(["account","sell_page"])),{},{dateRangeText:function(){return this.filter.dates[0]?this.filter.dates.join(" ~ "):""}}),mounted:function(){var t=this;this.account&&!this.account.rules.includes("all")&&this.$router.push("/"),this.page=this.sell_page,this.CallAPI("get","manage/state",{},(function(e){t.state_list=e.data})),this.getDataExport()},methods:{refreshFilter:function(){this.filter.status="",this.filter.dates=[]},stateDetail:function(t){if(!this.state_list)return"";var e=this.state_list.filter((function(e){return e.id==t}));return e[0]},getData:function(){var t=this,e="manage/sell-order?page=".concat(this.page);this.filter.status&&(e+="&status=".concat(this.filter.status)),this.filter.dates[1]&&(e+="&from=".concat(this.filter.dates[0],"&to=").concat(this.filter.dates[1])),this.CallAPI("get",e,{},(function(e){t.data=e.data.data,t.totalItems=e.data.total}))},searchHandle:function(){var t=this;this.CallAPI("get","manage/search/sell-order?query="+this.search,{},(function(e){t.data=e.data}))},formatDate:function(t){var e=new Date(t);return e.toLocaleString()},formatMoney:function(t){return t?String(parseFloat(t).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):0},totalAmount:function(t,e){var a=t.filter((function(t){return t.token==e})),n=0,o=0;return a.forEach((function(t){n+=t.amount,o+=t.rate*t.amount})),{total:n,average:o/n}},getDataExport:function(){var t=this,e=(new Date,"manage/sell-order?page=1&perPage=999&status=1&from=".concat(this.export_date,"&to=").concat(this.export_date));this.CallAPI("get",e,{},(function(e){t.excel_htmls='\n            <tr>\n              <td colspan="9" style="text-align: center"><b>BÁO CÁO ĐƠN BÁN</b></td>\n            </tr>\n            <tr>\n                <th style="width: 60px">STT</th>\n                <th style="width: 80px">Mã đơn</th>\n                <th style="width: 100px">Số điện thoại</th>\n                <th style="width: 150px">Thời gian</th>\n                <th style="width: 80px">Phí blockchain</th>\n                <th style="width: 80px">Tiền phí</th>\n                <th style="width: 150px">Số lượng bán</th>\n                <th style="width: 100px">Tỷ giá</th>\n                <th style="width: 150px">Số tiền</th>\n            </tr>\n        ';var a,n=0,o=0,s=0,i=Object(l["a"])(e.data.data.entries());try{for(i.s();!(a=i.n()).done;){var c=Object(r["a"])(a.value,2),d=c[0],u=c[1];t.excel_htmls+='\n                <tr>\n                    <td style="text-align: center">'.concat(d+1,"</td>\n                    <td>").concat(u.code,'</td>\n                    <td style="text-align: center">').concat(u.phone?u.phone:"Không có","</td>\n                    <td>").concat(t.formatDate(u.created_at),"</td>\n                    <td>").concat(u.blockchain_fee,"</td>\n                    <td>").concat(t.formatMoney(u.fee),'</td>\n                    <td class="uppercase" style="text-align: center">').concat(u.amount," ").concat(u.token,"</td>\n                    <td>").concat(t.formatMoney(u.rate),"</td>\n                    <td>").concat(t.formatMoney(u.money),"</td>\n                </tr>\n            "),n+=u.money,o+=u.fee,s+=u.blockchain_fee}}catch(h){i.e(h)}finally{i.f()}t.excel_htmls+='\n          <tr style="color: green">\n            <td colspan="4" rowspan="5" style="text-align: center; vertical-align: middle;"><b>Tổng/Tỷ giá trung bình</b></td>\n            <td rowspan="5" style="text-align: center; vertical-align: middle; color: red"><b>'.concat(t.formatMoney(s*t.totalAmount(e.data.data,"usdt").average),'</b></td>\n            <td rowspan="5" style="text-align: center; vertical-align: middle;"><b>').concat(t.formatMoney(o),'</b></td>\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"usdt").total," USDT</b></td>\n            <td><b>").concat(t.formatMoney(t.totalAmount(e.data.data,"usdt").average),'</b></td>\n            <td rowspan="5" style="text-align: center; vertical-align: middle;"><b>').concat(t.formatMoney(n),'</b></td>\n          </tr>\n          <tr style="color: green">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"btc").total," BTC</b></td>\n            <td><b>").concat(t.formatMoney(t.totalAmount(e.data.data,"btc").average),'</b></td>\n          </tr>\n          <tr style="color: green">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"eth").total," ETH</b></td>\n            <td><b>").concat(t.formatMoney(t.totalAmount(e.data.data,"eth").average),'</b></td>\n          </tr>\n          <tr style="color: green">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"busd").total," BUSD</b></td>\n            <td><b>").concat(t.formatMoney(t.totalAmount(e.data.data,"busd").average),'</b></td>\n          </tr>\n          <tr style="color: green">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"bnb").total," BNB</b></td>\n            <td><b>").concat(t.formatMoney(t.totalAmount(e.data.data,"bnb").average),'</b></td>\n          </tr>\n          <tr>\n            <td colspan="4" style="text-align: center; vertical-align: middle; color: green"><b>Tiền lãi</b></td>\n            <td><b>Đơn bán</b></td>\n            <td style="text-align: center; vertical-align: middle; color: green"><b>').concat(t.formatMoney(o-s*t.totalAmount(e.data.data,"usdt").average),'</b></td>\n            <td colspan="3" style="text-align: center; vertical-align: middle; color: green"></td>\n          </tr>\n        ')}))},exportReport:function(){var t="data:application/vnd.ms-excel;base64,",e='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table border>{table}</table></body></html>',a=function(t){return window.btoa(unescape(encodeURIComponent(t)))},n=function(t,e){return t.replace(/{(\w+)}/g,(function(t,a){return e[a]}))},o={worksheet:"Worksheet",table:this.excel_htmls},r=document.createElement("a");r.download="Báo cáo đơn khách hàng bán ngày ".concat(this.export_date,".xls"),r.href=t+a(n(e,o)),r.click()}},watch:{page:function(){this.getData(),this.$store.dispatch("setSellPage",this.page)},search:function(){this.search||this.getData()},"filter.status":function(){this.getData()},"filter.dates":function(){!this.filter.dates[1]&&this.filter.dates[0]||this.getData()},export_date:function(){this.getDataExport()}}},d=c,u=a("2877"),h=a("6544"),m=a.n(h),f=a("8336"),g=a("b0af"),p=a("99d9"),b=a("8fea"),v=a("2e4b"),x=a("169a"),y=a("ce7e"),_=a("132d"),k=a("b974"),w=a("2fa4"),D=a("8654"),C=Object(u["a"])(d,n,o,!1,null,null,null);e["default"]=C.exports;m()(C,{VBtn:f["a"],VCard:g["a"],VCardActions:p["a"],VCardTitle:p["c"],VDataTable:b["a"],VDatePicker:v["a"],VDialog:x["a"],VDivider:y["a"],VIcon:_["a"],VSelect:k["a"],VSpacer:w["a"],VTextField:D["a"]})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e887c"],{"8a52":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"custom-pd"},[a("div",{staticClass:"item secondary"},[a("v-card-title",[a("v-icon",{staticClass:"mr-2",attrs:{color:"primary",large:""}},[t._v("mdi-account-circle-outline")]),t._v(" Đơn bán "),a("v-spacer"),a("v-btn",{staticClass:"ml-5 mb-7",on:{click:t.exportReport}},[t._v("Xuất doanh số")]),a("v-btn",{staticClass:"ml-5 mb-7 elevation-0",attrs:{color:"primary",small:"",fab:""},on:{click:t.refreshFilter}},[a("v-icon",[t._v(" mdi-refresh ")])],1),a("div",{staticClass:"w300 ml-5"},[a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:"Thời gian",readonly:"",outlined:"",dense:""},model:{value:t.dateRangeText,callback:function(e){t.dateRangeText=e},expression:"dateRangeText"}},"v-text-field",o,!1),n))]}}]),model:{value:t.menu1,callback:function(e){t.menu1=e},expression:"menu1"}},[a("v-date-picker",{attrs:{range:""},on:{input:function(e){t.menu1=!1}},model:{value:t.filter.dates,callback:function(e){t.$set(t.filter,"dates",e)},expression:"filter.dates"}})],1)],1)],1),a("v-data-table",{attrs:{headers:t.headers,items:t.data,"items-per-page":10,page:t.page,"server-items-length":t.totalItems,"footer-props":{"items-per-page-options":[10,10]}},on:{"update:page":function(e){t.page=e}},scopedSlots:t._u([{key:"item.created_at",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.created_at))+" ")]}},{key:"item.money",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatMoney(a.money))+" VND ")]}},{key:"item.amount",fn:function(e){var n=e.item;return[a("div",{staticClass:"uppercase"},[t._v(" "+t._s(n.amount)+" "+t._s(n.token)+" ")])]}},{key:"item.type",fn:function(e){var n=e.item;return[n.txhash?a("span",{staticClass:"main-color"},[t._v("Đơn mua")]):a("span",{staticClass:"error-color"},[t._v("Đơn bán")])]}},{key:"item.status",fn:function(e){var n=e.item;return[t.stateDetail(n.status)?a("p",{style:{color:""+t.stateDetail(n.status).color}},[t._v(" "+t._s(t.stateDetail(n.status).status)+" ")]):t._e()]}}],null,!0)})],1)])},o=[],r=a("3835"),s=a("b85c"),c=a("5530"),i=(a("4de4"),a("a15b"),a("caad"),a("2532"),a("99af"),a("ac1f"),a("841c"),a("5319"),a("d3b7"),a("25f0"),a("b680"),a("159b"),a("1276"),a("ddb0"),a("2f62")),l={data:function(){return{search:"",dialog:!1,menu1:!1,headers:[{text:"Mã đơn",value:"code"},{text:"Loại đơn",value:"type"},{text:"SĐT",value:"phone"},{text:"Số lượng",value:"amount"},{text:"Số tiền",value:"money"},{text:"Trạng thái",value:"status"},{text:"Thời gian",value:"created_at"}],data:[],edit_id:"",content:"",chat_id:"",page:1,totalItems:0,state_list:[],filter:{dates:[]},excel_htmls:""}},computed:Object(c["a"])(Object(c["a"])({},Object(i["b"])(["account"])),{},{dateRangeText:function(){return this.filter.dates[0]?this.filter.dates.join(" ~ "):""}}),mounted:function(){var t=this;this.account&&!this.account.rules.includes("all")&&this.$router.push("/"),this.CallAPI("get","manage/state",{},(function(e){t.state_list=e.data})),this.getData(),this.getDataExport()},methods:{refreshFilter:function(){this.filter.dates=[]},stateDetail:function(t){if(!this.state_list)return"";var e=this.state_list.filter((function(e){return e.id==t}));return e[0]},getData:function(){var t=this,e="manage/ref-order?phone=".concat(this.$route.params.id,"&page=").concat(this.page);this.filter.dates[1]&&(e+="&from=".concat(this.filter.dates[0],"&to=").concat(this.filter.dates[1])),this.data=[],this.CallAPI("get",e,{},(function(e){for(var a in t.totalItems=e.data.total,e.data.data)t.data.push({code:e.data.data[a].code,phone:e.data.data[a].phone,amount:e.data.data[a].amount,money:e.data.data[a].money,token:e.data.data[a].token,status:e.data.data[a].status,created_at:e.data.data[a].created_at,txhash:e.data.data[a].txhash?e.data.data[a].txhash:0})}))},searchHandle:function(){var t=this;this.CallAPI("get","manage/search/sell-order?query="+this.search,{},(function(e){t.data=e.data}))},formatDate:function(t){var e=new Date(t);return e.toLocaleString()},formatMoney:function(t){return t?String(parseFloat(t).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):0},totalAmount:function(t,e){var a=t.filter((function(t){return t.token==e})),n=0,o=0;return a.forEach((function(t){n+=t.amount,o+=t.rate*t.amount})),{total:n,average:this.formatMoney(o/n)}},getDataExport:function(){var t=this,e=new Date,a=new Date(e.getFullYear(),e.getMonth(),1);a=a.toLocaleDateString().split("/").reverse().join("-");var n=new Date(e.getFullYear(),e.getMonth()+1,0);n=n.toLocaleDateString().split("/").reverse().join("-");var o="manage/ref-order?phone=".concat(this.$route.params.id,"&page=1&perPage=999&from=").concat(a,"&to=").concat(n);this.CallAPI("get",o,{},(function(e){t.excel_htmls='\n            <tr>\n              <td colspan="9" style="text-align: center"><b>BÁO CÁO DOANH SỐ CỦA '.concat(t.$route.params.id,'</b></td>\n            </tr>\n            <tr>\n                <th style="width: 60px">STT</th>\n                <th style="width: 80px">Mã đơn</th>\n                <th style="width: 80px">Loại đơn</th>\n                <th style="width: 100px">Số điện thoại</th>\n                <th style="width: 120px">Thời gian</th>\n                <th style="width: 80px">Tiền phí</th>\n                <th style="width: 150px">Số lượng</th>\n                <th style="width: 100px">Tỷ giá</th>\n                <th style="width: 150px">Số tiền</th>\n            </tr>\n        ');var a,n=Object(s["a"])(e.data.data.entries());try{for(n.s();!(a=n.n()).done;){var o=Object(r["a"])(a.value,2),c=o[0],i=o[1];t.excel_htmls+='\n                <tr>\n                    <td style="text-align: center">'.concat(c+1,"</td>\n                    <td>").concat(i.code,'</td>\n                    <td style="text-align: center">').concat(i.txhash?"Đơn mua":"Đơn bán",'</td>\n                    <td style="text-align: center">').concat(i.phone,"</td>\n                    <td>").concat(t.formatDate(i.created_at),"</td>\n                    <td>").concat(t.formatMoney(i.fee),'</td>\n                    <td class="uppercase" style="text-align: center">').concat(i.amount," ").concat(i.token,"</td>\n                    <td>").concat(t.formatMoney(i.rate),"</td>\n                    <td>").concat(t.formatMoney(i.money),"</td>\n                </tr>\n            "),i.money,i.fee}}catch(l){n.e(l)}finally{n.f()}t.excel_htmls+='\n          <tr style="color: red">\n            <td colspan="6" rowspan="5" style="text-align: center; vertical-align: middle;"><b>Tổng doanh số</b></td>\n            <td style="text-align: center"><b>'.concat(t.totalAmount(e.data.data,"usdt").total,' USDT</b></td>\n          </tr>\n          <tr style="color: red">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"btc").total,' BTC</b></td>\n          </tr>\n          <tr style="color: red">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"eth").total,' ETH</b></td>\n          </tr>\n          <tr style="color: red">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"busd").total,' BUSD</b></td>\n          </tr>\n          <tr style="color: red">\n            <td style="text-align: center"><b>').concat(t.totalAmount(e.data.data,"bnb").total," BNB</b></td>\n          </tr>\n        ")}))},exportReport:function(){var t="data:application/vnd.ms-excel;base64,",e='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table border>{table}</table></body></html>',a=function(t){return window.btoa(unescape(encodeURIComponent(t)))},n=function(t,e){return t.replace(/{(\w+)}/g,(function(t,a){return e[a]}))},o={worksheet:"Worksheet",table:this.excel_htmls},r=document.createElement("a");r.download="Báo cáo doanh số của ".concat(this.$route.params.id,".xls"),r.href=t+a(n(e,o)),r.click()}},watch:{page:function(){this.getData()},search:function(){this.search||this.getData()},"filter.dates":function(){!this.filter.dates[1]&&this.filter.dates[0]||this.getData()}}},d=l,u=a("2877"),h=a("6544"),m=a.n(h),f=a("8336"),p=a("99d9"),x=a("8fea"),g=a("2e4b"),v=a("132d"),b=a("e449"),y=a("2fa4"),_=a("8654"),k=Object(u["a"])(d,n,o,!1,null,null,null);e["default"]=k.exports;m()(k,{VBtn:f["a"],VCardTitle:p["c"],VDataTable:x["a"],VDatePicker:g["a"],VIcon:v["a"],VMenu:b["a"],VSpacer:y["a"],VTextField:_["a"]})}}]);
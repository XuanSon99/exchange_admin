(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224530"],{e03b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"custom-pd"},[a("div",{staticClass:"item secondary"},[a("v-card-title",[a("v-icon",{staticClass:"mr-2",attrs:{color:"primary",large:""}},[t._v("mdi-account-circle-outline")]),t._v(" Đơn bán "),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchHandle.apply(null,arguments)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{attrs:{headers:t.headers,items:t.data,"items-per-page":10,page:t.page,"server-items-length":t.totalItems,"footer-props":{"items-per-page-options":[10,10]}},on:{"update:page":function(e){t.page=e}},scopedSlots:t._u([{key:"item.created_at",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.created_at))+" ")]}},{key:"item.money",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatMoney(a.money))+" VND ")]}},{key:"item.amount",fn:function(e){var n=e.item;return[a("div",{staticClass:"uppercase"},[t._v(" "+t._s(n.amount)+" "+t._s(n.token)+" ")])]}},{key:"item.status",fn:function(e){var n=e.item;return[t.stateDetail(n.status)?a("p",{style:{color:""+t.stateDetail(n.status).color}},[t._v(" "+t._s(t.stateDetail(n.status).status)+" ")]):t._e()]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-btn",{staticClass:"info mr-2",attrs:{small:""},on:{click:function(e){return t.$router.push("/sell-order/"+n.code)}}},[t._v(" Chi tiết ")])]}}],null,!0)})],1)])},s=[],i=a("5530"),r=(a("caad"),a("2532"),a("4de4"),a("ac1f"),a("841c"),a("5319"),a("d3b7"),a("25f0"),a("b680"),a("2f62")),o={data:function(){return{search:"",dialog:!1,headers:[{text:"Mã đơn",value:"code"},{text:"SĐT",value:"phone"},{text:"Số lượng",value:"amount"},{text:"Thành tiền",value:"money"},{text:"Trạng thái",value:"status"},{text:"Thời gian",value:"created_at"},{text:"Thao tác",value:"actions",sortable:!1}],data:[],edit_id:"",content:"",chat_id:"",page:0,totalItems:0,state_list:[]}},computed:Object(i["a"])({},Object(r["b"])(["account","sell_page"])),mounted:function(){var t=this;this.account&&!this.account.rules.includes("all")&&this.$router.push("/"),this.page=this.sell_page,this.CallAPI("get","manage/state",{},(function(e){t.state_list=e.data}))},methods:{stateDetail:function(t){if(!this.state_list)return"";var e=this.state_list.filter((function(e){return e.id==t}));return e[0]},getData:function(){var t=this;this.CallAPI("get","manage/sell-order?page="+this.page,{},(function(e){t.data=e.data.data,t.totalItems=e.data.total}))},searchHandle:function(){var t=this;this.CallAPI("get","manage/search/sell-order?query="+this.search,{},(function(e){t.data=e.data}))},formatDate:function(t){var e=new Date(t);return e.toLocaleString()},formatMoney:function(t){return t?String(parseFloat(t).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):0}},watch:{page:function(){this.getData(),this.$store.dispatch("setSellPage",this.page)},search:function(){this.search||this.getData()}}},c=o,l=a("2877"),u=a("6544"),d=a.n(u),h=a("8336"),f=a("99d9"),p=a("8fea"),m=a("132d"),v=a("2fa4"),g=a("8654"),_=Object(l["a"])(c,n,s,!1,null,null,null);e["default"]=_.exports;d()(_,{VBtn:h["a"],VCardTitle:f["c"],VDataTable:p["a"],VIcon:m["a"],VSpacer:v["a"],VTextField:g["a"]})}}]);
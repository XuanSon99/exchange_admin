(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b17e6244"],{"1f4f":function(t,a,e){"use strict";var i=e("5530"),s=(e("a9e3"),e("8b37"),e("80d2")),n=e("7560"),o=e("58df");a["a"]=Object(o["a"])(n["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(i["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(s["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"2ff2":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",{staticClass:"detail-info"},[e("div",{staticClass:"item secondary"},[e("v-simple-table",{attrs:{border:""},scopedSlots:t._u([{key:"default",fn:function(){return[e("tbody",[e("tr",[e("td",[t._v("Số điện thoại")]),e("td",[t._v(t._s(t.data.phone))])]),e("tr",[e("td",[t._v("Người giới thiệu")]),t.data.referral?e("td",[t._v(t._s(t.data.referral))]):e("td",[t._v("Không có")])]),e("tr",[e("td",[t._v("Họ tên")]),e("td",[t._v(t._s(t.data.name))])]),e("tr",[e("td",[t._v("Địa chỉ")]),e("td",[t._v(t._s(t.data.address))])]),e("tr",[e("td",[t._v("Ngày sinh")]),e("td",[t._v(t._s(t.data.birthday))])]),e("tr",[e("td",[t._v("Địa chỉ IP")]),e("td",[t._v(t._s(t.data.ip))])]),e("tr",[e("td",[t._v("Ảnh CCCD")]),e("td",[e("div",{staticClass:"d-flex"},[e("expandable-image",{staticClass:"mr-2",attrs:{src:t.image(t.data.front_photo)}}),e("expandable-image",{staticClass:"mr-2",attrs:{src:t.image(t.data.back_photo)}}),t.data.portrait_video?e("video",{staticClass:"video-preview",attrs:{controls:""}},[e("source",{attrs:{src:"https://exchange.chootc.com/storage"+t.data.portrait_video}})]):t._e()],1)])]),e("tr",[e("td",[t._v("Tình trạng KYC")]),e("td",["pending"==t.data.verify?e("v-btn",{attrs:{small:"",color:"orange",outlined:""}},[t._v(" Đang chờ ")]):t._e(),"success"==t.data.verify?e("v-btn",{attrs:{small:"",color:"primary",outlined:""}},[t._v(" Đã duyệt ")]):t._e(),t.data.verify?t._e():e("v-btn",{attrs:{small:"",color:"red",outlined:""}},[t._v(" Chưa KYC ")])],1)])])]},proxy:!0}])}),e("v-btn",{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.confirmKYC}},[t._v(" Xác nhận KYC ")]),e("v-btn",{staticClass:"ml-3 mt-5",attrs:{color:"error"},on:{click:function(a){t.dialog=!0}}},[t._v(" Xóa KYC ")])],1),e("v-dialog",{attrs:{"max-width":"450px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-card-title",[e("span",[t._v("Thông báo lý do KYC bị từ chối")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("div",{staticClass:"mx-6 mt-6"},[e("v-text-field",{attrs:{outlined:"",clearable:""},model:{value:t.reason,callback:function(a){t.reason=a},expression:"reason"}})],1),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"default",on:{click:function(a){t.dialog=!1}}},[t._v(" Hủy ")]),e("v-btn",{attrs:{color:"primary"},on:{click:t.deleteKYC}},[t._v(" Xác nhận ")]),e("v-spacer")],1)],1)],1)],1)},s=[],n={data:function(){return{dialog:!1,data:"",content:"",reason:""}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.CallAPI("get","manage/user-info/"+this.$route.params.id,{},(function(a){t.data=a.data}))},confirmKYC:function(){var t=this;this.CallAPI("put","manage/client/"+this.data.phone,{},(function(a){t.getData(),t.sendNotifi("#01c77d","Yêu cầu xác minh danh tính của bạn đã thành công.","/profile"),t.$toast.success("Duyệt KYC thành công")}))},deleteKYC:function(){var t=this;this.CallAPI("delete","manage/verify/"+this.data.phone,{},(function(a){t.sendNotifi("#ff5252","Xác minh danh tính không thành công. ".concat(t.reason,". Vui lòng xác minh lại!"),"/kyc/".concat(t.data.phone)),t.$router.push("/user")}))},sendNotifi:function(t,a,e){this.CallAPI("post","manage/notification",{phone:this.data.phone,color:t,content:a,url:e})}}},o=n,r=e("2877"),d=e("6544"),c=e.n(d),l=e("8336"),h=e("b0af"),v=e("99d9"),u=e("169a"),f=e("ce7e"),p=e("132d"),m=e("1f4f"),g=e("2fa4"),b=e("8654"),_=Object(r["a"])(o,i,s,!1,null,null,null);a["default"]=_.exports;c()(_,{VBtn:l["a"],VCard:h["a"],VCardActions:v["a"],VCardTitle:v["c"],VDialog:u["a"],VDivider:f["a"],VIcon:p["a"],VSimpleTable:m["a"],VSpacer:g["a"],VTextField:b["a"]})},"8b37":function(t,a,e){}}]);
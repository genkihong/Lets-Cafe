(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6b90"],{7485:function(e,a,s){"use strict";s.r(a);var t=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"container"},[e._m(0),s("div",{staticClass:"row justify-content-center text-lighter my-3"},[s("form",{staticClass:"col-md-8",on:{submit:function(a){return a.preventDefault(),e.createOrder(a)}}},[s("h3",{staticClass:"text-center p-3"},[e._v("訂購人資訊")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"username"}},[e._v("*收件人姓名")]),s("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.form.user.name,expression:"form.user.name"}],staticClass:"form-control",class:{"is-invalid":e.errors.has("name")},attrs:{type:"text",name:"name",id:"username",placeholder:"輸入姓名"},domProps:{value:e.form.user.name},on:{input:function(a){a.target.composing||e.$set(e.form.user,"name",a.target.value)}}}),e.errors.has("name")?s("small",{staticClass:"text-danger"},[e._v("請輸入姓名 !")]):e._e()])]),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"usertel"}},[e._v("*收件人電話")]),s("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|numeric",expression:"'required|numeric'"},{name:"model",rawName:"v-model",value:e.form.user.tel,expression:"form.user.tel"}],staticClass:"form-control",class:{"is-invalid":e.errors.has("Phone")},attrs:{type:"tel",name:"Phone",id:"usertel",placeholder:"請輸入電話"},domProps:{value:e.form.user.tel},on:{input:function(a){a.target.composing||e.$set(e.form.user,"tel",a.target.value)}}}),e.errors.has("Phone")?s("small",{staticClass:"text-danger"},[e._v("請輸入電話 !")]):e._e()])])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"useremail"}},[e._v("*Email")]),s("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"},{name:"model",rawName:"v-model",value:e.form.user.email,expression:"form.user.email"}],staticClass:"form-control",class:{"is-invalid":e.errors.has("email")},attrs:{type:"email",name:"email",id:"useremail",placeholder:"請輸入 Email"},domProps:{value:e.form.user.email},on:{input:function(a){a.target.composing||e.$set(e.form.user,"email",a.target.value)}}}),e.errors.has("email")?s("small",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("email")))]):e._e()]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"useraddress"}},[e._v("*收件人地址")]),s("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:e.form.user.address,expression:"form.user.address"}],staticClass:"form-control",class:{"is-invalid":e.errors.has("address")},attrs:{type:"address",name:"address",id:"useraddress",placeholder:"請輸入地址"},domProps:{value:e.form.user.address},on:{input:function(a){a.target.composing||e.$set(e.form.user,"address",a.target.value)}}}),e.errors.has("address")?s("small",{staticClass:"text-danger"},[e._v("請輸入地址 !")]):e._e()]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"usermessage"}},[e._v("留言")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{name:"message",id:"usermessage",cols:"30",rows:"10"},domProps:{value:e.form.message},on:{input:function(a){a.target.composing||e.$set(e.form,"message",a.target.value)}}})]),e._m(1)])])])},r=[function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("section",{staticClass:"form-row text-center"},[s("div",{staticClass:"col-12 col-sm"},[s("div",{staticClass:"alert alert-success alert-rounded",attrs:{role:"alert"}},[e._v("\n        1.輸入訂單資料\n      ")])]),s("div",{staticClass:"col-12 col-sm"},[s("div",{staticClass:"alert alert-main alert-rounded",attrs:{role:"alert"}},[e._v("\n        2.金流付款\n      ")])]),s("div",{staticClass:"col-12 col-sm"},[s("div",{staticClass:"alert alert-main alert-rounded",attrs:{role:"alert"}},[e._v("\n        3.付款完成\n      ")])])])},function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("button",{staticClass:"btn btn-lighter btn-block btn-lg card-btn my-3"},[s("i",{staticClass:"far fa-address-card fa-lg mr-3"}),e._v("送出訂單\n      ")])}],o={data:function(){return{form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{createOrder:function(){var e=this,a=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("charles","/order"),t=a.form;a.$store.dispatch("updateLoading",!0,{root:!0}),this.$validator.validate().then(function(r){r?e.$http.post(s,{data:t}).then(function(e){console.log("訂單已建立",e),e.data.success&&(a.$bus.$emit("update-cart"),a.$router.push("/checkout/".concat(e.data.orderId))),a.$store.dispatch("updateLoading",!1,{root:!0})}):(a.$store.dispatch("updateLoading",!1,{root:!0}),console.log("欄位不完整"))})}}},l=o,i=s("2877"),n=Object(i["a"])(l,t,r,!1,null,null,null);a["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0d6b90.e99eaba5.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-068afadb"],{"014b":function(t,e,a){"use strict";var r=a("e53d"),n=a("07e3"),s=a("8e60"),i=a("63b6"),c=a("9138"),o=a("ebfd").KEY,l=a("294c"),u=a("dbdb"),f=a("45f2"),d=a("62a0"),b=a("5168"),v=a("ccb9"),p=a("6718"),m=a("47ee"),h=a("9003"),g=a("e4ae"),y=a("f772"),C=a("36c3"),_=a("1bc3"),O=a("aebd"),w=a("a159"),x=a("0395"),j=a("bf0b"),S=a("d9f6"),k=a("c3a1"),E=j.f,P=S.f,N=x.f,$=r.Symbol,L=r.JSON,F=L&&L.stringify,I="prototype",A=b("_hidden"),J=b("toPrimitive"),D={}.propertyIsEnumerable,M=u("symbol-registry"),T=u("symbols"),U=u("op-symbols"),R=Object[I],W="function"==typeof $,q=r.QObject,G=!q||!q[I]||!q[I].findChild,H=s&&l(function(){return 7!=w(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a})?function(t,e,a){var r=E(R,e);r&&delete R[e],P(t,e,a),r&&t!==R&&P(R,e,r)}:P,K=function(t){var e=T[t]=w($[I]);return e._k=t,e},Q=W&&"symbol"==typeof $.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof $},Y=function(t,e,a){return t===R&&Y(U,e,a),g(t),e=_(e,!0),g(a),n(T,e)?(a.enumerable?(n(t,A)&&t[A][e]&&(t[A][e]=!1),a=w(a,{enumerable:O(0,!1)})):(n(t,A)||P(t,A,O(1,{})),t[A][e]=!0),H(t,e,a)):P(t,e,a)},z=function(t,e){g(t);var a,r=m(e=C(e)),n=0,s=r.length;while(s>n)Y(t,a=r[n++],e[a]);return t},B=function(t,e){return void 0===e?w(t):z(w(t),e)},V=function(t){var e=D.call(this,t=_(t,!0));return!(this===R&&n(T,t)&&!n(U,t))&&(!(e||!n(this,t)||!n(T,t)||n(this,A)&&this[A][t])||e)},X=function(t,e){if(t=C(t),e=_(e,!0),t!==R||!n(T,e)||n(U,e)){var a=E(t,e);return!a||!n(T,e)||n(t,A)&&t[A][e]||(a.enumerable=!0),a}},Z=function(t){var e,a=N(C(t)),r=[],s=0;while(a.length>s)n(T,e=a[s++])||e==A||e==o||r.push(e);return r},tt=function(t){var e,a=t===R,r=N(a?U:C(t)),s=[],i=0;while(r.length>i)!n(T,e=r[i++])||a&&!n(R,e)||s.push(T[e]);return s};W||($=function(){if(this instanceof $)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(a){this===R&&e.call(U,a),n(this,A)&&n(this[A],t)&&(this[A][t]=!1),H(this,t,O(1,a))};return s&&G&&H(R,t,{configurable:!0,set:e}),K(t)},c($[I],"toString",function(){return this._k}),j.f=X,S.f=Y,a("6abf").f=x.f=Z,a("355d").f=V,a("9aa9").f=tt,s&&!a("b8e3")&&c(R,"propertyIsEnumerable",V,!0),v.f=function(t){return K(b(t))}),i(i.G+i.W+i.F*!W,{Symbol:$});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),at=0;et.length>at;)b(et[at++]);for(var rt=k(b.store),nt=0;rt.length>nt;)p(rt[nt++]);i(i.S+i.F*!W,"Symbol",{for:function(t){return n(M,t+="")?M[t]:M[t]=$(t)},keyFor:function(t){if(!Q(t))throw TypeError(t+" is not a symbol!");for(var e in M)if(M[e]===t)return e},useSetter:function(){G=!0},useSimple:function(){G=!1}}),i(i.S+i.F*!W,"Object",{create:B,defineProperty:Y,defineProperties:z,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),L&&i(i.S+i.F*(!W||l(function(){var t=$();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))})),"JSON",{stringify:function(t){var e,a,r=[t],n=1;while(arguments.length>n)r.push(arguments[n++]);if(a=e=r[1],(y(e)||void 0!==t)&&!Q(t))return h(e)||(e=function(t,e){if("function"==typeof a&&(e=a.call(this,t,e)),!Q(e))return e}),r[1]=e,F.apply(L,r)}}),$[I][J]||a("35e8")($[I],J,$[I].valueOf),f($,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},"0395":function(t,e,a){var r=a("36c3"),n=a("6abf").f,s={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return n(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==s.call(t)?c(t):n(r(t))}},"268f":function(t,e,a){t.exports=a("fde4")},"32a6":function(t,e,a){var r=a("241e"),n=a("c3a1");a("ce7e")("keys",function(){return function(t){return n(r(t))}})},"355d":function(t,e){e.f={}.propertyIsEnumerable},"3b79":function(t,e,a){},"454f":function(t,e,a){a("46a7");var r=a("584a").Object;t.exports=function(t,e,a){return r.defineProperty(t,e,a)}},"46a7":function(t,e,a){var r=a("63b6");r(r.S+r.F*!a("8e60"),"Object",{defineProperty:a("d9f6").f})},"47ee":function(t,e,a){var r=a("c3a1"),n=a("9aa9"),s=a("355d");t.exports=function(t){var e=r(t),a=n.f;if(a){var i,c=a(t),o=s.f,l=0;while(c.length>l)o.call(t,i=c[l++])&&e.push(i)}return e}},6718:function(t,e,a){var r=a("e53d"),n=a("584a"),s=a("b8e3"),i=a("ccb9"),c=a("d9f6").f;t.exports=function(t){var e=n.Symbol||(n.Symbol=s?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||c(e,t,{value:i.f(t)})}},"6abf":function(t,e,a){var r=a("e6f3"),n=a("1691").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,n)}},"85f2":function(t,e,a){t.exports=a("454f")},"8aae":function(t,e,a){a("32a6"),t.exports=a("584a").Object.keys},"9aa9":function(t,e){e.f=Object.getOwnPropertySymbols},a4bb:function(t,e,a){t.exports=a("8aae")},af95:function(t,e,a){"use strict";var r=a("3b79"),n=a.n(r);n.a},bf0b:function(t,e,a){var r=a("355d"),n=a("aebd"),s=a("36c3"),i=a("1bc3"),c=a("07e3"),o=a("794b"),l=Object.getOwnPropertyDescriptor;e.f=a("8e60")?l:function(t,e){if(t=s(t),e=i(e,!0),o)try{return l(t,e)}catch(a){}if(c(t,e))return n(!r.f.call(t,e),t[e])}},bf90:function(t,e,a){var r=a("36c3"),n=a("bf0b").f;a("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return n(r(t),e)}})},ccb9:function(t,e,a){e.f=a("5168")},ce7e:function(t,e,a){var r=a("63b6"),n=a("584a"),s=a("294c");t.exports=function(t,e){var a=(n.Object||{})[t]||Object[t],i={};i[t]=e(a),r(r.S+r.F*s(function(){a(1)}),"Object",i)}},cebc:function(t,e,a){"use strict";var r=a("268f"),n=a.n(r),s=a("e265"),i=a.n(s),c=a("a4bb"),o=a.n(c),l=a("85f2"),u=a.n(l);function f(t,e,a){return e in t?u()(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},r=o()(a);"function"===typeof i.a&&(r=r.concat(i()(a).filter(function(t){return n()(a,t).enumerable}))),r.forEach(function(e){f(t,e,a[e])})}return t}a.d(e,"a",function(){return d})},d6ae:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bg-main"},[a("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("Alert"),a("div",{staticClass:"sticky-top shadow-sm"},[a("nav",{staticClass:"navbar navbar-expand-md navbar-dark bg-dark"},[a("div",{staticClass:"container"},[t._m(0),a("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[a("i",{staticClass:"text-lighter fas fa-mug-hot fa-lg"})]),a("router-link",{staticClass:"cart-icon text-lighter order-md-1",attrs:{to:"/cart"}},[t.myCart.carts.length?a("span",{staticClass:"badge badge-pill badge-danger cart-badge"},[t._v("\n            "+t._s(t.myCart.carts.length)+"\n          ")]):t._e(),a("i",{staticClass:"material-icons md-32 align-middle"},[t._v("shopping_cart")])]),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarNav"}},[a("ul",{staticClass:"navbar-nav font-weight-bolder mr-auto"},[a("li",{staticClass:"nav-item",class:{active:"index"==t.isActive},on:{click:function(e){e.preventDefault(),t.isActive="index"}}},[a("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[t._v("Let's Cafe")])],1)])])],1)])]),a("div",{staticClass:"bd-example"},[a("div",{staticClass:"carousel slide",attrs:{id:"carouselExampleCaptions","data-ride":"carousel"}},[t._m(1),a("div",{staticClass:"carousel-inner"},[a("div",{staticClass:"carousel-item header-carousel-item bg-cover active",style:{backgroundImage:"url("+t.baseUrl+"/images/coffee-1.jpg)"},attrs:{"data-interval":"3000"}},[t._m(2)]),a("div",{staticClass:"carousel-item header-carousel-item bg-cover",style:{backgroundImage:"url("+t.baseUrl+"/images/coffee-2.jpg)"},attrs:{"data-interval":"3000"}},[t._m(3)]),a("div",{staticClass:"carousel-item header-carousel-item bg-cover",style:{backgroundImage:"url("+t.baseUrl+"/images/coffee-3.jpg)"},attrs:{"data-interval":"3000"}},[t._m(4)])]),t._m(5),t._m(6)])]),a("main",{staticClass:"mt-5"},[a("router-view")],1),t._m(7)],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarNav"}},[a("i",{staticClass:"material-icons"},[t._v("menu")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ol",{staticClass:"carousel-indicators"},[a("li",{staticClass:"active",attrs:{"data-target":"#carouselExampleCaptions","data-slide-to":"0"}}),a("li",{attrs:{"data-target":"#carouselExampleCaptions","data-slide-to":"1"}}),a("li",{attrs:{"data-target":"#carouselExampleCaptions","data-slide-to":"2"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"carousel-caption d-none d-md-block"},[a("h2",[t._v("Let's drink a coffee")]),a("p",{staticClass:"h5"},[t._v("品味豐富的人生來自品嚐一杯好咖啡")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"carousel-caption d-none d-md-block"},[a("h2",[t._v("Taste a good coffee")]),a("p",{staticClass:"h5"},[t._v("喝一杯香淳濃厚的咖啡")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"carousel-caption d-none d-md-block"},[a("h2",[t._v("Enjoy your life")]),a("p",{staticClass:"h5"},[t._v("一個人也可以享受的好咖啡")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"carousel-control-prev",attrs:{href:"#carouselExampleCaptions",role:"button","data-slide":"prev"}},[a("span",{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),a("span",{staticClass:"sr-only"},[t._v("Previous")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"carousel-control-next",attrs:{href:"#carouselExampleCaptions",role:"button","data-slide":"next"}},[a("span",{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),a("span",{staticClass:"sr-only"},[t._v("Next")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"bg-lighter py-3"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row text-main"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"d-flex mb-3"},[a("i",{staticClass:"fas fa-mug-hot fa-2x mr-3"}),a("h2",{staticClass:"font-weight-bold"},[t._v("Let's cafe")])]),a("p",[a("em",[t._v("Made by Charles Hong")])])]),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"text-right mb-3"},[a("a",{staticClass:"text-decoration-none",attrs:{href:"#"}},[a("i",{staticClass:"text-facebook fab fa-facebook-square fa-2x"})])]),a("p",{staticClass:"text-right"},[t._v("© Copright 2019 All Rights Reserved")])])])])])}],s=a("cebc"),i=a("2f62"),c={data:function(){return{isActive:"",baseUrl:"/Lets-Cafe"}},computed:Object(s["a"])({isLoading:function(){return this.$store.state.isLoading}},Object(i["c"])("cartModule",["myCart"])),methods:Object(s["a"])({},Object(i["b"])("cartModule",["getCart"])),created:function(){this.getCart()}},o=c,l=(a("af95"),a("2877")),u=Object(l["a"])(o,r,n,!1,null,"646d1600",null);e["default"]=u.exports},e265:function(t,e,a){t.exports=a("ed33")},ed33:function(t,e,a){a("014b"),t.exports=a("584a").Object.getOwnPropertySymbols},fde4:function(t,e,a){a("bf90");var r=a("584a").Object;t.exports=function(t,e){return r.getOwnPropertyDescriptor(t,e)}}}]);
//# sourceMappingURL=chunk-068afadb.0463d916.js.map
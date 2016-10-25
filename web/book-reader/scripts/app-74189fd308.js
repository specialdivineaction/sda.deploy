!function(){"use strict";angular.module("sdaBookReader",["ngAnimate","ngCookies","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","trcBiblio"])}(),function(){"use strict";function e(e,o){function t(o){o.$watchGroup(["bookId","page"],function(t){var n=t[0],i=t[1],l=r({scheme:"https",host:"archive.org",path:["stream",n],query:{ui:"embed"},fragment:a(i?"page/"+i:"","mode/2up")});o.src=e.trustAsResourceUrl(l)})}function r(e){var t=o.defaults(o.clone(e)||{},{scheme:"http",query:{}});if(!t.host)throw new Error("host option must be provided");return o.isArray(t.path)&&(t.path=a.apply(null,t.path)),o.isObject(t.query)&&(t.query=n(t.query,t.querySep)),t.scheme+"://"+a(t.host,t.path)+(t.query?"?"+t.query:"")+(t.fragment?"#"+t.fragment:"")}function a(){return o.chain(arguments).map(function(e){return o.trim(e,"\r\n\t /")}).filter().join("/")}function n(e,t){return t=t||"&",o.chain(e).map(function(e,t){return t?(o.isArray(e)||(e=[e]),o.map(e,function(e){return t+(e?"="+e:"")})):[]}).flatten().filter().join(t)}var i={restrict:"E",template:'<iframe ng-src="{{src}}">',replace:!0,link:t,scope:{bookId:"=",page:"="}};return i}e.$inject=["$sce","_"],angular.module("sdaBookReader").directive("iaReader",e)}(),function(){"use strict";function e(e,t){function r(r){r.$watchGroup(["bookId","page"],function(a){var n=a[0],i=a[1],l={id:n,ui:"embed"};i&&(l.seq=i);var d=t.map(l,function(e,o){return o+"="+e}).join(";"),c=o+"?"+d;r.src=e.trustAsResourceUrl(c)})}var a={restrict:"E",template:'<iframe ng-src="{{src}}">',replace:!0,link:r,scope:{bookId:"=",page:"="}};return a}e.$inject=["$sce","_"];var o="https://babel.hathitrust.org/cgi/pt";angular.module("sdaBookReader").directive("hathitrustReader",e)}(),function(){"use strict";function e(){function e(e){angular.extend(t.options,e)}function o(e){return e.load(t.options)}o.$inject=["googleBooksScriptLoader"];var t={};return t.options={transport:"https",v:0,language:"en",preventLoad:!1},t.configure=e,t.$get=o,t}angular.module("sdaBookReader").provider("googleBooksApi",e)}(),function(){"use strict";function e(e,o,t,r){function a(e){return"auto"===e.transport?"//www.google.com/books/api.js?":e.transport+"://www.google.com/books/api.js?"}function n(e){var t=["transport","preventLoad","randomizedFunctionName"],n=r.map(r.omit(e,t),function(e,o){return o+"="+e});if(c){var i=o.getElementById(c);i.parentNode.removeChild(i)}else c="gbooks_load_"+Math.round(1e3*Math.random());n=n.join("&"),angular.element("<script>",{id:c,type:"text/javascript",src:a(e)+n}).appendTo(angular.element("body"))}function i(){return angular.isDefined(e.google)&&angular.isDefined(e.google.books)}function l(o){var r=t.defer();if(i())return r.resolve(e.google.books),r.promise;var a="onGoogleBooksReady"+Math.round(1e3*Math.random());return o.callback=a,e[a]=function(){e[a]=null,r.resolve(e.google.books)},o.preventLoad||n(o),u=o,u.randomizedFunctionName=a,r.promise}function d(){var o=u;i()?e[o.randomizedFunctionName]&&e[o.randomizedFunctionName]():n(o)}var c=void 0,u=void 0;return{load:l,manualLoad:d}}e.$inject=["$window","$document","$q","_"],angular.module("sdaBookReader").factory("googleBooksScriptLoader",e)}(),function(){"use strict";function e(e,o){function t(t,r){o.load(),e.then(function(e){var o=new e.DefaultViewer(r.get(0));t.$watch("bookId",function(e){o.load(e)}),t.$on("resize",function(){o.resize()})})}var r={restrict:"E",link:t,scope:{bookId:"="}};return r}e.$inject=["googleBooksApi","googleBooksApiManualLoader"],angular.module("sdaBookReader").directive("googleBookReader",e)}(),function(){"use strict";function e(e){function o(){e.manualLoad()}var t={};return t.load=o,t}e.$inject=["googleBooksScriptLoader"],angular.module("sdaBookReader").service("googleBooksApiManualLoader",e)}(),function(){"use strict";function e(e,o,t){function r(){c.loading=!0,c.copyRef=t.getDigitalCopy(d,n,i,l),c.copyRef.$promise.then(function(){c.loading=!1},function(){c.loading=!1})}function a(e){o(e).toggle()}var n=e.workId,i=e.editionId,l=e.volumeId,d=e.copyId,c=this;c.toggleSidenav=a,c.loading=!1,r()}e.$inject=["$stateParams","$mdSidenav","worksRepo"],angular.module("sdaBookReader").controller("BookReaderController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("sdaBookReader").run(e)}(),function(){"use strict";function e(e,o){e.state("home",{url:"/",templateUrl:"app/layout.html"}).state("read",{url:"/:workId/:copyId?editionId&volumeId",templateUrl:"app/book-reader/book-reader.html",controller:"BookReaderController",controllerAs:"vm"}),o.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("sdaBookReader").config(e)}(),function(){"use strict";angular.module("sdaBookReader")}(),function(){"use strict";function e(e,o,t){e.debugEnabled(!0),t.url="/api/catalog/works",o.definePalette("darkBrown",{50:"#595c59",100:"#4c4f4c",200:"#404240",300:"#333533",400:"#272827",500:"#1a1b1a",600:"#0d0e0d",700:"#010101",800:"#000000",900:"#000000",A100:"#e0f0e0",A200:"#565956",A400:"#7e837e",A700:"#000000",contrastDefaultColor:"light",contrastDarkColors:["A100"]}),o.definePalette("copper",{50:"#d4b190",100:"#cca47e",200:"#c5976b",300:"#be8a59",400:"#b67e47",500:"#a47140",600:"#926439",700:"#7f5832",800:"#6d4b2b",900:"#5b3e23",A100:"#dcc3ab",A200:"#a47140",A400:"#48321c",A700:"#272927",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","A100"]}),o.theme("default").primaryPalette("darkBrown").accentPalette("copper")}e.$inject=["$logProvider","$mdThemingProvider","worksRepoProvider"],angular.module("sdaBookReader").config(e)}(),angular.module("sdaBookReader").run(["$templateCache",function(e){e.put("app/layout.html",'<md-toolbar class=layout-navbar><div class=md-toolbar-tools><a class=logo href=/ layout=column layout-align="center center"><img src=/assets/images/sda-logo-light.png alt=SDA flex=nogrow></a><h1>Book Reader</h1></div></md-toolbar><div layout=column layout-align="center center" flex layout-fill ui-view><div class=md-display-1>This app is meant to receive parameters to locate a digital copy, but none were provided.<br></div></div>'),e.put("app/book-reader/book-reader.html",'<md-toolbar class=layout-navbar><div class=md-toolbar-tools><md-button class="md-accent md-icon-button" ng-click="vm.toggleSidenav(\'left\')" hide-gt-sm><md-icon>menu</md-icon></md-button><a class=logo href=/ ><img src=/assets/images/sda-logo-light.png alt=SDA></a><h1>Book Reader</h1></div></md-toolbar><main layout=row layout-align=center flex><md-sidenav md-component-id=left class=md-sidenav-left md-is-locked-open="$mdMedia(\'gt-sm\')" layout=column>Book Info Here!</md-sidenav><div layout=column flex><div ng-switch=vm.copyRef.type layout=column layout-padding flex><hathitrust-reader ng-switch-when=hathitrust book-id=vm.copyRef.properties.htid page=vm.copyRef.properties.seq flex></hathitrust-reader><ia-reader ng-switch-when=internetarchive book-id=vm.copyRef.properties.id page=vm.copyRef.properties.seq flex></ia-reader><google-book-reader ng-switch-when=googlebooks book-id=vm.copyRef.properties.id flex></google-book-reader><div ng-switch-default layout=column layout-align="center center" flex><div class=md-display-1 ng-if=vm.loading>Sorry. We were unable to load a book reader for that resource.</div><div class=md-display-1 ng-if=!vm.loading layout=column flex layout-align="center center"><div>Loading book reader&hellip;</div><md-progress-circular md-mode=indeterminate></md-progress-circular></div></div></div></div></main>')}]);
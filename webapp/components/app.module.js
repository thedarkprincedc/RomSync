(function(){
    //agGrid.initialiseAgGridWithAngular1(angular);  "agGrid"
    angular.module("app.module",[
        "mm.foundation", "app.routes", "infinite-scroll", "LocalStorageModule",
    ])
    .config(config)
    .run(run);

    //config.$inject = ['$httpProvider'];
    function config($httpProvider, localStorageServiceProvider){ 
        //$httpProvider.interceptors.push('AuthInterceptor');
    }
    function run(){ }
  
})();
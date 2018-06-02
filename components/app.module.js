(function(){
    angular.module("app.module",[
        "app.routes",
        "app.constants",
        "mm.foundation",
        "LocalStorageModule"
    ]).config(config)
    .run(run);

    config.$inject = ['$httpProvider'];
    function config($httpProvider, localStorageServiceProvider){ 
        $httpProvider.interceptors.push('AuthInterceptor');
    }
    function run(){ }
           
})();
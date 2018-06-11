(function(){
    angular.module("app.module",[
        "app.routes",
        "app.constants",
        "mm.foundation",
        // "ui.scroll",
        'infinite-scroll',
        "LocalStorageModule"
    ]).config(config)
    .run(run);

    config.$inject = ['$httpProvider'];
    function config($httpProvider, localStorageServiceProvider){ 
        $httpProvider.interceptors.push('AuthInterceptor');
    }
    function run(){ }
           
})();
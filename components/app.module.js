(function(){
    agGrid.initialiseAgGridWithAngular1(angular); 
    angular.module("app.module",["mm.foundation",
        "app.routes",
        "app.constants",
        'infinite-scroll',
        "LocalStorageModule",
        "agGrid"
    ]).config(config)
    .run(run);

    config.$inject = ['$httpProvider'];
    function config($httpProvider, localStorageServiceProvider){ 
        $httpProvider.interceptors.push('AuthInterceptor');
    }
    function run(){ }
  
})();
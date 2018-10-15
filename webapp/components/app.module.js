(function(){
    //agGrid.initialiseAgGridWithAngular1(angular);  "agGrid"
    angular.module("app.module",[
        "mm.foundation", "app.routes", "infinite-scroll", "LocalStorageModule", "config"
    ])
    .config(config)
    .run(run);

    //config.$inject = ['$httpProvider'];
    function config($httpProvider, localStorageServiceProvider){ 
        //$httpProvider.interceptors.push('AuthInterceptor');
    }
    function run($rootScope, CONFIG){ 
        $rootScope.config = {}
        $rootScope.platforms = CONFIG.platforms;
        $rootScope.selectedPlatforms = CONFIG.platforms[0];
        
    }
  
})();
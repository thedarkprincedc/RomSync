(function(){
    angular.module("app.module",[
        "ui.router",
        "app.routes",
        "app.constants",
        "mm.foundation"
    ]).config(config)
    .run(run);

    config.$inject = ['$httpProvider'];

    function config($httpProvider){ 

    }
    function run(){ 

    }
})();
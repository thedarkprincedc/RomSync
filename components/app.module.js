(function(){
    angular.module("app.module",[
        "app.routes",
        "app.constants",
        "mm.foundation"
    ]).config(config)
    .run(run);

    config.$inject = ['$httpProvider'];
    function config($httpProvider){ }
    function run(){ }
           
})();
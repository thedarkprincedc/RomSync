(function(){
    angular.module("app.routes",["ui.router"])
        .config(router);
    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    function router($stateProvider, $urlRouterProvider){
        $stateProvider.state('index', {
            url: '/system/:id/:name',
            params: {
                id: {squash: false, value: null},
                name: {squash: true, value: null}
            },
            templateUrl: '../../components/pages/search-view.template.html',
            controller: 'SearchView',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/system/arcade');
    }
})();
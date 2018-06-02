(function(){
    angular.module("app.routes",["ui.router"])
        .config(router)
        .run(routeStart);
    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    function router($stateProvider, $urlRouterProvider){

        $stateProvider.state('index', {
            url: '/system/:id/:name?gameType?year?decade',
            params: {
                id: {squash: false, value: null},
                name: {squash: true, value: null},
                gameType: {squash: true, value: null},
                year: {squash: true, value: null},
                decade: {squash: true, value: null},
            },
            templateUrl: '../../components/pages/search-view.template.html',
            controller: 'SearchView',
            controllerAs: 'vm',
            restrictions:{
                ensureAuthenticated: false,
                loginRedirect: false
            }
        });

        $stateProvider.state('login', {
            url: '/login',
            params: {},
            templateUrl: '../../components/pages/auth-login-view.template.html',
            controller: 'LoginView',
            controllerAs: 'vm',
            restrictions:{
                ensureAuthenticated: false,
                loginRedirect: true
            }
        });

        $stateProvider.state('register', {
            url: '/register',
            params: {},
            templateUrl: '../../components/pages/auth-register-view.template.html',
            controller: 'RegisterView',
            controllerAs: 'vm',
            restrictions:{
                ensureAuthenticated: false,
                loginRedirect: true
            }
        });

        $urlRouterProvider.otherwise('/system/arcade');
    }
    function routeStart($rootScope, $location, $state){
        $rootScope.$on('$stateChangeStart', (event, next, current) => {
            if (next.restrictions.ensureAuthenticated) {
              if (!localStorage.getItem('ls.jwt')) {
                //$location.path('/login');
                $state.go("login");
              }
            }
            if (next.restrictions.loginRedirect) {
              if (localStorage.getItem('ls.jwt')) {
                event.preventDefault();
                $state.go("index", {id : "arcade"});
               
                //$location.path('/status');
               // $location.path("http://localhost:3002/#/system/arcade");
              }
            }
        });
    }
})();
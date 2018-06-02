(function () {
    'use strict';
    angular
        .module('app.module')
        .service('AuthInterceptor', AuthInterceptorService);
    
    AuthInterceptorService.$inject = ['localStorageService'];
    function AuthInterceptorService(localStorageService) {

        return {
            'request': function (config) {
                var jwt = localStorageService.get("jwt");
                if(jwt){
                    config.headers.Authorization = "Bearer " + jwt;
                }
                return config;
            },
            'requestError': function (rejection) {
                return rejection;
            },
            'response': function (response) {
                // if(response.config.url == "/auth" && response.data.success){
                //     token = response.data.token;
                // }
                return response;
            },
            'responseError': function (rejection) {
                return rejection;
            }
        }
    }
})();
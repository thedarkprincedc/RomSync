(function () {
    'use strict';
    angular
        .module('romsyncApp')
        .component('login', {
            templateUrl: 'components/common/login/login.component.html',
            controller: LoginController,
            controllerAs: 'vm',
        });

    LoginController.$inject = ['$rootScope', '$state', 'AUTH_EVENTS', 'AuthService', 'AUTH_STATES'];

    function LoginController($rootScope, $state, AUTH_EVENTS, AuthService, AUTH_STATES) {
        var vm = this;
        vm.credentials = {};
        vm.onClickSubmit = onClickSubmit;
        vm.errorMessage = false;
        vm.successMessage = false;

        function onClickSubmit(username, password) {
            vm.errorMessage = null;
            vm.successMessage = false;
            try {
                if (username == undefined || username.length == 0) {
                    throw "No username supplied at login dialog";
                }
                AuthService.authenticate({
                    username: username,
                    password: password
                }).then(function (response) {
                    if(AUTH_STATES[response.status]!== undefined){
                        if(response.status == 200){
                            vm.successMessage = "Successfully logged in";
                            $state.go("^index");
                        }
                        else{
                            throw AUTH_STATES[response.status];
                        }
                    }
                    else{
                        throw "Unknown Error";
                    }
                });
            } catch (err) {
                console.error("Error: " + err);
                vm.errorMessage = "Error: " + err;
            }
        }
        vm.$onInit = function () {};
        vm.$onChanges = function (changesObj) {};
        vm.$onDestroy = function () {};

    }
})();
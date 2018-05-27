(function() {
    'use strict';
    angular
        .module('app.module')
        .component('header', {
            templateUrl: '../components/header/header.template.html',
            controller: HeaderController,
            controllerAs: 'vm'
        });

    HeaderController.$inject = ['$rootScope', '$http'];
    function HeaderController($rootScope,$http) {
        var vm = this;
        vm.systemslist = [];
        
        
        //////////////
        vm.$onInit = () => {    };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
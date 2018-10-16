(function() {
    'use strict';
    angular
        .module('app.module')
        .component('errorlist', {
            templateUrl: '../components/error/errors.template.html',
            controller: ErrorController,
            controllerAs: 'vm',
            bindings: {
            }
        });

    ErrorController.$inject = ['$timeout', 'error'];
    function ErrorController($timeout, error) {
        var vm = this;
        vm.timeout = 3000;
        vm.alerts = error.alerts;
        vm.addAlert = function(object) {
            vm.alerts.push(object);
            $timeout(function(){
                object.active = false;
            }, vm.timeout)
        };
  
        vm.addAlert({type: 'warning', msg: 'Oh snap! Change a few things up and try submitting again.'})
        vm.closeAlert = function(index){
            vm.alerts.splice(index, 1);
        }
    }
})()
(function() {
    'use strict';
    angular
        .module('app.module')
        .service('error', ErrorService);

    ErrorService.$inject = ['$timeout'];
    function ErrorService($timeout) {
        var service = {
            addAlert: addAlert,
            addWarning: addWarning,
            addSuccess: addSuccess,
            alerts: []
        };
        function addAlert(object){
            service.alerts.push(object);
            $timeout(function(){
                object.active = false;
            }, 3000)
        }
        function addWarning(object) {
            object.type = 'alert';
            object.prefix = "Error";
            addAlert(object);
        };
        function addSuccess(object) {
            object.type = 'success';
            object.prefix = "Success";
            addAlert(object);
        };
        return service;
    }
})();
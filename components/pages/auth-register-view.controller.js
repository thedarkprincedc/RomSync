(function () {
    'use strict';
    angular
        .module('app.module')
        .controller('RegisterView', RegisterViewController);

    RegisterViewController.$inject = ['$http', 'URIS', 'localStorageService'];
    function RegisterViewController($http, URIS, localStorageService) {
        var vm = this;
      
    
        activate();
        
        ////////////////

        function activate() { }
    }
})();
(function() {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['$http'];
    function SearchViewController($http) {
        var vm = this;
       
        activate();
        
        ////////////////

        function activate() { }
    }
})();
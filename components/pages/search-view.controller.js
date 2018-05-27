(function() {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['$http', 'URIS'];
    function SearchViewController($http, URIS) {
        var vm = this;
       
        activate();
        
        ////////////////

        function activate() { }
    }
})();
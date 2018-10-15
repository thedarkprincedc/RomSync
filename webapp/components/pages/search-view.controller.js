(function() {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['romsync'];
    function SearchViewController(romsync) {
        var vm = this;
        vm.results = romsync.results;
        debugger;
        activate();
        
        ////////////////

        function activate() { }
    }
})();
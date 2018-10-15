(function() {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['romsync'];
    function SearchViewController(romsync) {
        var vm = this;
        vm.games = [{
            "name" : "Street Fighter III",
            "filename": "88games",
            "manufacturer" : "Capcom",
            "year": "2009",
            "system": "Arcade",
            "players": 2,
            "genre": "Beat Up"
        },{
            "name" : "Street Fighter II",
            "filename": "88games",
            "manufacturer" : "Capcom",
            "year": "2009",
            "system": "Arcade",
            "players": 2,
            "genre": "Beat Up"
        },{
            "name" : "Street Fighter",
            "filename": "88games",
            "manufacturer" : "Capcom",
            "year": "2009",
            "system": "Arcade",
            "players": 2,
            "genre": "Beat Up"
        }]
        activate();
        
        ////////////////

        function activate() { }
    }
})();
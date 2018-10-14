(function() {
    'use strict';
    angular
        .module('app.module')
        .service('mockdata', MockDataService);

    MockDataService.$inject = ['$http'];
    function MockDataService($http) {
        var service = {};
        function load(options){
            return $http({
                method: 'GET',
                url: options.url
            }).then(function(){

            })
        }
        
        return {
            load: load
        }
    }
})();
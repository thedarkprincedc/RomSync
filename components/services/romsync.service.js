(function() {
    'use strict';
    angular
        .module('app.module')
        .service('romsync', RomsyncService);

    RomsyncService.$inject = ['$http','URIS', '$q', '$state'];
    function RomsyncService($http, URIS, $q, $state) {
        var service = {};
        service.systems = null;
        service.getPlatformType = function(){
            return service.getSystems().then(function(response){
               return findSystemByCode(response, $state.params.id);
            });
        }
        service.getSystems = function(){
            if(!service.systems){
                return $http({ url: URIS.GAME_SYSTEM_URL })
                    .then(function(response){
                        return service.systems = response.data;
                });    
            }
            return $q.when(service.systems);
        }
        return service;
       
        function findSystemByCode(systems, code){
            var system = systems.filter(function(value){
                return value.code == code;
            });
            return system[0];
        }
    }
})();
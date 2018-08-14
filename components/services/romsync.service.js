(function() {
    'use strict';
    angular
        .module('app.module')
        .service('romsync', RomsyncService);

    RomsyncService.$inject = ['$http','URIS', '$q', '$state'];
    function RomsyncService($http, URIS, $q, $state) {
        var service = {};
        service.systems = null;
        service.translateYoutubeUrlToEmbed = translateYoutubeUrlToEmbed;
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
        service.syncWithDevice = function(data){
            return $http({ 
                method: "POST",
                url: URIS.GAME_SYNC_DEVICE_URL,
                params: {
                    id: data.id,
                    deviceId: data.deviceId
                },
            }).then(function(response){
                return response;
            });    
        }
        return service;
       
        function findSystemByCode(systems, code){
            var system = systems.filter(function(value){
                return value.code == code;
            });
            return system[0];
        }
        function translateYoutubeUrlToEmbed(url){
            var url = new URL(url);
            var id = url.searchParams.get('v');
            return URIS.YOUTUBE_EMBED_URL + id;
        }
        
    }
})();
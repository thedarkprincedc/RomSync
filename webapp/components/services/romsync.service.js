(function() {
    'use strict';
    angular
        .module('app.module')
        .service('romsync', RomsyncService);

    RomsyncService.$inject = ['$http', '$q', '$state', 'CONFIG'];
    function RomsyncService($http, $q, $state, CONFIG) {
        var service = {
            search: search,
            searchGamesDB: searchGamesDB,
            searchYoutube: searchYoutube,
            platforms: platforms,
            selected:{
                platform: CONFIG.selected.platform,
                year: null,
                decade: null
            }
        };
      
        function search(options){
            return $http({ url: "/api/games/search" });
        }
        // {name :"", platform:"arcade"}
        function searchGamesDB(options){
            return $http({ 
                method: "GET",
                params: options,
                url: "/api/gamesdb/search",
                //transformResponse: $.parseXML
            });
        }
        
        function searchYoutube(options){
            return $http({ 
                method: "GET",
                params: options,
                url: "/api/youtube/search",
            });
        }
        function platforms(options){
            return $http({ url: "/api/platforms" });
        }
        function download(options){
            return $http({ url: "/api/systems" });
        } 
        return service;
    }
})();
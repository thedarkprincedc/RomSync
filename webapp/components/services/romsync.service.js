(function() {
    'use strict';
    angular
        .module('app.module')
        .service('romsync', RomsyncService);

    RomsyncService.$inject = ['$rootScope','$http', 'CONFIG'];
    function RomsyncService($rootScope, $http,CONFIG) {
        var service = {
            search: search,
            searchGamesDB: searchGamesDB,
            searchYoutube: searchYoutube,
            platforms: platforms,
            
            selected:{
                platform: CONFIG.selected.platform,
                year: null,
                decade: null
            },
            results: {
                games: [],
                length: 0
            }
        };
        $rootScope.$watch(function(){return service.selected;}, function(newVal, oldVal){
            search({ platform: newVal.platform }).then(function(response){
                service.results.games = response.data;
                service.results.length  = response.data.length;
                console.log(service.results);
            });
        }, true);
        function search(options){
            return $http({ 
                method: "GET",
                params: options,
                url: "/api/games/search" 
            });
        }
       
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
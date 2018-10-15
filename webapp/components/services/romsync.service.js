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
                transformResponse : function(data) {
                    var transformData = {};
                    var parsedXML = $.parseXML(data);
                    var games = $(parsedXML).find("Data>Game"); 
                    debugger;
                    var url = new URL($(games).find("Youtube")[0].textContent);
                    var id = url.searchParams.get('v');  

                    transformData = {
                        overview: $(games).find("Overview")[0].textContent,
                        genre: $(games).find("Genres>genre")[0].textContent,
                        players: $(games).find("Players")[0].textContent,
                        coop: $(games).find("Co-op")[0].textContent,
                        youtube: "https://www.youtube.com/embed/" + id
                    } 
                    return transformData;
                }
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
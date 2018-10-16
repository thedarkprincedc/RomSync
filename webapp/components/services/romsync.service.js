(function() {
    'use strict';
    angular
        .module('app.module')
        .service('romsync', RomsyncService);

    RomsyncService.$inject = ['$rootScope','$http', 'CONFIG', 'error'];
    function RomsyncService($rootScope, $http,CONFIG, error) {
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
        function onErrorCallback(response){
            error.addWarning({msg: response.data})
            //alert("Error: "+ response.data);
            
        }
        function onSuccessCallback(response){
            error.addSuccess({msg: response.data.length})
            return response;
        }
        function search(options){
            return $http({ 
                method: "GET",
                params: options,
                url: "/api/games/search" 
            }).then(onSuccessCallback, onErrorCallback);
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
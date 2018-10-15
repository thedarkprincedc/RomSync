(function() {
    'use strict';
    angular
        .module('app.module')
        .service('gamesdb', GamesDbService);

    GamesDbService.$inject = ['URIS', '$http', 'romsync'];
    function GamesDbService(URIS, $http, romsync) {
        var service = {};
        service.search = search;
        return service;
  
        function search(name, platform){
            var params = (typeof(name) == "object") 
                ? name : { name: name, platform: "arcade" };
            return $http({
                method: "GET",
                url: URIS.GAMESDB_SEARCH,
                params: params,
                transformResponse: $.parseXML
            }).then(filterSearchResults);
        }
        function filterSearchResults(response){
            var games = $(response.data).find("Data>Game");
            if(games.length == 1){
                var overview = games.find("Overview")[0].textContent;
                var genre = games.find("Genres>genre")[0].textContent;
                var players = games.find("Players")[0].textContent;
                var coop = games.find("Co-op")[0].textContent;
                var youtube = null;
                if(games.find("Youtube")[0]){
                    youtube = romsync.translateYoutubeUrlToEmbed(games.find("Youtube")[0].textContent)
                }
                return {
                    overview: overview,
                    genre: genre,
                    players: players,
                    coop: coop,
                    youtubeurl: youtube
                };
            }
            return null;
        }
    }
})();
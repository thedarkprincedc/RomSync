(function(){
    'use strict'
    angular.module('romsync.server',['app.module', 'ngMockE2E', 'app.routes'])
        .run(endpoints);
    function endpoints($httpBackend, $q, $http,$log){
        var mockserver = {
            endpoints:{
                games: $http.get("../models/games.json"),
                'games-arcade': $http.get("../models/games.json"),
                'games-n64': $http.get("../models/games.json"),
                platforms: $http.get("../models/platforms.json"),
                years: $http.get("../models/years.json"),
                decades: $http.get("../models/decades.json"),

            },
            urls: {
                SEARCH: /\/api\/games\/search(.*)/,
                SEARCH_GAMESDBNET: /\/api\/gamesdb\/search(.*)/,
                SEARCH_YOUTUBE: /\/api\/youtube\/search(.*)/,
                PLATFORMS:/\/api\/platforms(.*)/,
                YEARS:/\/api\/years(.*)/,
                DECADES:/\/api\/decades(.*)/,
            },
            mockdata: []
        };
        $q.all(mockserver.endpoints).then(function(response){
            console.log("Mockdata Loaded: \n")
            for(var items in response){
                mockserver.mockdata[items] = response[items].data;
                $log.info("*********** "+items+" ************\n", angular.toJson(response[items].data,true))
            }
           
        }, function(error){
            console.error(error.message)
        })
        $httpBackend.whenGET(mockserver.urls.SEARCH).respond(function(method, url, data, headers, params){
            return [200, mockserver.mockdata["games"], {}];
        })
        $httpBackend.whenGET(mockserver.urls.PLATFORMS).respond(function(method, url, data, headers, params){
            return [200, mockserver.mockdata["platforms"], {}];
        })
        $httpBackend.whenGET(mockserver.urls.YEARS).respond(function(method, url, data, headers, params){
            return [200, mockserver.mockdata["years"], {}];
        })
        $httpBackend.whenGET(mockserver.urls.DECADES).respond(function(method, url, data, headers, params){
            return [200, mockserver.mockdata["decades"], {}];
        })
        $httpBackend.whenGET(/.*/).passThrough();
        // $httpBackend.whenGET(/http\:\/\/thegamesdb\.net\/api\/GetGame.php?.*/)
        //     .respond(respondWithFile("./localService/mockdata/gamesdb/GetGamesList.xml"));
    }
})();
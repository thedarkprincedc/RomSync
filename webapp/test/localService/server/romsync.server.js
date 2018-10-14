(function(){
    'use strict'
    angular.module('romsync.server',['app.module', 'ngMockE2E'])
        .run(endpoints);
    function endpoints($httpBackend, $location, $q, $http,$rootScope){
        $rootScope.mockdata = {};
        var files = [{
            name: "games",
            url: "../models/games.json"
        },{
            name: "platforms",
            url: "../models/platforms.json"
        },{
            name: "years",
            url: "../models/years.json"
        },{
            name: "decades",
            url: "../models/decades.json"
        }].forEach(function(value){
            $http.get(value.url).then(
                function(response){
                    $rootScope.mockdata[value.name] = response.data; 
                }, 
                function(error){
                    console.error(error.message)
                });
        });
        var URLS = {
            SEARCH: /\/api\/games\/search(.*)/,
            SEARCH_GAMESDBNET: /\/api\/gamesdb\/search(.*)/,
            SEARCH_YOUTUBE: /\/api\/youtube\/search(.*)/,
            PLATFORMS:/\/api\/platforms(.*)/,
            YEARS:/\/api\/years(.*)/,
            DECADES:/\/api\/decades(.*)/,
        }
        $httpBackend.whenGET(URLS.SEARCH).respond(function(method, url, data, headers, params){
            return [200, $rootScope.mockdata["games"], {}];
        })
        $httpBackend.whenGET(URLS.PLATFORMS).respond(function(method, url, data, headers, params){
            return [200, $rootScope.mockdata["platforms"], {}];
        })
        $httpBackend.whenGET(URLS.YEARS).respond(function(method, url, data, headers, params){
            return [200, $rootScope.mockdata["years"], {}];
        })
        $httpBackend.whenGET(URLS.DECADES).respond(function(method, url, data, headers, params){
            return [200, $rootScope.mockdata["decades"], {}];
        })
        $httpBackend.whenGET(/.*/).passThrough();
        // $httpBackend.whenGET(/http\:\/\/thegamesdb\.net\/api\/GetGame.php?.*/)
        //     .respond(respondWithFile("./localService/mockdata/gamesdb/GetGamesList.xml"));
    }
    // function getGames(method, url, data, params, qstring){
    //     var path = "./localService/mockdata/games/"
    //     var filePaths = {
    //         arcade: "arcade.gamelist.json",
    //         sms: "sms.gamelist.json",
    //         snes: "snes.gamelist.json",
    //         all: "all.gamelist.json"
    //     }
    //     var file = filePaths[qstring.system];
    //     if(file){
    //         var request = new XMLHttpRequest();
    //         request.open('GET', path + file, false);
    //         request.send(null);
    //         return [request.status, request.response, {}];    
    //     }
    //     return [404, undefined, {}];
    // }
})();
(function(){
    'use strict'
    angular.module('romsync.server',['app.module', 'ngMockE2E'])
        .run(endpoints);
    function endpoints($httpBackend, $location){
        $httpBackend.whenGET(/http\:\/\/thegamesdb\.net\/api\/GetGame.php?.*/)
            .respond(respondWithFile("./localService/mockdata/GetGamesList.xml"));
        // $httpBackend.whenGET(/\/api\/games?.*/)
        //     .respond(respondWithFile("./localService/mockdata/games-list.json"));
        $httpBackend.whenGET(/\/api\/games?.*/)
            .respond(getGames);
        $httpBackend.whenGET(/\/api\/systems/)
            .respond(respondWithFile("./localService/mockdata/misc/systems.json"));

        $httpBackend.whenGET(/\/api\/years/)
            .respond(respondWithFile("./localService/mockdata/filters/years.filters.json"));
        $httpBackend.whenGET(/\/api\/decades/)
            .respond(respondWithFile("./localService/mockdata/filters/decades.filter.json"));
        
        $httpBackend.whenGET(/.*/).passThrough();
    }
    function getGames(method, url, data, params, qstring){
        var path = "./localService/mockdata/games/"
        var filePaths = {
            arcade: "arcade.gamelist.json",
            sms: "sms.gamelist.json",
            snes: "snes.gamelist.json",
            all: "all.gamelist.json"
        }
        var file = filePaths[qstring.system];
        if(file){
            var request = new XMLHttpRequest();
            request.open('GET', path + file, false);
            request.send(null);
            return [request.status, request.response, {}];    
        }
        return [404, undefined, {}];
    }
    function respondWithFile(filename){
        return (function(method, url, data){
            var request = new XMLHttpRequest();
            request.open('GET', filename, false);
            request.send(null);
            return [request.status, request.response, {}];
        });
    }
})();
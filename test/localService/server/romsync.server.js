(function(){
    'use strict'
    angular.module('romsync.server',['app.module', 'ngMockE2E'])
        .run(endpoints);
    function endpoints($httpBackend){
        $httpBackend.whenGET(/http\:\/\/thegamesdb\.net\/api\/GetGame.php?.*/)
            .respond(respondWithFile("./localService/mockdata/GetGamesList.xml"));
        $httpBackend.whenGET(/\/api\/games/)
            .respond(respondWithFile("./localService/mockdata/games-list.json"));
        $httpBackend.whenGET(/\/api\/systems/)
            .respond(respondWithFile("./localService/mockdata/systems.json"));
        $httpBackend.whenGET(/.*/).passThrough();
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
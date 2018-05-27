(function() {
    'use strict';
    angular.module('app.constants', [])
        .constant("URIS", {
            GAME_SEARCH_URL: "/api/games",
            GAME_SYSTEM_URL: "/api/systems",
            AMAZON_S3_BUCKET_URL: "https://s3-us-west-2.amazonaws.com/media.thedarkprincedc.com/images/",
            GAMESDB_SEARCH: "http://thegamesdb.net/api/GetGame.php"
        });
})();
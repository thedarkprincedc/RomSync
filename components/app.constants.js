(function(window) {
    'use strict';
    window.__env = window.__env || {};
    var apiUrl = (window.__env.apiUrl) ? window.__env.apiUrl : '';
    angular.module('app.constants', [])
        .constant("URIS", {
            GAME_SEARCH_URL:  apiUrl + "/api/games",
            GAME_SYSTEM_URL:  apiUrl + "/api/systems",
            GAME_YEARS_URL:  apiUrl + "/api/years",
            GAME_DECADES_URL:  apiUrl + "/api/decades",
            AUTH_LOGIN_URL:  apiUrl + "/auth/login",
            AUTH_LOGOUT_URL:  apiUrl + "/auth/logout",
            GAMESDB_SEARCH:  apiUrl + "/api/gamesdb/search",
            YOUTUBE_SEARCH:  apiUrl + "/api/youtube/search",
            YOUTUBE_EMBED_URL: "https://www.youtube.com/embed/",
            AMAZON_S3_BUCKET_URL: "https://s3-us-west-2.amazonaws.com/media.thedarkprincedc.com/images/"     
        });
})(this);
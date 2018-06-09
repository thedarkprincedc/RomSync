(function(window) {
    'use strict';
    window.__env = window.__env || {};
    window.__env.apiUrl = 'http://localhost:8080';
    angular.module('app.constants', [])
        .constant("URIS", {
            GAME_SEARCH_URL: "/api/games",
            GAME_SYSTEM_URL: "/api/systems",
            GAME_YEARS_URL: "/api/years",
            GAME_DECADES_URL: "/api/decades",
            AUTH_LOGIN_URL:  "/auth/login",
            AUTH_LOGOUT_URL: "/auth/logout",
            GAMESDB_SEARCH: "/api/gamesdb/search",
            YOUTUBE_SEARCH: "/api/youtube/search",
            YOUTUBE_EMBED_URL: "https://www.youtube.com/embed/",
            AMAZON_S3_BUCKET_URL: "https://s3-us-west-2.amazonaws.com/media.thedarkprincedc.com/images/"     
        });
})(this);
(function(window) {
    'use strict';
    window.__env = window.__env || {};
    window.__env.apiUrl = '';
    angular.module('app.constants', [])
        .constant("URIS", {
            GAME_SEARCH_URL:  window.__env.apiUrl + "/api/games",
            GAME_SYSTEM_URL:  window.__env.apiUrl + "/api/systems",
            GAME_YEARS_URL:  window.__env.apiUrl + "/api/years",
            GAME_DECADES_URL:  window.__env.apiUrl + "/api/decades",
            AUTH_LOGIN_URL:   window.__env.apiUrl + "/auth/login",
            AUTH_LOGOUT_URL:  window.__env.apiUrl + "/auth/logout",
            GAMESDB_SEARCH:  window.__env.apiUrl +"/api/gamesdb/search",
            YOUTUBE_SEARCH:  window.__env.apiUrl+ "/api/youtube/search",
            YOUTUBE_EMBED_URL: "https://www.youtube.com/embed/",
            AMAZON_S3_BUCKET_URL: "https://s3-us-west-2.amazonaws.com/media.thedarkprincedc.com/images/"     
        });
})(this);
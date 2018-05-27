require.config({
    "baseUrl": "../",
    "paths":{
        "app.routes" : "components/app.routes",
        "app.module" : "components/app.module",
        "app.constants" : "components/app.constants",
        "romsync.server": "test/localService/server/romsync.server",
        "header": "components/header/header.controller",
        "footer": "components/footer/footer.controller",
        "gameitem.sm": "components/game/item/game-item-sm.controller",
        "gameitem.lg": "components/game/item/game-item-lg.controller",
        "gameitem.list": "components/game/list/game-list.controller",
        "youtube.video": "components/youtube-video/youtube-video.controller",
        "pages.search-view": "components/pages/search-view.controller",
        "amazons3.service": "components/services/amazons3.service",
        "gamesdb.service": "components/services/gamesdb.service"
    }
});
require([
    "app.routes",
    "app.constants",
    "app.module",
    "romsync.server",
    "header",
    "gameitem.sm",
    "gameitem.lg",
    "gameitem.list",
    "youtube.video",
    "pages.search-view",
    "amazons3.service",
    "gamesdb.service"
], function(){
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app.module']);
    });
});
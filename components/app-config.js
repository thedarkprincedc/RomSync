require.config({
    "baseUrl": "../",
    "paths":{
        "app.routes" : "components/app.routes",
        "app.module" : "components/app.module",
        "app.constants" : "components/app.constants",
        "romsync.server": "test/localService/server/romsync.server",
        "header": "components/header/header.controller",
        "footer": "components/footer/footer.controller",
        "footer.filter.gametype": "components/footer/filters/arcade/filter-gametype.controller",
        "footer.filter.year": "components/footer/filters/general/filter-year.controller",
        "footer.filter.decade": "components/footer/filters/general/filter-decade.controller",
        "gameitem.sm": "components/game/item/game-item-sm.controller",
        "gameitem.lg": "components/game/item/game-item-lg.controller",
        "gameitem.list": "components/game/list/game-list.controller",
        "search.input": "components/search-input/search-input.controller",
        "youtube.video": "components/youtube-video/youtube-video.controller",
        "dropdown.selector": "components/dropdown-selector/dropdown-selector.controller",
        "pages.search-view": "components/pages/search-view.controller",
        "pages.login-view": "components/pages/auth-login-view.controller",
        "pages.register-view": "components/pages/auth-register-view.controller",
        "amazons3.service": "components/services/amazons3.service",
        "gamesdb.service": "components/services/gamesdb.service",
        "romsync.service": "components/services/romsync.service",
        "trusted.filter": "components/filters/trusted.filter",
        "game.modal": "components/modals/game-modal.controller",
        "auth.intercepter.service": "components/services/auth.intercepter.service"
    }
});
require([
    "app.routes",
    "app.constants",
    "app.module",
    "header",
    "footer",
    "footer.filter.gametype",
    "footer.filter.year",
    "footer.filter.decade",
    "gameitem.sm",
    "gameitem.lg",
    "gameitem.list",
    "search.input",
    "youtube.video",
    "dropdown.selector",
    "pages.login-view",
    "pages.register-view",
    "pages.search-view",
    "amazons3.service",
    "gamesdb.service",
    "romsync.service",
    "trusted.filter",
    "game.modal",
    "auth.intercepter.service"
], function(){
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app.module']);
        $(document).foundation('topbar', 'reflow');
        $(document).foundation();
    });
});
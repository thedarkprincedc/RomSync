(function() {
    'use strict';
    angular
        .module('app.module')
        .component('gameList', {
            templateUrl: '../components/game/list/game-list.template.html',
            controller: GameListController,
            controllerAs: 'vm',
            // bindings: {
            //     gamelist: '<',
            // }
        });

    GameListController.$inject = ['$rootScope', "amazonS3", "$http", "URIS", "$modal", "gamesdb", "romsync", "$state"];
    function GameListController($rootScope, amazonS3, $http, URIS, $modal, gamesdb, romsync, $state) {
        var vm = this;
        this.games = [];
        vm.currentSystem = null;
        vm.onItemClicked = onItemClicked;
        vm.onScrollNextPage = onScrollNextPage;
        vm.scrollDisabled = false;
        vm.scrollDistance = vm.scrollDistance || 0;
        vm.scrollPage = 0;
        vm.currentGameType = null;
        vm.lastGameType = null;
        $rootScope.$on("$stateChangeSuccess",function(event, next, current){
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        });

        ////////////////
        vm.$onInit = function() { 
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
                onScrollNextPage();
            });
        };
        vm.$onChanges = function(changesObj) {  };
        vm.$onDestroy = function() { };
        
        function onItemClicked(event, item){
            gamesdb.search({
                name: item.name,
                platform: vm.currentSystem.name
            }).then(function(response){
                angular.extend(item, response);
            });
            $modal.open({
                templateUrl: "../components/modals/game-modal.template.html",
                controller: "gameModal",
                controllerAs: "vm",
                resolve: {
                    item: function(){
                        return item;
                    }
                }
            });
        }
        function onScrollNextPage(){
            // if(!vm.scrollDisabled){
            //     vm.scrollDisabled = true;'
                var params = {
                    page: vm.scrollPage,
                    limit: 50,
                    system: vm.currentSystem.code,
                    gameType: $state.params.gameType
                };
                
                $http({ 
                    url: URIS.GAME_SEARCH_URL,
                    params: params
                }).then(function(response){
                    response.data.map(function(value){
                        debugger;
                        value.imageurl = amazonS3.getImage(value.filename);
                        return value;
                    }).forEach(element => {
                        vm.games.push(element);
                    });
                    vm.scrollDisabled = false;
                });
                vm.scrollPage++;
            // }
        }
    }
})();
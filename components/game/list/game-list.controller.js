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

    GameListController.$inject = ['$scope', "amazonS3", "$http", "URIS", "$modal", "gamesdb", "romsync"];
    function GameListController($scope, amazonS3, $http, URIS, $modal, gamesdb, romsync) {
        var vm = this;
        this.games = [];
        vm.currentSystem = null;
        vm.onItemClicked = onItemClicked;
        vm.onScrollNextPage = onScrollNextPage;
        vm.scrollDisabled = false;
        vm.scrollDistance = vm.scrollDistance || 2;
        vm.scrollPage = 0;
        // vm.gamelistUpdated = gamelistUpdated;
        $scope.$on("$stateChangeSuccess",function(event, next, current){
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
            })
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
            if(!vm.scrollDisabled){
                vm.scrollDisabled = true;
                var params = {
                    page: vm.scrollPage,
                    limit: 25,
                    system: vm.currentSystem.code
                };
                
                $http({ 
                    url: URIS.GAME_SEARCH_URL,
                    params: params
                }).then(function(response){
                    vm.games = response.data.map(function(value){
                        value.imageurl = amazonS3.getImage(value.filename);
                        return value;
                    });
                });
                vm. scrollPage++;
            }
           
        }
        // function onClickGameItem(game){
        //     $rootScope.$broadcast("ON_GAME_SELECTED", {game: game});
        // }
        // function nextPage(){
        //     if(!vm.scrollDisabled){
        //         vm.scrollDisabled = true;
        //         $rootScope.$broadcast("ON_GAMELIST_UPDATE", { 
        //             append: true,  
        //             system: null,
        //             onUpdateComplete:  vm.gamelistUpdated
        //         });
        //     }
        // }
        // function gamelistUpdated(){
        //     vm.scrollDisabled = false;
        // }
    }
})();
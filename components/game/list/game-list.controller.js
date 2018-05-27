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

    GameListController.$inject = ['$scope', "amazonS3", "$http", "URIS", "$modal", "gamesdb"];
    function GameListController($scope, amazonS3, $http, URIS, $modal, gamesdb) {
        var vm = this;
        this.games = [];
        vm.onItemClicked = onItemClicked;
        vm.onScrollNextPage = onScrollNextPage;
        vm.scrollDisabled = false;
        vm.scrollDistance = vm.scrollDistance || 2;
        vm.scrollPage = 0;
        // vm.gamelistUpdated = gamelistUpdated;
        ////////////////

        vm.$onInit = function() { 
            onScrollNextPage();
            // $http.get(URIS.GAME_SEARCH_URL).then(function(response){
            //     vm.games = response.data.map(function(value){
            //         value.imageurl = amazonS3.getImage(value.filename);
            //         return value;
            //     });
            // });
        };
        vm.$onChanges = function(changesObj) {  };
        vm.$onDestroy = function() { };
        
        function onItemClicked(event, item){
            //item.platform
            gamesdb.search({
                name: item.name,
                platform: "arcade"
            }).then(function(response){
                angular.extend(item, response);
            })
            $modal.open({
                templateUrl: "../components/modals/game-modal.template.html",
                controller: GameModelController,
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
                    system: "arcade"
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
    GameModelController.$inject = ['item'];
    function GameModelController(item) {
       
        var vm = this;
        vm.item = item;
        // ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
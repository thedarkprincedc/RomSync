(function () {
    'use strict';
    angular
        .module('app.module')
        .component('searchInput', {
            templateUrl: "../components/search-input/search-input.template.html",
            controller: SearchInputController,
            controllerAs: 'vm',
            bindings: {
                placeholder: "<",
                typeaheadWaitTime: "<"
            }
        });

    SearchInputController.$inject = ['$scope', 'URIS', '$http', 'romsync'];
    function SearchInputController($scope, URIS, $http, romsync) {
        var vm = this;
        vm.typeaheadWaitTime = vm.typeaheadWaitTime || 450;
        vm.placeholder = vm.placeholder || "";
        vm.onSelectChange = onSelectChange;
        vm.getItemList = getItemList;

        vm.currentSystem = null;
        $scope.$on("$stateChangeSuccess",function(event, next, current){
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        });
        //////////////
        vm.$onInit = () => { 
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        function onSelectChange(value) {
        
        }
        function getItemList(value){
            return $http({
                method: "GET",
                url: URIS.GAME_SEARCH_URL,
                params: value
            }).then(function(response){
                response.data.unshift({name: value.q});
                return response.data;
            });
        }
        // vm.loadingLocations;
        // vm.selected = "";
        // vm.gamelist = [];
        // vm.onSelectChange = onSelectChange;
        // vm.getItemList = getItemList;
      

        // function onSelectChange(value) {
        //     $rootScope.$broadcast("ON_GAME_SELECTED", {
        //         game: value,
        //         onCloseModal: (function(){
        //             vm.selected = "";
        //         })
        //     });
        // }
        // function getItemList(value){
        //     return gameService.search({
        //         query: value.value
        //     }).then(function(response){
        //         response.data.games.unshift({name: value.value});
        //         var oldSystem = "";
        //         var newArray = [];
        //         _.each(response.data.games, function(value){
        //             if(value.system !== oldSystem){
        //                 newArray.push({name: value.system, isGroup: true});
        //             }
        //             oldSystem = value.system;
        //             newArray.push(value);
        //         })
        //         debugger;
                
        //         return newArray;
        //     });
        // }
    }
})();
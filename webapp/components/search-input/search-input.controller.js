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

    SearchInputController.$inject = ['$scope', 'URIS', '$http', 'romsync', '$state', '$modal'];
    function SearchInputController($scope, URIS, $http, romsync, $state, $modal) {
        var vm = this;
        vm.typeaheadWaitTime = vm.typeaheadWaitTime;
        vm.placeholder = vm.placeholder || "";
        vm.selected = [];
        //vm.getItemList = getItemList;

        vm.currentSystem = null;
        $scope.$on("$stateChangeSuccess",function(event, next, current){
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        });
        //////////////
        vm.$onInit = onInit;
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        vm.onSelectChange = onSelectChange;

        // vm.$onInit = () => { 
        //     // romsync.getPlatformType().then(function(response){
        //     //     vm.currentSystem = response;
        //     // });
        // };
       
        vm.onSearchTypeAhead = onSearchTypeAhead;
        function onInit(){ }
        function onSearchTypeAhead(search, system){
            return $http({
                method: "GET",
                url: URIS.GAME_SEARCH_URL,
                params: {
                    q: search
                }
            }).then(function(response){
                // var games = [];
                // angular.forEach(response.data, function(item){
                //     games.push(item.name);
                // });
                // debugger;
                //response.data.unshift({id: "0", name: search});
                return response;
            });
            
           
        }
        function onSelectChange(selectedItem) {

        }
        // function onSelectChange(item) {
        //     $state.go("index", {name: item.name});
        //     var modalInstance = $modal.open({
        //         templateUrl: "../components/modals/game-modal.template.html",
        //         controller: "gameModal",
        //         controllerAs: "vm",
        //         resolve: {
        //             item: function(){
        //                 return item;
        //             }
        //         }
        //     });
        //     modalInstance.result.then(function (selectedItem) {
        //         $state.go("index", {name: null});
        //         vm.selected = "";
        //     }, function () {
        //         // $state.go("index", {name: null});
        //         // vm.selected = "";
        //     });
        // }
        // function getItemList(value){
        //     // return $http({
        //     //     method: "GET",
        //     //     url: URIS.GAME_SEARCH_URL,
        //     //     params: value
        //     // }).then(function(response){
        //     //     response.data.unshift({name: value.q});
        //     //     return response.data;
        //     // });
        // }
    }
})();
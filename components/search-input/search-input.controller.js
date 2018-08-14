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
        function onSearchTypeAhead(searchValue, system){
            var params = {
                q: searchValue
            };
            return $http({
                method: "GET",
                url: URIS.GAME_SEARCH_URL,
                params: params
            });
            //.then(function(response){
                        //     response.data.unshift({name: value.q});
                        //     return response.data;
                        // });
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
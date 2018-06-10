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
        function onSelectChange(item) {

            $state.go("index", {name: value.name});
            gamesdb.search({
                name: item.name,
                platform: vm.currentSystem.name
            }).then(function(response){
                angular.extend(item, response);
            });
          
            var modalInstance = $modal.open({
                templateUrl: "../components/modals/game-modal.template.html",
                controller: "gameModal",
                controllerAs: "vm",
                resolve: {
                    item: function(){
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $state.go("index", {name: null});
                //$ctrl.selected = selectedItem;
            }, function () {
                //$log.info('modal-component dismissed at: ' + new Date());
            });
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
    }
})();
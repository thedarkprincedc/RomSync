(function() {
    'use strict';
    angular
        .module('app.module')
        .component('dropdownSelector', {
            templateUrl: '../components/dropdown-selector/dropdown-selector.template.html',
            controller: DropdownSelectorController,
            controllerAs: 'vm'
        });

    DropdownSelectorController.$inject = ['$rootScope','$scope', '$http', '$location', 'URIS', '$state', 'romsync'];
    function DropdownSelectorController($rootScope, $scope, $http, $location, URIS, $state, romsync) {
        var vm = this;
        vm.systems = [];
        vm.currentSystem = null;
        vm.onSelectSystem = onSelectSystem;
        
        $scope.$on("$stateChangeSuccess",function(event, next, current){
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        });
        //////////////
        vm.$onInit = () => {    
            romsync.getPlatformType().then(function(response){
                vm.systems = romsync.systems;
                vm.currentSystem = response;
            });
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        function onSelectSystem(event, system){
            var url = ["system", system.code].join("/");
            $location.path(url);
        }
    }
})();
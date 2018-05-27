(function() {
    'use strict';
    angular
        .module('app.module')
        .component('dropdownSelector', {
            templateUrl: '../components/dropdown-selector/dropdown-selector.template.html',
            controller: DropdownSelectorController,
            controllerAs: 'vm'
        });

    DropdownSelectorController.$inject = ['$rootScope','$scope', '$http', '$location', 'URIS'];
    function DropdownSelectorController($rootScope, $scope, $http, $location, URIS) {
        var vm = this;
        vm.systems = [];
        vm.currentSystem = null;
        vm.onSelectSystem = onSelectSystem;
        $scope.$on("$locationChangeStart",function(event, next, current){
            return true;
        });
        $scope.$on("$locationChangeSuccess",function(event, next, current){
            var locationArr = $location.$$path.split("/");
            var code = locationArr[locationArr.length-1];
            var systemObject = null;
            if(systemObject = findSystemByCode(code)){
                vm.currentSystem = systemObject;
            }
            return false;
        });
        $rootScope.$on('$viewContentLoaded', function(event){ 
            debugger; 
        });
        //////////////
        vm.$onInit = () => {    
            $http({ url: URIS.GAME_SYSTEM_URL })
                .then(function(response){
                    vm.systems = response.data;
            });
            
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        function onSelectSystem(event, system){
            var url = ["system", system.code].join("/");
            $location.path(url);
        }
        function findSystemByCode(code){
            return vm.systems.filter(function(value){
                return value.code == code;
            })[0];
        }
    }
})();
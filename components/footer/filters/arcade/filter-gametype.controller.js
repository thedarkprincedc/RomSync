(function() {
    'use strict';
    angular
        .module('app.module')
        .component('gametypeFilter', {
            templateUrl: '../components/footer/filters/arcade/filter-gametype.template.html',
            controller: FilterGametypeController,
            controllerAs: 'vm',
            bindings: {
            }
        });

    FilterGametypeController.$inject = ['$scope', '$state'];
    function FilterGametypeController($scope, $state) {
        var vm = this;
        vm.gametypes = [
            {
                name: 'All',
                code: '' 
            }, 
            {
                name: 'Primary',
                code: 'primary'
            }, 
            {
                name: 'Clones',
                code: "clones"
            }
        ];
        vm.onSystemItemClicked = onSystemItemClicked;
        $scope.$on("$stateChangeSuccess", function(event, next, current){
            debugger;
        });

        function onSystemItemClicked(item){
            _.each(vm.gametypes, function(value){ 
                value.active = false; 
            });
            item.active = true;
            $state.go("index", {gameType: item.code});
        }
        //////////////////
        vm.$onInit = function() {

            if($state.params.gameType == null){
                vm.gametypes[0].active = true;
                return;
            }
            vm.gametypes = vm.gametypes.map(function(value){
                value.active = false;
                if(value.name.toLocaleLowerCase() == $state.params.gameType){
                    value.active = true;
                } 
                return value;
            })
        }
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
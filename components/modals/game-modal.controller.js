(function(){
    angular
        .module('app.module')
        .controller("gameModal",GameModelController)
    GameModelController.$inject = ['$scope','item', '$uibModalInstance'];
    function GameModelController($scope, item, $uibModalInstance) {
        var vm = this;
        vm.item = item;
        vm.close = function(){
            $uibModalInstance.close(vm.item);
        }
        // ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
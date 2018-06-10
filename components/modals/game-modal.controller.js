(function(){
    angular
        .module('app.module')
        .controller("gameModal",GameModelController)
    GameModelController.$inject = ['$scope','item', '$modalInstance'];
    function GameModelController($scope, item, $modalInstance) {
        var vm = this;
        vm.item = item;
        vm.close = function(){
            $modalInstance.close(vm.item);
        }
        // ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
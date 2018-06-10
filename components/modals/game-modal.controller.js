(function(){
    angular
        .module('app.module')
        .controller("gameModal",GameModelController)
    GameModelController.$inject = ['$scope','item', '$modalInstance'];
    function GameModelController($scope, item, $modalInstance) {
        var vm = this;
        vm.item = item;
        vm.close = close;
        
        // ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        function close(){
            $modalInstance.close(vm.item);
        }
    }
})();
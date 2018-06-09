(function(){
    angular
        .module('app.module')
        .controller("gameModal",GameModelController)
    GameModelController.$inject = ['$scope','item'];
    function GameModelController($scope, item) {
        var vm = this;
        vm.item = item;
        vm.close = function(){
   
        }
        // ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
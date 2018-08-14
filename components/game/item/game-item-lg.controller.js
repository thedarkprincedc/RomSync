(function() {
    'use strict';
    angular
        .module('app.module')
        .component('gameItemLg', {
            templateUrl: '../components/game/item/game-item-lg.template.html',
            controller: GameItemLargeController,
            controllerAs: 'vm',
            bindings: {
                item : '='
            },
        });

    GameItemLargeController.$inject = ['romsync'];
    function GameItemLargeController(romsync) {
        var vm = this;
        vm.syncDevice = function(item){
            debugger;
            romsync.syncWithDevice({
                id: item.id,
                deviceId: "all"
            }).then(function(response){
                debugger;
            });
        }
        ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
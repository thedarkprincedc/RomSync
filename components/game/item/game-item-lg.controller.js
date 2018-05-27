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

    GameItemLargeController.$inject = [];
    function GameItemLargeController() {
        var vm = this;

        ////////////////
        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
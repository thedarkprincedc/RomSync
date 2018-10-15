(function() {
    'use strict';
    angular
        .module('app.module')
        .component('gameItemSm', {
            templateUrl: '../components/game/item/game-item-sm.template.html',
            controller: GameItemSmallController,
            controllerAs: 'vm',
            bindings: {
                item : '='
            },
        });

    GameItemSmallController.$inject = [];
    function GameItemSmallController() {
        var vm = this;
        //amazonS3, syncService
        // vm.isGameChecked = false;
        // vm.onGameChecked = onGameChecked;
        // vm.isGameMouseOvered = isGameMouseOvered;

        // ////////////////
        vm.$onInit = function() { 
            //this.game.imageurl = amazon.getImage(this.item.filename);   
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        // function onGameChecked(event, game){
        //     event.stopPropagation();
        //     vm.isGameChecked = !vm.isGameChecked;
        //     syncService.add(game);
        // }
        // function isGameMouseOvered(event, state){
            
        //     vm.hover = state;
        // }
    }
})();
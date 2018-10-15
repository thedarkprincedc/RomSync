(function() {
    'use strict';
    angular
        .module('app.module')
        .component('filterDecades', {
            templateUrl: '../components/footer/filters/general/filter-decades.template.html',
            controller: FilterDecadeController,
            controllerAs: 'vm',
            bindings: {
            },
        });

    FilterDecadeController.$inject = ['$scope', '$http', 'URIS'];
    function FilterDecadeController($scope, $http, URIS) {
        var vm = this;
        vm.title = "Decades";
        vm.decades = [];
        //////////////////
        vm.$onInit = function() { 
            $http({
                url: URIS.GAME_DECADES_URL,
                method: "GET"
            }).then(function(response){
                vm.decades = response.data;
            });
        }
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
});
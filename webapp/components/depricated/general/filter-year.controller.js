(function() {
    'use strict';
    angular
        .module('app.module')
        .component('filterYear', {
            templateUrl: '../components/footer/filters/general/filter-year.template.html',
            controller: FilterYearController,
            controllerAs: 'vm',
            bindings: {}
        });

    FilterYearController.$inject = ['$scope', '$http', 'URIS', '$state'];
    function FilterYearController($scope, $http, URIS, $state) {
        var vm = this;
        vm.title = "Years";
        vm.years = [];
        vm.onClickYear = onClickYear;
        //////////////////
        vm.$onInit = function() { 
            $http({
                url: URIS.GAME_YEARS_URL,
                method: "GET"
            }).then(function(response){
                vm.years = response.data;
            });
        }
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        function onClickYear(event, item){
            $state.go("index", {year: item})
        }
    }
})();
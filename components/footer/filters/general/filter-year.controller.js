(function() {
    'use strict';
    angular
        .module('app.module')
        .component('filterYear', {
            templateUrl: '../components/footer/filters/general/filter-year.template.html',
            controller: FilterYearController,
            controllerAs: 'vm',
            bindings: {
                startYear: '<',
                typeName: '<'
            },
        });

    FilterYearController.$inject = ['$scope', '$http', 'URIS'];
    function FilterYearController($scope, $http, URIS) {
        var vm = this;
        vm.title = "Years";
        vm.years = [];
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

        // vm.typeName = vm.typeName || "years";
        // vm.startYear = vm.startYear || 1977;
        // vm.yearlist = [];
        // vm.onClickYear = onClickYear;
        // $scope.$on("on_search_year", onSearchYear)
        // ////////////////
        // vm.$onInit = function() { 
        //     if(vm.typeName == "decade"){
        //         vm.title = "Decade";
        //         vm.startYear = 1970;
        //         var today = new Date();
        //         var i = vm.startYear;
        //         while(i < today.getFullYear()){
        //             vm.yearlist.push({
        //                 text: i
        //             });
        //             i=i+10;
        //         }
        //     } else{
        //         vm.title = "Years";
        //         var today = new Date();
        //         for(var i = vm.startYear; i < today.getFullYear(); i++){
        //             vm.yearlist.push({
        //                 text: i
        //             });
        //         }
        //     }
        //     vm.yearlist.unshift({text: "All"});
        // };
        // vm.$onChanges = function(changesObj) { };
        // vm.$onDestroy = function() { };
        // function onSearchYear(event, data){
        //     if(vm.lastActiveItem){
        //         if(data.type && data.type !== vm.typeName){
        //             if(vm.lastActiveItem.type != data.type){
        //                 vm.lastActiveItem.active = false;
        //             }
        //         }
        //     }
        // }
        // function onClickYear(item, type){
        //     if(vm.lastActiveItem){
        //         vm.lastActiveItem.active = false;
        //     }
        //     item.active = true;
        //     vm.lastActiveItem = item;
        //     $rootScope.$broadcast(SEARCH_EVENTS.SEARCH_BY_YEAR,{
        //         item: item,
        //         type: type
        //     });
        // }
    }
})();
(function() {
    'use strict';
    angular
        .module('app.module')
        .component('header', {
            templateUrl: '../components/header/header.template.html',
            controller: HeaderController,
            controllerAs: 'vm'
        });

    HeaderController.$inject = ['$rootScope', 'romsync'];
    function HeaderController($rootScope, romsync) {
        var vm = this;
        function onErrorCallback(response){
            alert("Error: "+ response.data);
        }
        function onSuccessCallback(response){
            return response.data;
        }
        function onSearchTypeAhead(search){
            return romsync.search({
                name: search, platform: vm.selectedPlatform
            }).then(onSuccessCallback, onErrorCallback);
        }
        function onSelectChange(selectedItem){
            console.log(selectedItem);
            //****************/
            vm.selected = null;
        }
        function getPlatforms(){
            return romsync.platforms().then(onSuccessCallback, onErrorCallback)
        }
        function onSelectPlatform(platform){
            vm.selectedPlatform = platform;
        }
        //////////////
        vm.$onInit = () => {    
            vm.waitTime = 1200;
            vm.minLength = 3;
            vm.placeholder = "Search for games";
            romsync.platforms().then(function(response){
                vm.platforms = response.data;
                vm.selectedPlatform = response.data[0];
            }, onErrorCallback);
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        vm.onSearchTypeAhead = onSearchTypeAhead;
        vm.onSelectChange = onSelectChange;
        vm.getPlatforms = getPlatforms;
        vm.onSelectPlatform = onSelectPlatform;
    }
})();
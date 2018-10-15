(function () {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['$modal', 'romsync'];

    function SearchViewController($modal, romsync) {
        var vm = this;
        function open(item, data) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: function($modalInstance, item){
                    var vm = this;
                    vm.item = item;
                    vm.close = function(){
                        $modalInstance.close({item: vm.item});
                    }
                },
                controllerAs: 'vm',
                resolve: {
                    item: function () {
                        return $.extend(item, data);
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        function onClickGameItem(item) {
            romsync.searchGamesDB().then(function(response){
                open(item, response.data);
            }, function(error){

            }) 
        }
        vm.results = romsync.results;
        vm.onClickGameItem = onClickGameItem;
        activate();

       
        ////////////////

        function activate() {}
    }
})();
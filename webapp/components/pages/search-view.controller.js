(function () {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['$modal', 'romsync'];

    function SearchViewController($modal, romsync) {
        var vm = this;
        function open(item) {
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
                        item.youtubeurl = "fjirjrni"
                        item.overview = "fojmrijmrijnijnrijnijnr";
                        return item;
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
            open(item);
        }
        vm.results = romsync.results;
        vm.onClickGameItem = onClickGameItem;
        activate();

       
        ////////////////

        function activate() {}
    }
})();
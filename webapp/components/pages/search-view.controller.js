(function () {
    'use strict';
    angular
        .module('app.module')
        .controller('SearchView', SearchViewController);

    SearchViewController.$inject = ['$scope', '$modal', 'romsync'];

    function SearchViewController($scope, $modal, romsync) {
        var vm = this;
        $scope.$on("searchResultClicked", function(event, data){
        
            romsync.searchGamesDB().then(function(response){
                open(data, response.data);
            })
            debugger;
        })
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
                // check if sync then add to list
            }, function () {
                // check if sync then add to list
                //alert("jnijnijnijnijn")
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
(function() {
    'use strict';
    angular
        .module('app.module')
        .component('footer', {
            templateUrl: '../components/footer/footer.template.html',
            controller: FooterController,
            controllerAs: 'vm',
            bindings: {
            }
        });

    FooterController.$inject = ['$anchorScroll', '$element', '$scope', 'romsync'];
    function FooterController($anchorScroll, $element, $scope, romsync) {
        var vm = this;
        vm.toggleMore = toggleMore;
        vm.onClickScrollToTop = onScrollToTopClicked;
        vm.isMoreOpen = false;
        vm.currentSystem = null;
        //////////////
        function toggleMore(){
            vm.isMoreOpen = !vm.isMoreOpen;
            if(vm.isMoreOpen){
                $element.find(".rs-footer").addClass("open-more");
            } else{
                $element.find(".rs-footer").removeClass("open-more");
            }
        }
        function onScrollToTopClicked(){
            $anchorScroll();
        }
        $scope.$on("$stateChangeSuccess",function(event, next, current){
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        });
        vm.$onInit = () => {    
            romsync.getPlatformType().then(function(response){
                vm.currentSystem = response;
            });
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();
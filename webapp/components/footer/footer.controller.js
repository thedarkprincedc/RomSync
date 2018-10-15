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

    FooterController.$inject = ['$anchorScroll', '$element', '$scope', 'romsync','CONFIG'];
    function FooterController($anchorScroll, $element, $scope, romsync, CONFIG) {
        var vm = this;
        function onClickMore(){
            $element.find(".rs-footer").toggleClass("open-more");
        }
        function onScrollToTopClicked(){
            $anchorScroll();
        }
        function onClickYear(event){
            vm.selectedYear = event.currentTarget.innerText;
        }
        //////////////
        vm.$onInit = () => {
            vm.isMoreOpen = false;  
            vm.selected = romsync.selected;
            vm.years = CONFIG.years.reverse();
            vm.selectedYear = null;
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        vm.toggleMore = onClickMore;
        vm.onClickScrollToTop = onScrollToTopClicked;
        vm.onClickYear =onClickYear;
    }
})();
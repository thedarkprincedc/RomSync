(function() {
    'use strict';
    angular
        .module('app.module')
        .component('youtubeVideo', {
            templateUrl: '../components/youtube-video/youtube-video.template.html',
            controller: YoutubeVideoController,
            controllerAs: 'vm',
            bindings: {
                // src: "<",
                // height: "<",
                // width: "<"
            },
        });

    YoutubeVideoController.$inject = [];
    function YoutubeVideoController() {
        var vm = this;
        vm.height = vm.height || "350px";
        vm.width = vm.width || "100%"
        
    //     var defaultStyle = {
    //         "background-color": "black",
    //         "background-image": "url('css/default.svg')",
    //         "background-position": "center center",
    //         "background-repeat": "no-repeat",
    //         "background-size": "auto"
    //    };
    //    var vm = this;
    //    vm.isLoading = false;
    //    vm.allowfullscreen = true;
    //    vm.height = vm.height || "350px";
    //    vm.width = vm.width || "100%"
    //    vm.style = defaultStyle;
  
    //    function toggleLoading(){
    //         vm.style["background-image"] = (vm.style["background-image"]!==null)?"null" : "url('css/default.svg')";
    //    }
        

        ////////////////

        vm.$onInit = function() { };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
    }
})();

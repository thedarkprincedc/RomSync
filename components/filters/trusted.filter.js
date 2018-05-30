(function() {
    'use strict';
    angular
        .module('app.module')
        .filter('trusted', ['$sce', function ($sce) {
            return function (url) {
              return $sce.trustAsResourceUrl(url);
            }
        }]
    );
})();
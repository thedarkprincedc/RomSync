(function() {
    'use strict';
    angular
        .module('app.module')
        .service('amazonS3', AmazonS3Service);

    AmazonS3Service.$inject = [];
    function AmazonS3Service() {
        var service = {};
        service.getImage = getImage;
        return service;

        function getImage(name){
            //return URIS.AMAZON_S3_BUCKET_URL + name + ".png";
        }
        function getFilename(name){
            //return URIS.AMAZON_S3_BUCKET_URL + name + ".png";
        }
    }
})();
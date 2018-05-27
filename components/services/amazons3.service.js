(function() {
    'use strict';
    angular
        .module('app.module')
        .service('amazonS3', AmazonS3Service);

    AmazonS3Service.$inject = ['URIS'];
    function AmazonS3Service(URIS) {
        var service = {};
        service.getImage = getImage;
        return service;

        function getImage(name){
            return URIS.AMAZON_S3_BUCKET_URL + name + ".png";
        }
        function getFilename(name){
            return URIS.AMAZON_S3_BUCKET_URL + name + ".png";
        }
    }
})();
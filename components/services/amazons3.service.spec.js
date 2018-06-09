describe('AmazonS3 Service', function() {
    var amazonS3;

    beforeEach(angular.mock.module('app.module','app.routes'));
    beforeEach(inject(function(_amazonS3_) {
        amazonS3 = _amazonS3_;
    }));
    describe('.getImage()', function() {
        it('has a dummy spec to test tech ', function() {
            var s3ImagePath = amazonS3.getImage("tech");
            expect(s3ImagePath).toEqual("https://s3-us-west-2.amazonaws.com/media.thedarkprincedc.com/images/tech.png");
        });
    });
});
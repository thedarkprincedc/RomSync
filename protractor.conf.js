const {SpecReporter} = require('jasmine-spec-reporter');
exports.config = {
    //framework: "jasmine2",
    baseUrl: "./",
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./test/integration/*.spec.js'],
    capabilities: {
        browserName: 'firefox'
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
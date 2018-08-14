'use strict';

module.exports = {
    go: function(){
        browser.get('http://localhost:3000');
        browser.waitForAngular();  
    },
    homePageTitle: function() { return browser.getTitle(); },
    topBar: function(){ return element.all(by.css(".top-bar")); },
    searchBar: function(){ return element.all(by.css(".searchbox")); },
    sendSearchText: function(text){ return element(by.model('vm.selected')).sendKeys(text); },
    isSearchMenuVisible: function(){

    }
}

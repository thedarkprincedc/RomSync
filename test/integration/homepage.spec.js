var RomsyncPage = require('../integration/romsync.page.js');

describe('Romsync homepage', function () {
  RomsyncPage.go();
  beforeEach(function () {
  });
  it('should have a title', function () {
    expect(RomsyncPage.homePageTitle()).toEqual('RomSync2 - Rom Web Management Tool');
  });
  it('should have a top menu bar', function () {
    expect(RomsyncPage.topBar().count());
  });
  it("should have a search", function () {
    expect(RomsyncPage.searchBar().count());
    RomsyncPage.sendSearchText("Samurai Showdown");
    
    // search menu should show up
    // search item is click able and shows a modal with the game in it
    // close the search menut
  })
  // it("should have games visible", function () {
  //   element.all(by.css(".gameItem")).then(function(value){
  //     console.log(value.count());
  //     // count the number of games visible
  //     // click on a game and show modal
  //     // is box art visible 
  //     // is 
  // });
  //})
});
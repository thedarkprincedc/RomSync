(function(){
    function getJSONMockData(url){
        return (function(method, url, data){
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send(null);
            return [request.status, request.response, {}];
        });
    }
})();
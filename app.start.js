(function(window){
    window.__env = {
        apiUrl : 'http://localhost:8080'
    }
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app.module']);
        $(document).foundation('topbar', 'reflow');
        $(document).foundation();
    });
})(this);
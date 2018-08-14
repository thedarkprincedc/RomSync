(function() {
    'use strict';
    angular
        .module('app.module')
        .controller('SyncView', SyncViewController);

    SyncViewController.$inject = ['$http', 'URIS'];
    function SyncViewController($http, URIS) {
        var vm = this;

        var columnDefs = [
            {headerName: "Device ID", field: "make"},
            {headerName: "Time", field: "model"},
            {headerName: "Type", field: "price"},
            {headerName: "Username", field: "price"}
        ];
        var rowData = [];
        // var rowData = [
        //     {make: "Toyota", model: "Celica", price: 35000},
        //     {make: "Ford", model: "Mondeo", price: 32000},
        //     {make: "Porsche", model: "Boxter", price: 72000}
        // ];
  
        $http({
            method: "GET",
            url: URIS.GAME_GET_SYNC_DATA_URL,
            params: {
                deviceId: 0
            }
        }).then(function(response){
            vm.gridOptions.api.setRowData(response.data);
            vm.gridOptions.api.sizeColumnsToFit();
        });
        vm.gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData
        };
        activate();
        
        ////////////////

        function activate() { }
    }
})();
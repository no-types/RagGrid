HTMLWidgets.widget({

  name: 'RagGrid',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {
         const data=x.data;
         let defaultGridOptions={
            rowSelection: 'multiple',
            enableSorting: true,
            enableFilter: true,
            groupMultiAutoColumn: true,
            groupSuppressAutoColumn: true,
            enableStatusBar: true,
            alwaysShowStatusBar: false, // status bar can be be fixed
            enableRangeSelection: false,
            enableColResize: true,
            pagination: true,
            paginationAutoPageSize: true,
         }

         let gridOptions=Object.assign(defaultGridOptions,x.gridOptions);
         const rowHeaders = Object.keys(data);
         if(rowHeaders.length==0){
           return;
         }
         const rowLength = data[rowHeaders[0]].length;
         const colDef = rowHeaders.map((headerName)=>{
           return {'field':headerName,enableValue:x.isNumeric[headerName],enableRowGroup:!x.isNumeric[headerName],enablePivot:!x.isNumeric[headerName]};
         });
         let rowDataList=[];
         for(let rowIndex=0;rowIndex<rowLength;rowIndex++){
            let rowData = {};
            rowHeaders.forEach((headerName)=>{
                rowData[headerName] = data[headerName][rowIndex];
            });
            rowDataList.push(rowData);
         }
         if(x.licenseKey){
          agGrid.LicenseManager.setLicenseKey(x.licenseKey);
         }
         gridOptions.columnDefs=colDef;
         gridOptions.rowData=rowDataList;

        el.setAttribute("class","ag-theme-balham");
        new agGrid.Grid(el, gridOptions);
        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});

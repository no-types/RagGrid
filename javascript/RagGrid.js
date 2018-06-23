HTMLWidgets.widget({

    name: 'RagGrid',

    type: 'output',

    factory: function(el, width, height) {
        let gridOptions = {};
        let filteredValues=[];
        let isFilterOnSelect=true;
        // TODO: define shared variables for this instance
        const sel_handle = new crosstalk.SelectionHandle();
        const filter_handle = new crosstalk.FilterHandle();
        sel_handle.on("change", function(e) {
            if (e.sender !== sel_handle) {

                if(!isFilterOnSelect){
                    gridOptions.api.forEachNode((node) => {
                        if (node.data && node.data.ctKey && e.value.indexOf(node.data.ctKey) != -1) {
                            node.setSelected(true);
                        } else {
                            node.setSelected(false);
                        }
                    });
                }
             else{
                filteredValues=e.value;
                gridOptions.api.onFilterChanged();
             }
            }
        });
        filter_handle.on("change", function(e) {
            // scatter.filter(e.value);
            console.log(e);
        });
        return {

            renderValue: function(x) {
                if(document.location.search.indexOf("viewer_pane=1")!==-1 && navigator.platform==="Win32")
                {
                    var url=document.location.href.replace("viewer_pane=1","");
                    el.innerHTML="ag-grid uses CSS transform to position rows in the grid. It looks like your Rstudio Viewer Pane doesn't support this. <br>"
                    +`Open the <a href='${url}'>link</a> in other browser or use the Show in New Window button from the tools.`;
                    return;
                }
                
                const data = x.data;
                const colOpts = x.colOpts;
                const formattingOptions = x.formattingOptions;
                isFilterOnSelect = x.filterOnSelect;
                let defaultGridOptions = {
                    rowSelection: 'multiple',
                    enableSorting: true,
                    enableFilter: true,
                    enableRangeSelection: false,
                    enableColResize: true,
                    pagination: true,
                    paginationAutoPageSize: true,
                    gridAutoHeight:false,
                    onRowClicked: event => {
                        let selectionKeys = [];
                        gridOptions.api.getSelectedNodes().forEach(node => {
                            if (node.data && node.data.ctKey) {
                                selectionKeys.push(node.data.ctKey);
                            }
                        });
                        sel_handle.set(selectionKeys);
                    },
                    enableColResize: true,
                    onGridReady: function(params) {
                        params.api.sizeColumnsToFit();
                    }
                }

                if(x.rowHeaders){ // Copy the rownames header
                    x.data['rowHeaders'] = x.rowHeaders;
                }

                if (x.licenseKey) {
                    let enterpriseGridOptions = {
                        enableStatusBar: true,
                        alwaysShowStatusBar: false, // status bar can be be fixed
                        suppressDragLeaveHidesColumns: true,
                        suppressMakeColumnVisibleAfterUnGroup: true,
                        rowGroupPanelShow: "always"
                    }
                    defaultGridOptions = Object.assign(defaultGridOptions, enterpriseGridOptions);
                }

                if (x.settings.crosstalk_group) {
                    sel_handle.setGroup(x.settings.crosstalk_group);
                    filter_handle.setGroup(x.settings.crosstalk_group);
                }

                gridOptions = Object.assign(defaultGridOptions, x.gridOptions);
                const rowHeaders = Object.keys(data);
                if (rowHeaders.length == 0) {
                    return;
                }
                let fieldRowHeaderMap = {};
                rowHeaders.forEach((rowHeader) => {
                    fieldRowHeaderMap[rowHeader] = rowHeader.replace(".", "_");
                });
                const rowLength = data[rowHeaders[0]].length;
                const colDef = rowHeaders.map((rowHeader) => {
                    let options = {
                        'headerName': rowHeader,
                        'field': fieldRowHeaderMap[rowHeader],
                        enableValue: x.isNumeric[rowHeader]
                    };

                    if (x.isNumeric[rowHeader]) {
                        options.cellStyle = {
                            'text-align': 'right'
                        };
                        if(x.licenseKey){
                            options.aggFunc="sum";
                        }
                        options.valueFormatter = (params) => {
                            if(!params.value){
                                return null;
                            }
                            if(formattingOptions[rowHeader]){
                               return numeral(params.value).format(formattingOptions[rowHeader]);
                            }
                            return params.value;
                        }
                    }
                    
                    options = colOpts[rowHeader]?Object.assign(options,colOpts[rowHeader]):options;

                    let enterpriseColumnDefinitionOptions = x.licenseKey ? {
                        enableRowGroup: !x.isNumeric[rowHeader],
                        enablePivot: !x.isNumeric[rowHeader],
                    } : {};
                    return Object.assign(options, enterpriseColumnDefinitionOptions);
                });
                let rowDataList = [];
                for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                    let rowData = {};
                    rowHeaders.forEach((rowHeader) => {
                        rowData[fieldRowHeaderMap[rowHeader]] = data[rowHeader][rowIndex];
                    });
                    if (x.settings.crosstalk_key) {
                        rowData.ctKey = x.settings.crosstalk_key[rowIndex];
                    }
                    // console.log(rowData);
                    rowDataList.push(rowData);
                }
                if (x.licenseKey) {
                    agGrid.LicenseManager.setLicenseKey(x.licenseKey);
                }

                if(x.rowHeaders){
                    let rowHeaderColumnDef =colDef.pop();
                    rowHeaderColumnDef.headerName = ""; // There is no header name to be added.
                    rowHeaderColumnDef.enablePivot = false;
                    rowHeaderColumnDef.enableRowGroup  = false;
                    colDef.unshift(rowHeaderColumnDef);
                }

                gridOptions.columnDefs = colDef;
                gridOptions.rowData = rowDataList;
                gridOptions.isExternalFilterPresent = () => {return true;};
                gridOptions.doesExternalFilterPass = (node) => {
                    if(isFilterOnSelect && filteredValues.length!==0 && node.data && node.data.ctKey && filteredValues.indexOf(node.data.ctKey)===-1){
                        return false;
                    }
                    else{
                        return true;
                    }
                };
                //el.removeAttribute("style");
                //el.style.height = '';
                el.setAttribute("class", x.theme || "ag-theme-balham");
                new agGrid.Grid(el, gridOptions);
            },

            resize: function(width, height) {

                // TODO: code to re-render the widget with a new size

            }

        };
    }
});

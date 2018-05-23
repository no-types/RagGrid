HTMLWidgets.widget({

    name: 'RagGrid',

    type: 'output',

    factory: function(el, width, height) {
        let gridOptions = {};
        // TODO: define shared variables for this instance
        const sel_handle = new crosstalk.SelectionHandle();
        const filter_handle = new crosstalk.FilterHandle();
        sel_handle.on("change", function(e) {
            if (e.sender !== sel_handle) {
                // scatter.clearBrush(); 
                gridOptions.api.forEachNode((node) => {
                    if (node.data && node.data.ctKey && e.value.indexOf(node.data.ctKey) != -1) {
                        node.setSelected(true);
                    } else {
                        node.setSelected(false);
                    }
                });
            }

            console.log(e);
        });
        filter_handle.on("change", function(e) {
            // scatter.filter(e.value);
            console.log(e);
        });
        return {

            renderValue: function(x) {
                const data = x.data;
                const colOpts = x.colOpts;
                let defaultGridOptions = {
                    rowSelection: 'multiple',
                    enableSorting: true,
                    enableFilter: true,
                    groupMultiAutoColumn: true,
                    groupSuppressAutoColumn: true,
                    enableRangeSelection: false,
                    enableColResize: true,
                    pagination: true,
                    paginationAutoPageSize: true,
                    onRowClicked: event => {
                        let selectionKeys = [];
                        gridOptions.api.getSelectedNodes().forEach(node => {
                            if (node.data && node.data.ctKey) {
                                selectionKeys.push(node.data.ctKey);
                            }
                        });
                        sel_handle.set(selectionKeys);
                    }
                }

                if (x.licenseKey) {
                    let enterpriseGridOptions = {
                        enableStatusBar: true,
                        alwaysShowStatusBar: false, // status bar can be be fixed
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
                let filedRowHeaderMap = {};
                rowHeaders.forEach((rowHeader) => {
                    filedRowHeaderMap[rowHeader] = rowHeader.replace(".", "_");
                });
                const rowLength = data[rowHeaders[0]].length;
                const colDef = rowHeaders.map((rowHeader) => {
                    let options = {
                        'headerName': rowHeader,
                        'field': filedRowHeaderMap[rowHeader],
                        enableValue: x.isNumeric[rowHeader]
                    };

                    if (x.isNumeric[rowHeader]) {
                        options["cellStyle"] = {
                            'text-align': 'right'
                        };
                    }
                    
                    options = colOpts[rowHeader]?Object.assign(options,colOpts[rowHeader]):options;

                    let enterpriseColumnDefinitionOptions = x.licenseKey ? {
                        enableRowGroup: !x.isNumeric[rowHeader],
                        enablePivot: !x.isNumeric[rowHeader]
                    } : {};
                    return Object.assign(options, enterpriseColumnDefinitionOptions);
                });
                let rowDataList = [];
                for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                    let rowData = {};
                    rowHeaders.forEach((rowHeader) => {
                        rowData[filedRowHeaderMap[rowHeader]] = data[rowHeader][rowIndex];
                    });
                    if (x.settings.crosstalk_key) {
                        rowData.ctKey = x.settings.crosstalk_key[rowIndex];
                    }
                    rowDataList.push(rowData);
                }
                if (x.licenseKey) {
                    agGrid.LicenseManager.setLicenseKey(x.licenseKey);
                }
                gridOptions.columnDefs = colDef;
                gridOptions.rowData = rowDataList;

                el.setAttribute("class", "ag-theme-balham");
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

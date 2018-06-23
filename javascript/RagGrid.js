import {SparkLineUtils} from './SparkLineUtils';
import { AgGridUtil } from './AgGridUtil';
import { ErrorMessageUtils } from './ErrorMessageUtils';
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
            console.log(e);
        });
        return {

            renderValue: function(x) {                
                if(ErrorMessageUtils.checkWindowsViewerPane(el))
                    return;
                const licenseKey = x.licenseKey;
                const rowHeight = SparkLineUtils.transformData(x.data,x.sparkLineOptions);
                isFilterOnSelect = x.filterOnSelect;
                var defaultGridOptions = AgGridUtil.getDefaultGridOptions(rowHeight,sel_handle,licenseKey);
                
                if (x.settings.crosstalk_group) {
                    sel_handle.setGroup(x.settings.crosstalk_group);
                    filter_handle.setGroup(x.settings.crosstalk_group);
                }

                gridOptions = Object.assign(defaultGridOptions, x.gridOptions);
                let colDef = AgGridUtil.getColDef(x);
                if(x.rowHeaders){ 
                    x.data['rowHeaders'] = x.rowHeaders;
                }
                if (licenseKey) {
                    agGrid.LicenseManager.setLicenseKey(licenseKey);
                }
                
                gridOptions.columnDefs = colDef;
                gridOptions.rowData = AgGridUtil.getRowData(x.data,x.settings.crosstalk_key);
                gridOptions.isExternalFilterPresent = () => {return true;};
                gridOptions.doesExternalFilterPass = (node) => {
                    if(isFilterOnSelect && filteredValues.length!==0 && node.data && node.data.ctKey && filteredValues.indexOf(node.data.ctKey)===-1){
                        return false;
                    }
                    else{
                        return true;
                    }
                };

                el.setAttribute("class", x.theme || "ag-theme-balham");
                new agGrid.Grid(el, gridOptions);
            },

            resize: function(width, height) {

                // TODO: code to re-render the widget with a new size

            }

        };
    }
});

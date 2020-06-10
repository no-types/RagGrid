import {SparkLineUtils} from "./SparkLineUtils";
import { AgGridUtil } from "./AgGridUtil";
import { ErrorMessageUtils } from "./ErrorMessageUtils";
HTMLWidgets.widget({

    name: 'RagGrid',

    type: 'output',

    factory: function(el, width, height) {
        //console.log("local repo being used!");

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
            //console.log("change called")
            console.log(e);
        });
        return {

            renderValue: function(x) {
                //console.log("Starting to render")
                if(ErrorMessageUtils.checkWindowsViewerPane(el)){
                    return;
                }

                if (x === null)
                {
                    el.innerHTML = "&nbsp;";
                    return;
                }

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

                // note: we need to clear any existing element before building a new grid
                el.innerHTML = "";

                // note: we need to add a class here... but do not want to replace other classes - e.g shiny binding classes
                el.classList.add(x.theme || "ag-theme-balham");

                //console.log("returning new grid")
                new agGrid.Grid(el, gridOptions);
            },

            resize: function(width, height) {

                //console.log("resize called with " + width + " and " + height);
                el.height(height)

            }

        };
    }
});

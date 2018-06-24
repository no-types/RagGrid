import { FormattingUtils } from "./FormattingUtils";
import { SparkLineUtils } from "./SparkLineUtils";
export class AgGridUtil{
    static getDefaultGridOptions(rowHeight,selectionHandler,licenseKey){
        let defaultGridOptions = {
            rowSelection: "multiple",
            enableSorting: true,
            enableFilter: true,
            enableRangeSelection: false,
            enableColResize: true,
            pagination: true,
            paginationAutoPageSize: true,
            gridAutoHeight:false,
            rowHeight : rowHeight >0 ? rowHeight : null,
            onRowClicked: ({api}) => {
                let selectionKeys = [];
                api.getSelectedNodes().forEach((node) => {
                    if (node.data && node.data.ctKey) {
                        selectionKeys.push(node.data.ctKey);
                    }
                });
                selectionHandler.set(selectionKeys);
            },
            onGridReady: ({api}) => {
                    api.sizeColumnsToFit(); 
            }
        };
        return Object.assign(defaultGridOptions,AgGridUtil.getEnterpriseOptions(licenseKey));
    }
    static getEnterpriseOptions(licenseKey){
        if(licenseKey)
        return {
            enableStatusBar: true,
            alwaysShowStatusBar: false, // status bar can be be fixed
            suppressDragLeaveHidesColumns: true,
            suppressMakeColumnVisibleAfterUnGroup: true,
            rowGroupPanelShow: "always"
        };
        return {};
    }
    static getRowData(data,crosstalkKey){
        const columnHeaders = Object.keys(data);
        const rowLength = data[columnHeaders[0]].length;
        let rowDataList = [];
                for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                    let rowData = {};
                    columnHeaders.forEach((columnHeader) => {
                        let fieldName = AgGridUtil.escape(columnHeader);
                        rowData[fieldName] = data[columnHeader][rowIndex];
                    });
                    if (crosstalkKey) {
                        rowData.ctKey = crosstalkKey[rowIndex];
                    }
                    rowDataList.push(rowData);
                }
        return rowDataList;
    }

    static getColDef({data,isNumeric,sparkLineOptions,licenseKey,colOpts,formattingOptions,rowHeaders}){
        const columnHeaders = Object.keys(data);
      
        let colDef = columnHeaders.map((columnHeader) => {
            const isColNumeric = isNumeric[columnHeader];
            let options = {
                headerName: columnHeader,
                field: AgGridUtil.escape(columnHeader),
                enableValue: isColNumeric,
            };
            let sparkLineColDefOptions = SparkLineUtils.getSparkLineColDefOptions(sparkLineOptions,columnHeader);
            let numericOptions = AgGridUtil.getNumericOptions(isColNumeric,formattingOptions[columnHeader]);
            let userOptions = colOpts[columnHeader] || {};
            let enterpriseColDefOptions = AgGridUtil.getEnterpriseColDefOptions(isColNumeric,licenseKey);
            return Object.assign(options, enterpriseColDefOptions,sparkLineColDefOptions,numericOptions,userOptions);
        });

        if(rowHeaders){
            colDef.unshift({
                field : "rowHeaders",
                headerName : "", 
                enablePivot : licenseKey ? false : undefined,
                enableRowGroup  : licenseKey ? false : undefined,
            });
        }
        
        return colDef;
    }

    static getEnterpriseColDefOptions(isNumeric,licenseKey){
        if(licenseKey){
            return {
                enableRowGroup: !isNumeric,
                enablePivot: !isNumeric,
                aggFunc : isNumeric ? "sum" : undefined
            }
        }
        return {};
    }


    static escape(string){
        return string.replace(".", "_");
    }

    static getNumericOptions(isNumeric,format){
        if(isNumeric){
              return {
                cellStyle: {"text-align": "right"},
                valueFormatter : (params) => {
                   return FormattingUtils.formatValue(params.value,format);
                }
            }
        }
        return {};
    }
}
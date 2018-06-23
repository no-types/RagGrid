import { SparkLineCellRenderer } from "./SparkLineCellRenderer";

export class SparkLineUtils{

    static transformData(data,sparkLineOptions){
        let rowHeight = 0;
        if(!sparkLineOptions)
            return rowHeight;
        let columnsToDelete =[];
        const sparkLineColumnNames=Object.keys(sparkLineOptions); 
        sparkLineColumnNames.forEach((columnName) => {
            let option = sparkLineOptions[columnName];
             if(!option.startIndex || !option.endIndex)
                return;
             if(option.height && option.height > rowHeight)
                rowHeight = option.height;
             data[columnName] = [];
             data = SparkLineUtils.insertSparkLineData(option,data,columnName);
             if(!option.showDataRows)
             columnsToDelete = columnsToDelete.concat(SparkLineUtils.getSparkLineDataColumns(option.startIndex,option.endIndex,data));
         });
            data = SparkLineUtils.deleteSparkLineColumns(columnsToDelete,data); 
         return rowHeight;
    }

    static insertSparkLineData(option,data,columnName){
        let columnKeys = Object.keys(data);
        let chartOptions = Object.assign({},option);
        delete chartOptions.startIndex;
        delete chartOptions.endIndex;
        data[columnKeys[option.startIndex]].forEach((value,rowIndex)=>{
            let sparkLineData = [chartOptions,value];
            for(let i=option.startIndex;i<option.endIndex;i++){
                sparkLineData.push(data[columnKeys[i]][rowIndex]);
            }
            data[columnName].push(sparkLineData);
        });
        return data;
    }

    static getSparkLineDataColumns(startIndex,endIndex,data){
        let columnKeys = Object.keys(data);
        return columnKeys.slice(startIndex-1,endIndex);
    }

    static deleteSparkLineColumns(columns,data){
       for(let column of columns)
           delete data[column]
       return data;
    }

    static getSparkLineColDefOptions(sparkLineOptions,columnHeader){
        if(sparkLineOptions && sparkLineOptions[columnHeader])
           return{
            cellRenderer:SparkLineCellRenderer,
            suppressSizeToFit:true
           } 
        return {};
    }
}
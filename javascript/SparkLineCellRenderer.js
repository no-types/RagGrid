export class SparkLineCellRenderer{


    init(params){
        this.element=$("<div style='width:100%;height:100%'></div>");
        if(!params.value){
            return;
        }
        let value =params.value.slice();
        let chartOptions =  value.splice(0,1)[0];
        setTimeout( () => {
            chartOptions.height = chartOptions.height || this.element.parent().height();
            chartOptions.width =  chartOptions.width || this.element.parent().width();
            this.element.sparkline(value,chartOptions);
        },0);
    }
    
    getGui(){
        return this.element[0];
    }
    
    refresh(){
        return false;
    }
    
}
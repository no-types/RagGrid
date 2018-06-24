export class FormattingUtils{

    static formatValue(value,format){
        if(!value || !format){
            return value;
        }
        return numeral(value).format(format);  
    }
}
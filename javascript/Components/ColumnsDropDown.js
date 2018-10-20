import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import DropDown from "./base/DropDown";
import Button from "./base/Button";
class ColumnsDropDown extends JSXComponent {
render(props){
    var options = props.columns.map(column => {
        return {
          text: column.headerName || "Row Header",
          icon: column.enableValue ? "number" : "text",
          value: column.field
        };
      });
  
      var onItemSelect = () => {
        event.stopPropagation();
        $(columnsDropDown).hide();
      };
  
      var columnsDropDown = (
        <DropDown
          options={options}
          onSelect={onItemSelect}
          infoText="Select a field to Sort"
        />
      );
      return columnsDropDown;
}
}
export default ColumnsDropDown;
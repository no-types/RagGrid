import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import DropDown from "./base/DropDown";

class ColumnsDropDown extends JSXComponent {
  render(props) {
    var options = props.columns.map((column, index) => {
      return {
        index,
        text: column.headerName || "Row Header",
        icon: column.enableValue ? "number" : "text",
        value: column.field
      };
    });
    options = props.ignoreIndexes
      ? options.filter(
          (option, index) => props.ignoreIndexes.indexOf(index) === -1
        )
      : options;
    var onItemSelect = (item,event) => {
      event.stopPropagation();
      $(columnsDropDown).hide();
      props.onItemSelect(item.index);
    };

    var columnsDropDown = (
      <DropDown
        options={options}
        onSelect={onItemSelect}
        infoText= {props.infoMessage}
      />
    );
    return columnsDropDown;
  }
}
export default ColumnsDropDown;

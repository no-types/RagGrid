import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Icon from "../base/Icon";
import ColumnsDropDown from "../ColumnsDropDown";
import SortIndicator from "./SortIndicator";
class SortListItem extends JSXComponent {
  render(props) {
    var columnsDropDown = <ColumnsDropDown columns={props.columns} />;
    var activeColumn = props.columns[props.activeColumnIndex];
    var filedSelection = (
      <div className="flex-item flex-box field-selection">
        <div className="sort-column-label flex-item">
          {activeColumn.headerName || "Row Header"}
        </div>
        <Icon className="flex-tem" iconPath="dropDown" />
        {columnsDropDown}
      </div>
    );

    $(filedSelection).click(() => {
      event.stopPropagation();
      $(columnsDropDown).toggle();
    });
    var onSortToggle = isAsc => {
      props.onPropChange(props.index, { isAsc });
    };
    return (
      <div className="flex-box sort-list-item">
        <Icon className="flex-item remove-icon" iconPath="remove" />
        <div className="flex-item">{props.index == 0 ? "Sort By" : "then"}</div>
        {filedSelection}
        <div className="flex-item">from</div>
        <SortIndicator
          isValue={activeColumn.enableValue}
          isAsc={props.isAsc}
          onSortToggle={onSortToggle}
        />
        <Icon className="flex-item drag-icon" iconPath="drag" />
      </div>
    );
  }
}
export default SortListItem;

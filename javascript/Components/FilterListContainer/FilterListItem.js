import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Icon from "../base/Icon";
import ColumnsDropDown from "../ColumnsDropDown";
import FilterIndicator from "./FilterIndicator";
import DropDown from "../base/DropDown";
class FilterListItem extends JSXComponent {
  render(props) {
    var onColumnChange = columnIndex => {
      var selectedColumn = props.columns[columnIndex];
      props.onPropChange(props.index, {
        field: selectedColumn.field,
        value: ""
      });
    };
    var columnsDropDown = (
      <ColumnsDropDown
        columns={props.columns}
        onItemSelect={onColumnChange}
        ignoreIndexes={[]}
      />
    );
    var activeColumn = props.columns.find(
      column => column.field == props.item.field
    );
    var filedSelection = (
      <div className="flex-item flex-box field-selection">
        <div className="sort-column-label flex-item">
          {activeColumn.headerName || "Row Header"}
        </div>
        <Icon className="flex-tem" iconPath="dropDown" />
        {columnsDropDown}
      </div>
    );

    $(filedSelection).click(event => {
      event.stopPropagation();
      $(filedSelection).closest(".command-container").find(".btn-options").hide();
      $(columnsDropDown).toggle();
    });

    var onFilterTypeChange = type => {
      props.onPropChange(props.index, { ...props.item, type });
    };

    var removeIcon = (
      <Icon className="flex-item remove-icon pointer" iconPath="remove" />
    );

    $(removeIcon).click(() => {
      props.onRemove(props.index);
    });
    const onFilterOrderChange = order => {
      props.onPropChange(props.index, { ...props.item, order: order.value });
    };
    const orAndDropDown = (
      <DropDown
        options={[
          {
            index: 0,
            text: "And",
            value: "And"
          },
          {
            index: 1,
            text: "Or",
            value: "Or"
          }
        ]}
        onSelect={onFilterOrderChange}
        value={props.item.order || "And"}
      />
    );
    var filterOrder = (
      <div className="flex-item flex-box field-selection">
        <div className="sort-column-label flex-item no-margin filter-order-label">
          {props.item.order || "And"}
        </div>
        <Icon className="flex-tem" iconPath="dropDown" />
        {orAndDropDown}
      </div>
    );
    $(filterOrder).click(event => {
      event.stopPropagation();
      $(".btn-options").hide();
      $(orAndDropDown).toggle();
    });

    const filterValueInput = (
      <input
        type={activeColumn.enableValue ? "number" : "text"}
        value={props.item.value}
        className="filter-input"
      />
    );
    $(filterValueInput).keyup(() => {
      props.onValueChange(props.index, $(filterValueInput).val());
    });
    return (
      <div className="flex-box sort-list-item">
        {removeIcon}
        <div className="flex-item">
          {props.index == 0 ? "Where" : filterOrder}
        </div>
        {filedSelection}
        <FilterIndicator
          isValue={activeColumn.enableValue}
          filterType={props.item.type || "is..."}
          onFilterTypeChange={onFilterTypeChange}
        />
        {props.item.type === "is empty" || props.item.type === "is not empty"
          ? null
          : filterValueInput}
      </div>
    );
  }
}
export default FilterListItem;

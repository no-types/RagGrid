import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import DropDown from "../base/DropDown";
import Icon from "../base/Icon";
class FilterIndicator extends JSXComponent {
  render(props) {
    var numericFilterTypes = [
      "=",
      "≠",
      "<",
      ">",
      "≤",
      "≥",
      "is empty",
      "is not empty"
    ];
    var nonNumericFilterTypes = [
      "is...",
      "is not...",
      "contains",
      "not contains",
      "is empty",
      "is not empty"
    ];
    var options = (props.isValue
      ? numericFilterTypes
      : nonNumericFilterTypes
    ).map(type => {
      return {
        text: type,
        value: type
      };
    });
    var filterTypeDropDown = (
      <DropDown
        options={options}
        value={props.filterType}
        onSelect={(item)=>{props.onFilterTypeChange(item.value)}}
      />
    );

    const filterTypeIndicator = (
      <div className="flex-item flex-box field-selection filter-type">
        <div className="sort-column-label flex-item filter-type-label">{props.filterType}</div>
        <Icon className="flex-tem" iconPath="dropDown" />
        {filterTypeDropDown}
      </div>
    );

    $(filterTypeIndicator).click(event => {
      event.stopPropagation();
      $(".btn-options").hide();
      $(filterTypeDropDown).toggle();
    });
    return filterTypeIndicator;
  }
}
export default FilterIndicator;

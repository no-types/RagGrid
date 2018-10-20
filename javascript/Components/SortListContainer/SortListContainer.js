import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import DropDown from "../base/DropDown";
import Button from "../base/Button";
import SortListItem from "./SortListItem";
import SortListFooter from "./SortListFooter";
class SortListContainer extends JSXComponent {
  render(props) {
    var sortItems = [
      { columnIndex: 1, isAsc: true },
      { columnIndex: 2, isAsc: false },
      { columnIndex: 5, isAsc: true }
    ];
    var onPropChange = (index, newProp) => {
      sortItems[index] = { ...sortItems[index], ...newProp };
      $(sortListItemsDiv).html(sortListItems());
    };
    var sortListItems = () =>
      sortItems.map((item, index) => {
        return (
          <SortListItem
            index={index}
            columns={props.columns}
            activeColumnIndex={item.columnIndex}
            isAsc={item.isAsc}
            onPropChange={onPropChange}
          />
        );
      });
    var sortListItemsDiv = (
      <div className="sort-list-items">{sortListItems()}</div>
    );

    return (
      <div className="sort-list-container">
        {sortListItemsDiv}
        <SortListFooter columns={props.columns} />
      </div>
    );
  }
}

export default SortListContainer;

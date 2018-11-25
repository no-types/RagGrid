import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Sortable from "sortablejs";
import DropDown from "../base/DropDown";
import Button from "../base/Button";
import SortListItem from "./SortListItem";
import SortListFooter from "./SortListFooter";

class SortListContainer extends JSXComponent {
  render(props) {
    var sortItems = [];
    var oldSortItems = [];
    var getSelectedIndexes = () => {
      var selectedIndexes = sortItems.map(item => item.columnIndex);
      props.columns.forEach((column, index) => {
        if (!column.headerName) {
          selectedIndexes.push(index);
        }
      });
      return selectedIndexes;
    };
    var updateContainer = () => {
      props.onSubmit(sortItems);
      $(sortListItemsDiv).html(getSortListItems());
      $(sortListFooter).html(getSortListFooter());
    };

    var onPropChange = (index, newProp) => {
      sortItems[index] = { ...sortItems[index], ...newProp };
      updateContainer();
    };

    var onReOrder = ({ oldIndex, newIndex }) => {
      var itemToMove = sortItems.splice(oldIndex, 1)[0];
      sortItems.splice(newIndex, 0, itemToMove);
      updateContainer();
    };

    var onNewPick = columnIndex => {
      sortItems.push({ columnIndex, isAsc: true });
      updateContainer();
      Sortable.create(sortListItemsDiv, {
        handle: ".drag-icon",
        onEnd: onReOrder
      });
    };

    var onRemove = itemIndex => {
      sortItems.splice(itemIndex, 1);
      updateContainer();
    };

    var getSortListItems = () =>
      sortItems.map((item, index) => {
        return (
          <SortListItem
            index={index}
            columns={props.columns}
            activeColumnIndex={item.columnIndex}
            isAsc={item.isAsc}
            onPropChange={onPropChange}
            onRemove={onRemove}
            selectedIndexes={getSelectedIndexes()}
          />
        );
      });
    var sortListItemsDiv = (
      <div className="sort-list-items">{getSortListItems()}</div>
    );

    var onSubmit = () => {
      oldSortItems = sortItems.slice();
      props.onSubmit(sortItems);
      $(sortListContainer).hide();
    };

    var onCancel = () => {
      // sortItems = oldSortItems.slice();
      $(sortListContainer).hide();
    };
    var getSortListFooter = () => (
      <SortListFooter
        columns={props.columns}
        selectedIndexes={getSelectedIndexes()}
        onNewPick={onNewPick}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
    var sortListFooter = <div>{getSortListFooter()}</div>;
    var sortListContainer = (
      <div className="sort-list-container command-item-container">
        {sortListItemsDiv}
        {sortListFooter}
      </div>
    );
    $(sortListContainer).hide();
    return (
      <div>
        <Button
          icon="sort"
          className="sort-btn"
          text="Sort"
          onClick={event => {
            event.stopPropagation();
            let isShown = $(sortListContainer).is(":visible");
            $(sortListContainer)
              .closest(".command-container")
              .find(".command-item-container")
              .hide();
            updateContainer();
            isShown ? $(sortListContainer).hide() : $(sortListContainer).show();
          }}
        />
        {sortListContainer}
      </div>
    );
  }
}

export default SortListContainer;

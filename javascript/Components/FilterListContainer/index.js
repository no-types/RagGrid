import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Button from "../base/Button";
import FilterListItem from "./FilterListItem";
import FilterListFooter from "./FilterListFooter";

class FilterListContainer extends JSXComponent {
  render(props) {
    debugger;
    var filterItems = [{
      field:"Sepal_Length",
      type:">",
      order:"And",
      value:"0"
    },{
      field:"Petal_Width",
      type:">",
      order:"And",
      value:"0"
    }];
    var oldFilterItems = [];

    var updateContainer = () => {
      $(filterListItemsDiv).html(getFilterListItems());
      $(filterListFooter).html(getFooterListFooter());
    };

    var onPropChange = (index, newProp) => {
      filterItems[index] = { ...filterItems[index], ...newProp };
      updateContainer();
    };

    var onNewPick = columnIndex => {
      var newColumn = props.columns[columnIndex];
      filterItems.push({
        value:"",
        order:"And",
        type: newColumn.enableValue ? "=" : "is...",
        field: newColumn.field
      });
      updateContainer();
    };

    const onValueChange = (index,value) =>{
      filterItems[index].value = value;
    }
    var onRemove = itemIndex => {
      filterItems.splice(itemIndex, 1);
      updateContainer();
    };

    var getFilterListItems = () =>
      filterItems.map((item, index) => {
        return (
          <FilterListItem
            index={index}
            columns={props.columns}
            item={item}
            onPropChange={onPropChange}
            onValueChange={onValueChange}
            onRemove={onRemove}
          />
        );
      });
    var filterListItemsDiv = (
      <div className="sort-list-items">{getFilterListItems()}</div>
    );

    var onSubmit = () => {
      oldFilterItems = filterItems.slice();
      props.onSubmit(filterItems);
      $(filterListContainer).hide();
    };

    var onCancel = () => {
      filterItems = oldFilterItems.slice();
      $(filterListContainer).hide();
    };
    var getFooterListFooter = () => (
      <FilterListFooter
        columns={props.columns}
        selectedIndexes={[]}
        onNewPick={onNewPick}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
    var filterListFooter = <div>{getFooterListFooter()}</div>;
    var filterListContainer = (
      <div className="sort-list-container">
        {filterListItemsDiv}
        {filterListFooter}
      </div>
    );
    $(filterListContainer).hide();
    return (
      <div>
        <Button icon="filter" className="sort-btn" text="Filter" onClick={(event)=>{
          event.stopPropagation();
          filterItems = oldFilterItems.slice();
          updateContainer();
          $(filterListContainer).toggle();
        }} />
        {filterListContainer}
      </div>
    );
  }
}

export default FilterListContainer;

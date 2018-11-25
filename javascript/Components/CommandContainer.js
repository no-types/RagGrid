import { createButton, getIcon } from "../Utils";
import dom from "jsx-render";
import DropDown from "./base/DropDown";
import Button from "./base/Button";
import SortListContainer from "./SortListContainer";
import RowHeightContainer from "./RowHeightContainer";
import FilterListContainer from "./FilterListContainer";

export class CommandContainer {
  constructor(gridOptions, commandPanelItems, exportOptions) {
    this.gridOptions = gridOptions;
    this.commandPanelItems = commandPanelItems;
    this.exportOptions = exportOptions || {};
    this.filterItems = [];
  }

  onSortApply = sortItems => {
    let colDefs = this.gridOptions.columnDefs;
    let sortModel = sortItems.map(sortItem => {
      return {
        colId: colDefs[sortItem.columnIndex].field,
        sort: sortItem.isAsc ? "asc" : "desc"
      };
    });
    this.gridOptions.api.setSortModel(sortModel);
  };
  onFilterApply = filterItems => {
    this.filterItems = filterItems;
    this.gridOptions.api.onFilterChanged();
  };

  getGui() {
    const quickSearchInput = (
      <input
        type="text"
        className="quick-search-name"
        placeHolder="Search..."
      />
    );
    $(quickSearchInput).keyup(() => {
      this.gridOptions.api.setQuickFilter($(quickSearchInput).val());
    });
    debugger;
    return (
      <div className="command-container">
        {this.commandPanelItems.searchBar === false ? null : (
          <div className="quick-search">{quickSearchInput}</div>
        )}
        {this.commandPanelItems.filter === false ? null : (
          <FilterListContainer
            columns={this.gridOptions.columnDefs}
            onSubmit={this.onFilterApply}
          />
        )}
        {this.commandPanelItems.sort === false ? null : (
          <SortListContainer
            columns={this.gridOptions.columnDefs}
            onSubmit={this.onSortApply}
          />
        )}
        {this.commandPanelItems.rowHeight === false ? null : (
          <RowHeightContainer gridOptions={this.gridOptions} />
        )}
        {this.commandPanelItems.export === false ? null : (
          <div className="export-csv">
            <Button
              icon="download"
              text="Export as CSV"
              onClick={event => {
                this.gridOptions.api.exportDataAsCsv(this.exportOptions);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

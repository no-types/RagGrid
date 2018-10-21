import { createButton, getIcon } from "../Utils";
import dom from "jsx-render";
import DropDown from "./base/DropDown";
import Button from "./base/Button";
import SortListContainer from "./SortListContainer/SortListContainer";
import RowHeightContainer from "./RowHeightContainer";
export class CommandContainer {
  constructor(gridOptions) {
    this.gridOptions = gridOptions;
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

  getGui() {
    return (
      <div className="command-container">
        <SortListContainer
          columns={this.gridOptions.columnDefs}
          onSubmit={this.onSortApply}
        />
        <RowHeightContainer gridOptions={this.gridOptions} />
      </div>
    );
  }
}

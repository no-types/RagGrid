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

  createRowHeightButton() {
   
  }

  createSortMenu(){
    var sortButton = <Button icon="sort" className="sort-btn" text="Sort"></Button>;
    var sortList = <SortListContainer columns={this.gridOptions.columnDefs}></SortListContainer>
    return(<div>
      {sortButton}
      {sortList}
      </div>)
  }
  getGui() {
    return (
      <div className="command-container">
       {this.createSortMenu()}
      <RowHeightContainer gridOptions={this.gridOptions}/>
      </div>
    );
  }
}

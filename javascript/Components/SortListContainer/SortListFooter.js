import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Button from "../base/Button";
import ColumnsDropDown from "../ColumnsDropDown";
class SortListFooter extends JSXComponent {
  render(props) {
    var onItemSelect = itemIndex => {
      props.onNewPick(itemIndex);
    };
    var columnsDropDown = (
      <ColumnsDropDown
        columns={props.columns}
        ignoreIndexes={props.selectedIndexes}
        onItemSelect={onItemSelect}
        infoMessage={"Select a field to sort"}
      />
    );
    var fieldsMenu = (
      <div className="flex-item pointer bold">
        Pick a field to sort {columnsDropDown}
      </div>
    );

    $(fieldsMenu).click((event) => {
      event.stopPropagation();
      $(".btn-options").hide();
      $(columnsDropDown).toggle();
    });
    
    return (
      <div className="flex-box sort-footer">
        {props.selectedIndexes.length >= props.columns.length ? (
          <div className="flex-item bold disabled">Pick a field to sort</div>
        ) : (
          fieldsMenu
        )}
        <div className="flex-item flex-box">
          {/* <Button text="Apply" onClick={props.onSubmit}/> */}
          <Button text="Close" onClick={props.onCancel}/>
        </div>
      </div>
    );
  }
}
export default SortListFooter;

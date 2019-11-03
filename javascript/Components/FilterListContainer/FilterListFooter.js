import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Button from "../base/Button";
import ColumnsDropDown from "../ColumnsDropDown";
class FilterListFooter extends JSXComponent {
  render(props) {
    var onItemSelect = itemIndex => {
      props.onNewPick(itemIndex);
    };
    var columnsDropDown = (
      <ColumnsDropDown
        columns={props.columns}
        ignoreIndexes={[]}
        onItemSelect={onItemSelect}
        infoMessage={"Select a field to filter"}
      />
    );
    var fieldsMenu = (
      <div className="flex-item pointer bold">
        Pick a field to filter {columnsDropDown}
      </div>
    );

    $(fieldsMenu).click((event) => {
      event.stopPropagation();
      $(".btn-options").hide();
      $(columnsDropDown).toggle();
    });
    
    return (
      <div className="flex-box sort-footer">
        {fieldsMenu}
        <div className="flex-item flex-box">
          {/* <Button text="Apply" onClick={props.onSubmit}/> */}
          <Button text="Close" onClick={props.onCancel}/>
        </div>
      </div>
    );
  }
}
export default FilterListFooter;

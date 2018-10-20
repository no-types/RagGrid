import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Button from "../base/Button";
import ColumnsDropDown from "../ColumnsDropDown";
class SortListFooter extends JSXComponent {
  render(props) {
    var columnsDropDown = <ColumnsDropDown columns={props.columns} />;
    var fieldsMenu = (
      <div className="flex-item pointer bold">
        Pick a field to sort {columnsDropDown}
      </div>
    );
    $(fieldsMenu).click(() => {
      event.stopPropagation();
      $(columnsDropDown).toggle();
    });

    return (
      <div className="flex-box sort-footer">
        {fieldsMenu}
        <div className="flex-item flex-box">
          <Button text="Apply" />
          <Button text="Close" />
        </div>
      </div>
    );
  }
}
export default SortListFooter;

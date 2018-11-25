import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import DropDown from "./base/DropDown";
import Button from "./base/Button";
class RowHeightContainer extends JSXComponent {
  render(props) {
    // Row Height Options
    var options = [
      {
        text: "Short",
        icon: "rowHeight.short",
        value: 30
      },
      {
        text: "Medium",
        icon: "rowHeight.medium",
        value: 56
      },
      {
        text: "Tall",
        icon: "rowHeight.tall",
        value: 88
      },
      {
        text: "Extra Tall",
        icon: "rowHeight.extraTall",
        value: 128
      }
    ];

    props.gridOptions.getRowHeight = () => {
      return options[0].value;
    };

    let onSelect = item => {
      props.gridOptions.getRowHeight = () => {
        return +(item.value || options[0].value);
      };
      props.gridOptions.api.resetRowHeights();
      var newButton = $(<Button icon={item.icon} className="row-height-btn" />);
      $(button).html(newButton.html());
    };

    var dropDown = (
      <DropDown
        options={options}
        onSelect={onSelect}
        className="command-item-container"
        infoText="Select a row height"
        value={options[0].value}
      />
    );
    return (
      <div className="row-height-container">
        <Button
          icon="rowHeight.short"
          className="row-height-btn"
          onClick={event => {
            event.stopPropagation();
            let isShown = $(dropDown).is(":visible");
            $(dropDown)
              .closest(".command-container")
              .find(".command-item-container")
              .hide();
            isShown ? $(dropDown).hide() : $(dropDown).show();
          }}
        />
        {dropDown}
      </div>
    );
  }
}
export default RowHeightContainer;

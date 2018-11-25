import JSXComponent from "jsx-render/lib/JSXComponent";
import Icon from "./Icon";
import dom from "jsx-render";

class DropDown extends JSXComponent {
  render(props) {
    // Constructing DropDown Items
    const options = props.options.map(option => {
      // On Selecting Item in DropDown
      var onClickHandler = el =>
        el.addEventListener("click", event => {
          $(event.currentTarget)
            .parent()
            .find(".active")
            .removeClass("active");
          $(event.currentTarget).addClass("active");
          props.onSelect(option, event);
        });

      return (
        <div
          className={
            "btn-option-item " + (props.value == option.value ? "active" : "")
          }
          ref={onClickHandler}
          data-value={option.value}
        >
          {option.icon ? (
            <Icon iconPath={option.icon} className="btn-option-icon" />
          ) : null}
          <div className="btn-option-txt">{option.text}</div>
        </div>
      );
    });

    let dropDown = (
      <div className={"btn-options " + (props.className || "")}>
        <div class="dropdown-info btn-option-item">{props.infoText}</div>
        {options}
      </div>
    );

    // For hiding drop down on clicking outside DropDown
    $(document).click(e => {
      var container = $(dropDown);
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    });

    //DropDown is hidden by default
    $(dropDown).hide();
    return dropDown;
  }
}

export default DropDown;

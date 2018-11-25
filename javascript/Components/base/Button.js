import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Icon from "./Icon";

class Button extends JSXComponent {
  render(props) {
    var button = (
      <div
        className={
          "command-btn btn " +
          (props.className || " ") +
          " " +
          (props.text ? "btn-text" : "btn-no-text")
        }
      >
        {props.icon ? (
          <Icon iconPath={props.icon} className="command-btn-icon" />
        ) : null}
        {props.text ? (
          <div className="command-btn-text">{props.text}</div>
        ) : null}
      </div>
    );

    if (props.onClick) {
      $(button).click(props.onClick);
    }

    return button;
  }
}

export default Button;

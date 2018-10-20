import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import Icon from "./Icon";

class Button extends JSXComponent {
  render(props) {
    return (
      <div className={"command-btn btn "+(props.className || " ")+" "+(props.text?"btn-text":"btn-no-text")}>
        {props.icon ? <Icon iconPath={props.icon} className="command-btn-icon"></Icon>  : null}
        {props.text ? (
          <div className="command-btn-text">{props.text}</div>
        ) : null}
      </div>
    );
  }
}

export default Button;
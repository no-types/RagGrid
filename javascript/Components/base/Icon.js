import { Icons } from "../../Icons";
import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
import {resolveObject} from "../../Utils"


class Icon extends JSXComponent {
  render(props) {
    return (
      <div
        className={"icon " + (props.className || " ")}
        dangerouslySetInnerHTML={{ __html: resolveObject(Icons, props.iconPath) }}
      />
    );
  }
}

export default Icon;

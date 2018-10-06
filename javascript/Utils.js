import { Icons } from "./Icons";
export const resolveObject = (obj, path) => {
  path = path.split(".");
  var current = obj;
  while (path.length) {
    if (typeof current !== "object") return undefined;
    current = current[path.shift()];
  }
  return current;
};

export const getIcon = (iconPath, className = "icon") => {
  let iconDiv = document.createElement("div");
  iconDiv.setAttribute("class", "icon");
  iconDiv.classList.add(className);
  iconDiv.innerHTML = resolveObject(Icons, iconPath);
  return iconDiv;
};

export const createButton = ({ text, icon, className = "btn" }) => {
  let button = document.createElement("div");
  button.setAttribute("class", "command-btn");
  button.classList.add(className);
  if (icon) {
    let iconElement = getIcon(icon, "command-btn-icon");
    button.appendChild(iconElement);
  }
  if (text) {
    let buttonText = document.createElement("div");
    buttonText.setAttribute("class", "command-btn-text");
    buttonText.innerHTML = text;
    button.appendChild(buttonText);
  }
  return button;
};

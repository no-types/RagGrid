import {Icons} from './Icons';
export const resolveObject = (obj, path) =>{
    path = path.split('.');
    var current = obj;
    while(path.length) {
        if(typeof current !== 'object') return undefined;
        current = current[path.shift()];
    }
    return current;
}

export const getIcon = (iconPath,className="icon") =>{
   
    let iconDiv = document.createElement("div");
    iconDiv.setAttribute("class","icon");
    iconDiv.classList.add(className);
    iconDiv.innerHTML = resolveObject(Icons,iconPath);
    return iconDiv;
}

export const createBtn = ({ text, icon, className="btn" }) => {
    let btn = document.createElement("div");
    btn.setAttribute("class", "command-btn");
    btn.classList.add(className);
    if(icon){
      let iconElement = getIcon(icon, "command-btn-icon");
      btn.appendChild(iconElement);
    }
    if (text) {
      let btnText = document.createElement("div");
      btnText.setAttribute("class", "command-btn-text");
      btnText.innerHTML = text;
      btn.appendChild(btnText);
    }
    return btn;
  };
import { createRowHeightBtn } from "./RowHeightBtn";
import { createBtn, getIcon } from "./Utils";
export class CommandContainer {
  constructor(gridOptions) {
    this.gridOptions = gridOptions;
  }

   createRowHeightBtn(){
    let rowHeightBtn = createBtn({
      icon: "rowHeight.short",
      className: "row-height-btn"
    });
    let options = document.createElement("div");
    options.classList.add("btn-options");
    var optionsList = [
      {
        text: "Short",
        icon: "rowHeight.short",
        height: 30
      },
      {
        text: "Medium",
        icon: "rowHeight.medium",
        height: 56
      },
      {
        text: "Tall",
        icon: "rowHeight.tall",
        height: 88
      },
      {
        text: "Extra Tall",
        icon: "rowHeight.extraTall",
        height: 128
      }
    ];

    this.gridOptions.getRowHeight = () =>{
        return optionsList[0].height;
    }
    optionsList.forEach(option => {
      let optionElement = document.createElement("div");
      optionElement.classList.add("btn-option-item");
      let optionText = document.createElement("div");
      optionText.classList.add("btn-option-txt");
      optionText.innerHTML = option.text;
      let optionIcon = getIcon(option.icon, "btn-option-icon");
      optionElement.appendChild(optionIcon);
      optionElement.appendChild(optionText);
      optionElement.addEventListener("click", () => {
          debugger;
          this.gridOptions.getRowHeight = () =>{
            return option.height;
        }
          this.gridOptions.api.resetRowHeights();
      });
      options.appendChild(optionElement);
    });
    rowHeightBtn.appendChild(options);
    return rowHeightBtn;
  };

  getGui() {
    let commandContainer = document.createElement("div");
    commandContainer.setAttribute("class", "command-container");
    let rowHeightBtn = this.createRowHeightBtn();
    commandContainer.appendChild(rowHeightBtn);
    return commandContainer;
  };
}

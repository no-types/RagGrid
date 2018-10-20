import JSXComponent from "jsx-render/lib/JSXComponent";
import dom from "jsx-render";
class SortIndicator extends JSXComponent {
  render(props) {
    var ascendingIndicator = (
      <div className={"sort-order-item " + (props.isAsc ? "selected" : "")}>
        <span class="sortOrderLabel">{props.isValue ? "1 → 9" : "A → Z"}</span>
      </div>
    );
    var descendingIndicator = (
      <div className={"sort-order-item " + (!props.isAsc ? "selected" : "")}>
        <span class="sortOrderLabel">{props.isValue ? "9 → 1" : "Z → A"}</span>
      </div>
    );
    $(props.isAsc ? descendingIndicator : ascendingIndicator).click(() => {
        props.onSortToggle(!props.isAsc);
    });
    return (
      <div className="flex-item">
        <div className="flex-box  sort-order-container">
          {ascendingIndicator}
          {descendingIndicator}
        </div>
      </div>
    );
  }
}
export default SortIndicator;

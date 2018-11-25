export class FilterUtil {
  static numericFilterTypes = {
    "<": (a, b) => a < b,
    ">": (a, b) => a > b,
    "=": (a, b) => (a === b),
    "≠": (a, b) => a != b,
    "≤": (a, b) => a <= b,
    "≥": (a, b) => a >= b,
    "is empty": (a, b) => a === "" || a === null,
    "is not empty": (a, b) => a !== "" && a !== null
  };
  static nonNumericFilterTypes = {
    "is...": (a, b) => a === b,
    "is not...": (a, b) => a !== b,
    contains: (a, b) => a.indexOf(b) !== -1,
    "not contains": (a, b) => a.indexOf(b) === -1,
    "is empty": (a, b) => a === "" || a === null,
    "is not empty": (a, b) => a !== "" && a !== null
  };

  static isDataValid = (filter, data) => {
    var isValid = true;
    for (let i = 0; i < filter.length; i++) {
      let currentFilter = filter[i];
      let dataValue = data[currentFilter.field];
      let currentValidation = true;
      if (typeof dataValue === "number") {
        try {
          const filterValue = currentFilter.value.indexOf(".")!==-1 ? parseFloat
          (currentFilter.value) : parseInt(currentFilter.value);
          currentValidation = FilterUtil.numericFilterTypes[currentFilter.type](
            dataValue,
            filterValue
          );
        } catch (e) {}
      } else {
        const filterValue = currentFilter.value.toString();
        currentValidation = FilterUtil.nonNumericFilterTypes[currentFilter.type](
          dataValue,
          filterValue
        );
      }
      isValid =
        currentFilter.order === "Or"
          ? isValid || currentValidation
          : isValid && currentValidation;
    }
    return isValid;
  };
}

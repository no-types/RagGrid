export const resolveObject = (obj, path) => {
  path = path.split(".");
  var current = obj;
  while (path.length) {
    if (typeof current !== "object") return undefined;
    current = current[path.shift()];
  }
  return current;
};





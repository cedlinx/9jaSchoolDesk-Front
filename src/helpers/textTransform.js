export const titleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const initialsCase = (str) => str.toUpperCase().split(" ").map((word) => word.charAt(0).toUpperCase()).join(" ");

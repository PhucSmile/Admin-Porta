export const isSubset = (array1, array2) =>
  array2.every((element) => array1.includes(element));

import _ from 'lodash';

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeLetter = (string) => {
  return _.startCase(_.toLower(string));
};

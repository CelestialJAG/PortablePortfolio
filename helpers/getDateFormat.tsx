import months from "../configs/months";
import getDateSuffix from "./getDateSuffix";

const getDateFormat = (date: Date) => {
  return `${months[date.getMonth()]} ${
    date.getDate() + getDateSuffix(date.getDate())
  }, ${date.getFullYear()}`;
};
export default getDateFormat;

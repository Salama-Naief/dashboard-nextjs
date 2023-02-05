import { kanbanData } from "./data/dummy";

export const DropFun = ({ itemId, keyField, color }) => {
  const dropItem = kanbanData.find((item) => item.Id === itemId);
  dropItem.Status = keyField;
  dropItem.Color = color;
  const kanban = kanbanData.filter((item) => item.Id !== itemId);
  const data = kanban.concat(dropItem);
  console.log("data", data);
  return data;
};

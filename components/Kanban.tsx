import { Flex, Paper, Title } from "@mantine/core";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
//import { kanbanData } from "../utils/data/dummy";
import { Droppable } from "react-beautiful-dnd";
import KanbanItem from "./KanbanItem";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { DropFun } from "../utils/helperFun";
import { Store } from "../utils/Store";

interface Props {
  title: String;
  keyField: String;
  color: String;
}
function Kanban({ title, keyField, color }: Props) {
  const { state, dispatch } = useContext(Store);
  const { kanbanData } = state;

  const [kanbanItems, setKanbanItems] = useState(kanbanData);
  const [{ bgColor }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: String }, monitor) => {
      //const payload = DropFun({ itemId: item.id, keyField, color: color });
      console.log("item", item);
      const dropItem = kanbanData.find(
        (kanban: KANBANITEM) => kanban.Id === item.id
      );
      console.log("dropItem", dropItem);

      dropItem.Status = keyField;
      dropItem.Color = color;
      const kanban = kanbanData.filter(
        (kanban: KANBANITEM) => kanban.Id !== item.id
      );
      const data = kanban.concat(dropItem);
      setKanbanItems(data);
      dispatch({
        type: "KANBANDATA",
        payload: data,
      });
    },
    collect: (monitor) => ({
      bgColor: monitor.isOver() ? "darksalmon" : "transparent",
    }),
  }));

  return (
    <Paper
      py={"md"}
      radius="md"
      sx={(theme) => ({
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[2],
      })}
    >
      <Flex px={"md"} align={"center"} justify="space-between">
        <Title order={4}>{title}</Title>
        <BsThreeDotsVertical />
      </Flex>
      <div
        ref={drop}
        style={{ backgroundColor: bgColor, minHeight: "8rem" }}
        className="px-3 py-2 rounded-md"
      >
        {kanbanItems
          .filter((item: KANBANITEM) => item.Status === keyField)
          .map((item: KANBANITEM) => (
            <KanbanItem kanban={item} />
          ))}
      </div>
    </Paper>
  );
}

export default Kanban;

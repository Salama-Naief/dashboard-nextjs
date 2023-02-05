import { Paper, Text, Title } from "@mantine/core";
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";

function KanbanItem({ kanban }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      dropEffect: "move",
      item: { id: kanban.Id },
      end: (item, monitor) => {
        console.log("item drag", item);
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div ref={dragRef} style={{ opacity }}>
      <Paper p={"md"} my="sm">
        <Title color={kanban.Color} order={6}>
          {kanban.Title}
        </Title>
        <Text color={"gray.6"}>{kanban.Summary}</Text>
      </Paper>
    </div>
  );
}

export default KanbanItem;

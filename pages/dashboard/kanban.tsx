import React, { useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { kanbanData, kanbanGrid } from "../../utils/data/dummy";
//import { kanbanData } from "../../utils/dummyKanban";
import Layout from "../../components/Layout";
import { Grid, Paper, ScrollArea, Text, Title } from "@mantine/core";
import Kanban from "../../components/Kanban";

export default function Calender() {
  return (
    <Layout>
      <Paper sx={{ height: "100vh" }} px="sm" py="md">
        <ScrollArea
          style={{ height: "100%" }}
          offsetScrollbars
          scrollbarSize={8}
          pb="xl"
        >
          <div className="p-4">
            <Text fz={"xl"} fw={600} color={"gray.6"}>
              App
            </Text>
            <Title order={1}>Kanban</Title>
          </div>
          <DndProvider backend={HTML5Backend}>
            <Grid>
              {kanbanGrid.map((item, index) => (
                <Grid.Col key={index} sm={6} md={4} lg={3}>
                  <Kanban
                    title={item.headerText}
                    color={item.color}
                    keyField={item.keyField}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </DndProvider>
        </ScrollArea>
      </Paper>
    </Layout>
  );
}

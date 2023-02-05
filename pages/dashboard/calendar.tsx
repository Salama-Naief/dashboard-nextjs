import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import { formatDate } from "@fullcalendar/core"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import listPlugin from "@fullcalendar/list"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import { scheduleData } from "../../utils/data/dummy";
import Layout from "../../components/Layout";
import { Button, Flex, Input, Modal, Paper, Text, Title } from "@mantine/core";
import { MdDateRange } from "react-icons/md";

export default function Calender() {
  const [currentEvent, setCurrentEvent] = useState([]);
  const [addEventOpened, setAddEventOpened] = useState(false);
  const [selectedEventOpened, setSelectedEventOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [dateSelected, setDateSelected] = useState(null);
  const [eventSelected, setEventSelected] = useState(null);
  const titleRef = useRef<HTMLInputElement>(null);

  //add event dunction
  const addEventFun = (e) => {
    e.preventDefault();
    if (dateSelected) {
      const calenderApi = dateSelected?.view.calendar;
      calenderApi.unselect();
      if (titleRef.current && titleRef.current.value) {
        setErrorMessage("");
        calenderApi.addEvent({
          title: titleRef.current.value,
          start: dateSelected?.startStr,
          end: dateSelected?.endtStr,
          allDay: dateSelected?.allDay,
        });
        setAddEventOpened(false);
      } else {
        setErrorMessage("Title is required");
      }
    }
  };
  const handleDateClick = (selected) => {
    console.log("selected", selected);
    setAddEventOpened(true);
    setDateSelected(selected);
  };
  const handelEventClick = (selected) => {
    setSelectedEventOpened(true);
    setEventSelected(selected);
    console.log("title", selected.event);
  };
  return (
    <Layout>
      <Paper sx={{ height: "100vh" }} px="sm" py="md">
        {/**model of adding events */}
        <Modal
          opened={addEventOpened}
          onClose={() => setAddEventOpened(false)}
          title="Enter the title of your event"
        >
          <form onSubmit={addEventFun}>
            <Input.Wrapper id="add-event" withAsterisk error={errorMessage}>
              <Input id="add-event" ref={titleRef} placeholder="Your Title" />
            </Input.Wrapper>
            <Flex align={"center"} justify="space-between" my="xs">
              <Flex align={"center"} gap="sm">
                <MdDateRange size={20} color="gray" />
                <Text fz={"sm"}>
                  {formatDate(dateSelected?.startStr, {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  }) +
                    " from " +
                    formatDate(dateSelected?.startStr, {
                      hour: "numeric",
                      minute: "numeric",
                    }) +
                    " to " +
                    formatDate(dateSelected?.endStr, {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                </Text>
              </Flex>
              <Button type="submit" variant="outline">
                Save
              </Button>
            </Flex>
          </form>
        </Modal>
        {/** selected model */}
        <Modal
          opened={selectedEventOpened}
          onClose={() => setSelectedEventOpened(false)}
          title=""
        >
          <Title order={2}>{eventSelected?.event.title}</Title>
          <Flex align={"center"} gap="sm" my="xs">
            <MdDateRange size={20} color="gray" />
            <Text color={"gray"}>
              {formatDate(eventSelected?.event.startStr, {
                month: "long",
                year: "numeric",
                day: "numeric",
              }) +
                " from " +
                formatDate(eventSelected?.event.startStr, {
                  hour: "numeric",
                  minute: "numeric",
                }) +
                " to " +
                formatDate(eventSelected?.event.endStr, {
                  hour: "numeric",
                  minute: "numeric",
                })}
            </Text>
          </Flex>
        </Modal>
        <div className="p-4">
          <Text fz={"xl"} fw={600} color={"gray.6"}>
            App
          </Text>
          <Title order={1}>Calendar</Title>
        </div>
        <div className="relative h-full">
          <FullCalendar
            height={"85%"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            weekends={false}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handelEventClick}
            eventsSet={(events) => setCurrentEvent(events)}
            initialEvents={scheduleData}
          />
        </div>
      </Paper>
    </Layout>
  );
}

/*import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson } from "@mobiscroll/react";

function CalendarComponent() {
  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const responsive = React.useMemo(() => {
    return {
      xsmall: {
        view: {
          calendar: {
            type: "month",
          },
          agenda: {
            type: "day",
          },
        },
      },
      custom: {
        // Custom breakpoint
        breakpoint: 600,
        view: {
          calendar: {
            labels: true,
          },
        },
      },
    };
  }, []);

  return (
    <Eventcalendar
      theme="ios"
      themeVariant="light"
      clickToCreate={true}
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      eventDelete={true}
      data={myEvents}
      responsive={responsive}
    />
  );
}

export default CalendarComponent;*/

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://trial.mobiscroll.com/events/?vers=5")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          title: event.text,
          start: event.start,
          end: event.end,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="500px"
      />
    </div>
  );
}

export default CalendarComponent;


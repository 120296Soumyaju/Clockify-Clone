/*import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import React from 'react';

export default function Scheduler() {

    const [myEvents, setEvents] = React.useState([]);

    React.useEffect(() => {
        getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);
    
    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            schedule: { type: 'month' }
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
            view={view}
            onEventClick={onEventClick}
       />
    ); 
}*/

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Scheduler() {
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

  const handleEventClick = (clickInfo) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        eventClick={handleEventClick}
        height="500px"
      />
    </div>
  );
}

export default Scheduler;


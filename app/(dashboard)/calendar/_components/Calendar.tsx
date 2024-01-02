"use client";

import { DateSelectArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addEvent } from "@/actions/calendar";

type calendarType = {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}[];

interface CalendarProps {
  calendarEvents: calendarType;
}

export const CalendarComponent = ({ calendarEvents }: CalendarProps) => {
  const { isOpen } = useSidebar();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState<DateSelectArg | null>(null);
  const [loading, setLoading] = useState(false);

  const eventInputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);

  const openAddEventDialog = (selected: DateSelectArg) => {
    setIsAddDialogOpen(true);
    setSelectEvent(selected);
  };

  useEffect(() => {
    const reSizeCalendar = () => {
      const calendar = calendarRef.current?.getApi();
      calendar?.updateSize();
    };
    reSizeCalendar();
  }, [isOpen]);

  const handleAddEvent = async () => {
    setLoading(true);
    const eventContent = eventInputRef.current?.value.trim() as string;
    if (selectEvent) {
      let calendarApi = selectEvent.view.calendar;
      calendarApi.unselect();

      if (eventContent === "") {
        toast.error("Please write an event first");
        setLoading(false);
      } else {
        const values = {
          title: eventContent,
          start: selectEvent.startStr,
          end: selectEvent.endStr,
          allDay: selectEvent.allDay,
        };
        await addEvent(values);

        setSelectEvent(null);
        setIsAddDialogOpen(false);
        toast.success("Event added successfully");
        setLoading(false);
        window.location.reload();
      }
    }
  };

  const unsetSelectedEvent = () => {
    setSelectEvent(null);
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        height="77vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={openAddEventDialog}
        initialEvents={calendarEvents}
        longPressDelay={0}
      />
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={unsetSelectedEvent}
          onEscapeKeyDown={unsetSelectedEvent}
        >
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              The event you will write will be added to the calendar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event" className="text-center">
                Event
              </Label>
              <Input
                ref={eventInputRef}
                id="event"
                placeholder="write your event"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              type="submit"
              className="w-full"
              onClick={handleAddEvent}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { getCalendarEvents } from "@/actions/calendar";
import { CalendarComponent } from "./_components/Calendar";

const CalendarPage = async () => {
  const calendarEvents = await getCalendarEvents();

  return (
    <div className="m-6 flex flex-col">
      <div className="text-center md:text-start font-semibold text-4xl sm:text-5xl tracking-tight">
        Calendar
      </div>
      <div className="mt-6 px-5 lg:px-7 pb-5">
        <CalendarComponent calendarEvents={calendarEvents} />
      </div>
    </div>
  );
};

export default CalendarPage;

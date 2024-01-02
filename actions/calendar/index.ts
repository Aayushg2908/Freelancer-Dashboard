"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type calendarType = {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}[];

export const addEvent = async (calendarData: calendarType) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  calendarData.map(async (calendarEvent) => {
    await db.event.create({
      data: {
        userId: user.id,
        title: calendarEvent.title,
        start: calendarEvent.start,
        end: calendarEvent.end,
        allDay: calendarEvent.allDay,
      },
    });
  });

  revalidatePath("/calendar");
};

export const getCalendarEvents = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const events = await db.event.findMany({
    where: {
      userId: user.id,
    },
    select: {
      title: true,
      start: true,
      end: true,
      allDay: true,
    },
  });

  return events;
};

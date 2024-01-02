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
};

export const addEvent = async (values: calendarType) => {
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

  await db.event.create({
    data: {
      title: values.title,
      start: values.start,
      end: values.end,
      allDay: values.allDay,
      userId: user.id,
    },
  });

  revalidatePath("/calendar");
};

export const getEvents = async () => {
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
  });

  return events;
};

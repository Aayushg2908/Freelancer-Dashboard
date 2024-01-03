"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getAllProjects = async () => {
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

  const projects = await db.project.findMany({
    where: {
      userId: user.id,
    },
  });

  const barChartArray: barChartType = [];
  projects.forEach((project) => {
    const projectType = project.type;
    const existingType = barChartArray.find(
      (item) => item.name === projectType
    );

    if (existingType) {
      existingType["Project type count"] += 1;
    } else {
      barChartArray.push({ name: projectType, "Project type count": 1 });
    }
  });

  return { projects, barChartArray };
};

export const getAllClients = async () => {
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

  const clients = await db.client.findMany({
    where: {
      userId: user.id,
    },
  });

  const donutChartArray: donutChartType = [];
  clients.forEach((client) => {
    const referralSource = client.referralSource;
    const existingSource = donutChartArray.find(
      (item) => item.name === referralSource
    );

    if (existingSource) {
      existingSource.number += 1;
    } else {
      donutChartArray.push({ name: referralSource, number: 1 });
    }
  });

  return { clients, donutChartArray };
};

export const getAllTasks = async () => {
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

  const tasks = await db.task.findMany({
    where: {
      userId: user.id,
    },
  });

  return tasks;
};

export const getAllEvents = async () => {
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

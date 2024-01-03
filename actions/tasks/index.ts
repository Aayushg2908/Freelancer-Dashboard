"use server";

import { db } from "@/lib/db";
import { taskSchema } from "@/lib/validations/task";
import { auth } from "@clerk/nextjs";
import { Task, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addTask = async (values: z.infer<typeof taskSchema>) => {
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

  const { content, status } = values;

  const lastTask = await db.task.findFirst({
    where: { userId: user.id, Status: status },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastTask ? lastTask.order + 1 : 0;

  await db.task.create({
    data: {
      userId: user.id,
      content,
      Status: status,
      order: newOrder,
    },
  });

  revalidatePath("/kanban");
};

export const getTaskByStatus = async (status: TaskStatus) => {
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

  return db.task.findMany({
    where: {
      userId: user.id,
      Status: status,
    },
    orderBy: { order: "asc" },
  });
};

export const deleteTask = async (id: string) => {
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

  await db.task.delete({
    where: {
      userId: user.id,
      id,
    },
  });

  revalidatePath("/kanban");
};

export const updateTaskInSameStatus = async (
  task: Task[],
  status: TaskStatus
) => {
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

  const tasks = task.map((task) =>
    db.task.update({
      where: {
        id: task.id,
      },
      data: {
        order: task.order,
        Status: status,
      },
    })
  );

  const updatedTasks = await db.$transaction(tasks);

  revalidatePath("/kanban");

  return updatedTasks;
};

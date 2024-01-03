"use server";

import { db } from "@/lib/db";
import { projectSchema } from "@/lib/validations/project";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addProject = async (values: z.infer<typeof projectSchema>) => {
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

  const parsedValues = projectSchema.safeParse(values);
  if (!parsedValues.success) {
    throw new Error("Invalid values");
  }

  const { title, description, type, startDate, endDate } = parsedValues.data;

  await db.project.create({
    data: {
      userId: user.id,
      title,
      description,
      type,
      startDate,
      endDate,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/");
};

export const getProjects = async (search: string | undefined) => {
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
      type: search,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
};

export const deleteProject = async (id: string) => {
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

  await db.project.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/");
};

export const updateProject = async (
  id: string,
  values: z.infer<typeof projectSchema>
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

  const parsedValues = projectSchema.safeParse(values);
  if (!parsedValues.success) {
    throw new Error("Invalid values");
  }

  const { title, description, type, startDate, endDate } = parsedValues.data;

  await db.project.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      title,
      description,
      type,
      startDate,
      endDate,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/");
};

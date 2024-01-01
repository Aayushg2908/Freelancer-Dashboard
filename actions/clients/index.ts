"use server";

import { db } from "@/lib/db";
import { clientSchema } from "@/lib/validations/client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addClient = async (values: z.infer<typeof clientSchema>) => {
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

  const parsedValues = clientSchema.safeParse(values);
  if (!parsedValues.success) {
    throw new Error("Invalid values");
  }

  const { name, email, projects, country, referralSource } = parsedValues.data;

  await db.client.create({
    data: {
      userId: user.id,
      name,
      email,
      projects,
      country,
      referralSource,
    },
  });

  revalidatePath("/clients");
};

export const getClients = async () => {
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

  return clients;
};

export const deleteClient = async (id: string) => {
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

  await db.client.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/clients");
};

export const updateClient = async (
  id: string,
  values: z.infer<typeof clientSchema>
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

  const parsedValues = clientSchema.safeParse(values);
  if (!parsedValues.success) {
    throw new Error("Invalid values");
  }

  const { name, email, projects, country, referralSource } = parsedValues.data;

  await db.client.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      name,
      email,
      projects,
      country,
      referralSource,
    },
  });

  revalidatePath("/clients");
};

"use server";

import { prisma } from "@/lib/db";
import { Setting } from "@prisma/client";

export async function saveSettings(values: Setting) {
  const { id, ...rest } = values;
  const settings = await prisma.setting.update({
    where: {
      id: id,
    },
    data: rest,
  });
  return settings;
}

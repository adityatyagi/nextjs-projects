"use server";

import { redirect } from "next/navigation";

export async function navigate(id: number) {
  console.log("🚀 ~ navigate ~ id:", id);
  redirect(`/forms/edit/${id}`);
}

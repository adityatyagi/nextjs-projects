import { notFound } from "next/navigation";
import React from "react";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import Form from "../../Form";
type Props = {
  params: {
    id: string;
  };
};

const EditForm = async ({ params }: Props) => {
  const { id } = params;
  if (!id) {
    return notFound();
  }

  // if the user is not logged in, return
  const session = await auth();
  const userId = session?.user.id;

  // get the form details from db
  const formDetailsFromDB = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(id)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });
  console.log("🚀 ~ EditForm ~ fromDetailsFromDB:", formDetailsFromDB);

  if (userId !== formDetailsFromDB?.userId) {
    return <div>You are not authorized to edit this form.</div>;
  }

  if (!formDetailsFromDB) {
    return <h1>Form Not Found</h1>;
  }
  return (
    <div>
      <Form form={formDetailsFromDB} />
    </div>
  );
};

export default EditForm;

"use server";

import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
import { auth } from "@/auth";
import { InferSelectModel } from "drizzle-orm";

type Question = InferSelectModel<typeof dbQuestions> & {
  fieldOptions: InferSelectModel<typeof fieldOptions>[];
};

// save the form to DB
export async function saveForm(data: {
  name: string;
  description: string;
  questions: Question[];
}) {
  const { name, description, questions } = data;

  // get userId
  const session = await auth();
  const userId = session?.user.id;

  // create new form and add it to the db
  const newForm = await db
    .insert(forms)
    .values({
      name,
      description,
      userId,
    })
    .returning({
      insertedId: forms.id,
    });

  const responseFormId = newForm[0].insertedId;

  // adding new questions
  const newQuestions = questions.map((question: Question) => {
    return {
      text: question.text,
      fieldType: question.fieldType,
      fieldOptions: question.fieldOptions,
      formId: responseFormId,
    };
  });

  //   // bulk update
  await db.transaction(async (tx) => {
    for (let questionItem of newQuestions) {
      const [{ questionId }] = await tx
        .insert(dbQuestions)
        .values({
          text: questionItem.text,
          fieldType: questionItem.fieldType,
          formId: responseFormId,
        })
        .returning({ questionId: dbQuestions.id });

      // if the questions has fieldOptions
      if (questionItem.fieldOptions && questionItem.fieldOptions.length > 0) {
        await tx.insert(fieldOptions).values(
          questionItem.fieldOptions.map((fieldOption) => {
            return {
              text: fieldOption.text,
              value: fieldOption.value,
              questionId: questionId,
            };
          })
        );
      }
    }
  });

  return responseFormId;
}

"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveForm } from "./mutateForm";

export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  // schema to validate the incoming input
  const schema = z.object({
    description: z.string().min(1),
  });

  // "safe" parsing (doesn't throw error if validation fails)
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.log(parse.error);
    return {
      message: "Failed to parse data",
    };
  }

  // check if we have missed setting the OPEN_API_KEY
  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "No OPENAI_API_KEY found",
    };
  }

  // we need the response in a particular format
  const promptExplanation =
    "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";

  // if the parsing of the data is succesfull
  const data = parse.data;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${data.description}. ${promptExplanation}`,
          },
        ],
      }),
    });

    const json = await response.json();
    const responseObj = JSON.parse(json.choices[0].message.content);

    // save the response from OPENAI to DB
    const dbFormId = await saveForm({
      name: responseObj.name,
      description: responseObj.description,
      questions: responseObj.questions,
    });

    // revalidating the path on success to purge the server-side cache
    revalidatePath("/");
    return {
      message: "success",
      data: { formId: dbFormId },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to send request and create form",
    };
  }
}

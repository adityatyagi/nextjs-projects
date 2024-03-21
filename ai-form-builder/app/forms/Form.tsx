"use client";
import React from "react";
import {
  FormSelectModel,
  FieldOptionsSelectModel,
  QuestionsSelectModel,
} from "@/types/form";
import {
  Form as FormComponent,
  FormField as ShadCDNFormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IForm extends FormSelectModel {
  questions: Array<
    QuestionsSelectModel & {
      fieldOptions: Array<FieldOptionsSelectModel>;
    }
  >;
}

type Props = {
  form: IForm;
};

const Form = (props: Props) => {
  const form = useForm();
  const handleSubmit = (data: any) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold text-lg">{props.form.name}</h1>
        <h2 className="text-base">{props.form.description}</h2>
      </div>
      <FormComponent {...form}>
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-3xl items-center"
        >
          {/* map every fieldType with that kind of form */}
          {props.form.questions.map(
            (questionItem: QuestionsSelectModel, index: number) => {
              return (
                <ShadCDNFormField
                  control={form.control}
                  name={`questions_${questionItem.id}`}
                  key={`${questionItem.text}_${index}`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="mb-3 text-base">
                          {index + 1}. {questionItem.text}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              );
            }
          )}
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </form>
      </FormComponent>
    </div>
  );
};

export default Form;

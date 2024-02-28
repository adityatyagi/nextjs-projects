"use client";
import {
  Button,
  Callout,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoMdAlert } from "react-icons/io";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/schemas";

// generating interface from a schema
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage/ErrorMessage.component";
import Spinner from "@/app/components/Spinner/Spinner.component";
type IssueForm = z.infer<typeof createIssueSchema>;

// form shape
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // create new issue
  async function createNewIssue(data: IssueForm) {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occured");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl ">
      {/* If we have an error, show the callout */}
      {error && (
        <Callout.Root variant="soft" className="mb-5">
          <Callout.Icon>
            <IoMdAlert />
          </Callout.Icon>
          <Callout.Text>The error</Callout.Text>
        </Callout.Root>
      )}

      {/* New issue form */}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => createNewIssue(data))}
      >
        <Heading>Add New Issue</Heading>
        {/* Title */}
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} className="p-5">
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssue;

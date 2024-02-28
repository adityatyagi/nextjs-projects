"use client";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
// form shape
interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  async function createNewIssue(data: IssueForm) {
    try {
      const response = await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => createNewIssue(data))}
    >
      <Heading>Add New Issue</Heading>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssue;

"use client";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Heading>Add New Issue</Heading>
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      {/* <TextArea placeholder="Description" /> */}
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;

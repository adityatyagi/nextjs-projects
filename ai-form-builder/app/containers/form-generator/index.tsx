"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { generateForm } from "@/actions/generateForm";
import { useFormState, useFormStatus } from "react-dom";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

type Props = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating" : "Submit"}
    </Button>
  );
}

// inital state of the form
const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

const FormGenerator = (props: Props) => {
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (state.message === "success") {
      // if the form is successfully generated, close the modal
      setOpen(false);
    }
  }, [state.message]);

  // opens the dialog
  function onFormCreate() {
    if (session.status === "authenticated") {
      setOpen(true);
    } else {
      signIn();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={onFormCreate}>Create Form</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your form is about, who is it for and what information you would like to collect?"
            />
          </div>
          <SubmitButton />
        </form>
        <DialogFooter>
          <Button variant="link">Create Manually</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;

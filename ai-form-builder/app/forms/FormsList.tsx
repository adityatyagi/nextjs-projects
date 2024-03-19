import React from "react";
import { forms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Form = InferSelectModel<typeof forms>;
type Props = {
  forms: Form[];
};
const FormsList = ({ forms }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 m-5 p-5">
      {forms.map((form: Form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle>{form.name}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link className="w-full" href={`/forms/edit/${form.id}`}>
              <Button className="w-full">View</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FormsList;

import Header from "@/components/ui/header";
import FormGenerator from "./containers/form-generator";
import { db } from "@/db";
import { forms } from "@/db/schema";
import FormsList from "./forms/FormsList";

export default async function Home() {
  const forms = await db.query.forms.findMany();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormGenerator />
        <FormsList forms={forms} />
      </main>
    </>
  );
}

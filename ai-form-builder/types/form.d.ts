// types for the forms, questions and fieldOptions derived from schema
import { forms, questions, fieldOptions } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type FormSelectModel = InferSelectModel<typeof forms>;
export type QuestionsSelectModel = InferSelectModel<typeof questions>;
export type FieldOptionsSelectModel = InferSelectModel<typeof fieldOptions>;

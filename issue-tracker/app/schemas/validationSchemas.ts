import { z } from 'zod';

// schema for the request. validate the incoming request against this schema before hitting the API
export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required")
});

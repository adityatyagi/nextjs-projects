import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import Prisma from "@/prisma/client";

// schema for the request. validate the incoming request against this schema before hitting the API
const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required")
})

export async function POST(request: NextRequest){
    const body = await request.json();
    
    // validate the body of the request before hitting the database
    const validation = createIssueSchema.safeParse(body);

    // if the request body is not valid
    if(!validation.success){
        return NextResponse.json(validation.error.format(), {
            status: 400 // 400 = bad request i.e. the client sent invalid data
        })
    }

    const newIssue = await Prisma?.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    // status 201: a new object is created
    return NextResponse.json(newIssue, {
        status: 201
    });




}
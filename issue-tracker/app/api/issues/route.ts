import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/schemas";

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
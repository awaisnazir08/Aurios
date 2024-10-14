import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req: Request) {
    try 
    {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400});
        }

        const input = {
            prompt: prompt,
            duration: 1,
            frames_per_second: 24
        };
        
        const response = await replicate.run("zsxkib/pyramid-flow:8e221e66498a52bb3a928a4b49d85379c99ca60fec41511265deec35d547c1fb", { input });
        console.log(response)

        return NextResponse.json(response);
    } 
    catch (error) 
    {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
    try 
    {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400});
        }

        if (!amount) {
            return new NextResponse("Amount of images to generate are required", {status: 400});
        }

        if (!resolution) {
            return new NextResponse("Image resolution is required", {status: 400});
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired!", {status: 403});
        }

        const response = await openai.images.generate({
            n: parseInt(amount, 10),
            prompt: prompt,
            size: resolution
        });
        // console.log(response);

        await increaseApiLimit();

        return new NextResponse(JSON.stringify(response.data))
    } 
    catch (error) 
    {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}
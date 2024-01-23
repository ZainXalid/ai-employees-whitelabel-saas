import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

import { checkSubscription } from "@/lib/subscription";
import { getSession } from "@/lib/auth";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(
    req: Request
) {
    try {

        // const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        // if(!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const session = await getSession();

        if(!session)
        {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        // if(!configuration.apiKey) {
        //     return new NextResponse("OpenAI API Key not configured", { status: 500 });
        // }

        if(!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }


        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages
        });

        //TODO: Modify this increase Api limit function to be dynamic in reducing tokens

        if(!isPro)
        {
            await increaseApiLimit('tokens');
        }

        return NextResponse.json(response.choices[0].message);



    } catch (error) {
        console.log("[CONVERSATION ERROR]", error);
        return new NextResponse("Internal error", { status: 500});
    }

}
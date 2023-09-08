import { NextResponse } from "next/server";

type ResponseData = {
    title: string,
    message: string,
    selectedFile: File | null;
  }

export async function POST(req: Request) {
    try {
        const { title, message, selectedFile } = await req.json();
        const data = { title: title, message: message, selectedFile: selectedFile}

        console.log(data);

        return NextResponse.json({ message: "Success", data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
}
import UrlShortenerService from "@/services/UrlShortenerServices";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {originalUrl} = await req.json();
    const shortnerService = new UrlShortenerService();
    const shortUrl = await shortnerService.shortenUrl(originalUrl);
    return NextResponse.json({shortUrl});
}


export async function GET(){
    const shortnerService = new UrlShortenerService();
    const response = await shortnerService.getAllUrls();
    return NextResponse.json(response);
}
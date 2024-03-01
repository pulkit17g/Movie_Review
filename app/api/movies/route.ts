import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try{
        await connectToDb();
        const movies = await prisma.movie.findMany();
        return NextResponse.json({movies},{status:200});
    } catch(error:any){
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }finally{
        await prisma.$disconnect();
    }
};

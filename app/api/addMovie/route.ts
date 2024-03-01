import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try{
        const {releaseDate,averageRating,name} = await req.json();
        if(!releaseDate){
            return NextResponse.json({error:"Invalid Data!"},{status:422})
        }
        await connectToDb();
        const movies = await prisma.movie.create({data:{name,releaseDate,averageRating}});
        return NextResponse.json({movies},{status:201});
    } catch(error:any){
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }finally{
        await prisma.$disconnect();
    }
};

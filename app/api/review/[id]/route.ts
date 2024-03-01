import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";


export const GET = async (req: Request, {params}:{params:{id:string}}) => {
    try {
      console.log(params.id)
      await connectToDb();
      const reviews = await prisma.review.findMany({
        where: {
         movieId:params.id
        }
      });
      return NextResponse.json({ reviews }, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
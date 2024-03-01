import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";


export const GET = async (req: Request, {params}:{params:{id:string}}) => {
    try {
      console.log(params.id)
      await connectToDb();
      const movie = await prisma.movie.findFirst({
        where: {
         id:params.id
        }
      });
      return NextResponse.json({ movie }, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
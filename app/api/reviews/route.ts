import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDb();
    const reviews = await prisma.review.findMany();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


export const POST = async (req: Request) => {
    try {
      const { reviewComments, movieId, rating,reviewerName} = await req.json();
      if (!reviewComments && !movieId && !rating) {
        return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
      }
      await connectToDb();
      const movie = await prisma.movie.findFirst({ where: { id: movieId } });
      if (!movie) {
        return NextResponse.json({ message: "Invalid Movie" }, { status: 401 }); 
      }
      const newReview = await prisma.review.create({ data: { reviewComments, movieId, rating, reviewerName} });
      return NextResponse.json({ message: "Review created successfully", newReview }, { status: 201 }); 
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
      await prisma.$disconnect(); 
    }
  };


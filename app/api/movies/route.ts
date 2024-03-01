import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        await connectToDb();
        const movies = await prisma.movie.findMany();
        
        const moviesWithAvgRating = await Promise.all(movies.map(async (movie) => {
            const reviews = await prisma.review.findMany({
                where: {
                    movieId: movie.id
                }
            });
            const totalRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0); 
            const averageRating = totalRating / reviews.length;
            return { ...movie, averageRating };
        }));

        return NextResponse.json({ movies: moviesWithAvgRating }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

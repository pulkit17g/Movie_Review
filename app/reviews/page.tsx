"use client"
import React, { useEffect, useState } from 'react';
import PrimaryContainer from '../containers/primaryContainer';
import { useSearchParams } from 'next/navigation';

interface Movie {
  name: string;
  id: string;
  releaseDate: string;
  averageRating: string;
}

interface Review {
  reviewerName: string;
  reviewComments: string;
  releaseDate: string;
  rating: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie | undefined>(); 
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review/${id}`);
        const data = await response.json();
        if (data.reviews) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();
        if (data.movie) {
          setMovie(data.movie);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchReviews();
    fetchMovies();
  }, [id]); 

  return (
    <PrimaryContainer>
      <div className='w-full h-full'>
        <div className='w-full flex justify-between items-center pb-5'>
          <div className='font-semibold text-[#293845] text-2xl'>{movie?.name}</div>
          <div className='text-2xl text-[#6558F5]'>{movie?.averageRating}/10</div>
        </div>
        <div className='w-full flex flex-col gap-4'>
          {reviews.map((review, i) => (
            <div className='w-full flex justify-between px-3 py-5 border items-center' key={i}>
              <div className='flex flex-col justify-between gap-5'>
                <div>{review?.reviewComments}</div>
                <div className='italic'>By {review?.reviewerName}</div>
              </div>
              <div className='text-[#6558F5]'>{review?.rating}/10</div>
            </div>
          ))}
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Reviews;

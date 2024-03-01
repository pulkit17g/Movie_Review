"use client"
import React, { useEffect, useState } from 'react'
import PrimaryContainer from '../containers/primaryContainer'
import { useSearchParams } from 'next/navigation'

const Reviews = () => {
  const [reviews,setReviews] = useState([])
  const searchParams = useSearchParams()
  const [movie,setMovie] = useState()
 
  const id = searchParams.get('id')
  console.log(id)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await  fetch(`/api/review/${id}`);
        const data = await response.json();
        if (data.reviews) {
          console.log(data);
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchReviews();
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();
        if (data.movie) {
          console.log(data);
          setMovie(data.movie);
        }
        console.log(movie)
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    
    <>
    <PrimaryContainer>
        <div className='w-full h-full'>
          <div className='w-full flex justify-between items-center pb-5'>
          <div className='font-semibold text-[#293845] text-2xl'>{movie?.name}</div>
          <div className='text-2xl text-[#6558F5]'>{movie?.averageRating}/10</div>
          </div>
            
            <div className='w-full flex flex-col gap-4'>
            {reviews.map((review,i)=>{
              return(
                <div className='w-full flex justify-between px-3 py-5 border items-center' key={i}>
                  <div className='flex flex-col justify-between gap-5'>
                    <div>{review?.reviewComments}</div>
                    <div className='italic'>By {review?.reviewerName}</div>
                  </div>
                  <div className='text-[#6558F5]'>{review?.rating}/10</div>
                </div>
              )
            })}
            </div>
            
        </div>
    </PrimaryContainer>
    </>
  )
}

export default Reviews
"use client"
import React, { useEffect, useState } from 'react'
import PrimaryContainer from '../../containers/primaryContainer'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
 
    const id = searchParams.get('id')
    console.log(id)
  
  const [reviews,setReviews] = useState([])
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${id}`);
        const data = await response.json();
        if (data.reviews) {
          console.log(data);
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
  
    if (id) fetchReviews(); // Only call fetchReviews if id is not undefined
  }, [id]);

  return (
    
    <>
    <PrimaryContainer>
        <div className='w-full h-full'>
            <div className='font-semibold text-[#293845] pb-5'>Welcome</div>
            <div className='w-full flex flex-col gap-4'>
            {reviews.map((review,i)=>{
              return(
                <div className='w-full flex justify-between p-3 border items-center' key={i}>
                  <div className='flex flex-col justify-between text-xs gap-5'>
                    <div>{review.reviewComments}</div>
                    <div>{review.reviewerName}</div>
                  </div>
                  <div>{review.rating}</div>
                </div>
              )
            })}
            </div>
            
        </div>
    </PrimaryContainer>
    </>
  )
}

export default Page
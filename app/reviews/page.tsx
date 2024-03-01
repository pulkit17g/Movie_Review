import React from 'react'
import PrimaryContainer from '../containers/primaryContainer'

const Reviews = () => {
  interface MockData  {
    name: string,
    rating: string,
    comment: string,
    reviewerName: string,
  }
  const mockData:MockData = {
    name: "Star Wars",
    rating: "9",
    comment: "Amazing Movie",
    reviewerName:"Pulkit",
  }
  const arr= [1,1,1]
  return (
    
    <>
    <PrimaryContainer>
        <div className='w-full h-full'>
            <div className='font-semibold text-[#293845] pb-5'>{mockData.name}</div>
            <div className='w-full flex flex-col gap-4'>
            {arr.map((_,i)=>{
              return(
                <div className='w-full flex justify-between p-3 border items-center' key={i}>
                  <div className='flex flex-col justify-between text-xs gap-5'>
                    <div>{mockData.comment}</div>
                    <div>{mockData.reviewerName}</div>
                  </div>
                  <div>{mockData.rating}</div>
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
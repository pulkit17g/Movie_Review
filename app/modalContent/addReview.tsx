import React, { useState } from 'react';

const AddReview = (props) => {
    // State hooks for form inputs
    const [reviewComments, setReviewComments] = useState('');
    const [movieId, setMovieId] = useState('');
    const [rating, setRating] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    console.log(props.movies)
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Data to be sent in the request
        const reviewData = { reviewComments, movieId, rating, reviewerName };

        try {
            const response = await fetch('/api/reviews', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }


            const result = await response.json();
            console.log('Review created successfully:', result);

        } catch (error) {
            console.error('Failed to create review:', error);
    
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <div className="text-lg">Add a new review</div>
            <select value={movieId} onChange={(e) => setMovieId(e.target.value)} className="w-full border border-gray-400 pl-2 py-1">
                <option value="">Select Movie</option>
                {props.movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.name}</option>
                ))}
            </select>
            <input type="text" placeholder="Reviewer Name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="w-full border border-gray-400 pl-2 py-1"/>
            <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border border-gray-400 pl-2 py-1"/>
            <textarea placeholder="Review Comments" value={reviewComments} onChange={(e) => setReviewComments(e.target.value)} className="w-full border border-gray-400 pl-2 pb-8 pt-1"/>
            <div className="w-full flex justify-end">
                <button type="submit" className="p-2 border-none bg-[#6558F5] text-white text-center rounded-md">Create Review</button>
            </div>
        </form>
    );
};

export default AddReview;

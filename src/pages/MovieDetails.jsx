import { Marquee } from '@/components/marquee';
import Modal from '@/components/Modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Calendar, Play, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, Toaster } from 'sonner';

const MovieDetails = () => {
    const params = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [review, setReview] = useState('');

    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie/${params.id}`,{
                headers:{
                    'Authorization':`Bearer ${userData.token.access}`
                  }
            });
            setDetail(response.data.movie);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch movie details.');
            setIsLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!review) {
            toast('Please enter a review.');
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/add/review/`, {
                user_id: userData.user.id,
                movie_id: detail.id,
                review: review,
            },{
                headers:{
                    'Authorization':`Bearer ${userData.token.access}`
                  }
            });
            console.log('response', response);
            if (response.status === 201) {
                toast('Review submitted successfully!');
                fetchMovie();
            }
            setAuthModal(false);
        } catch (err) {
            console.error('Failed to submit review:', err);
        }
    }


    useEffect(() => {

        if (!userData) {
            setAuthModal(true);
        }
    }, [userData]);




    useEffect(() => {
    fetchMovie();
    }, []);

    const originalLink = detail?.movie_link;
    const previewLink = originalLink?.replace(/\/view.*$/, '/preview');

    if(!userData){
        return(
            <>
            <div className='h-screen w-full flex flex-col items-center text-white justify-center relative top-0'>
                <div className='flex flex-col items-center justify-center absolute top-40'>

                <img src='/assets/401.png' className='w-48 sm:w-52' alt="Loading..." />
                <h1 className='text-xl text-wrap'>Log in to peek behind the curtain</h1>
                <Button className={'bg-red-500 text-white mt-2'} onClick={() => navigate('/auth')}>Go to Login</Button>
                </div>

            </div>
            </>
        )
    }

    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center relative'>
                <img src='/assets/loader2.gif' className='w-48 sm:w-52' alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-screen w-full flex items-center justify-center text-white'>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-start bg-black px-5 lg:px-20 pb-20'>
            <div className={`relative w-full h-[09i35rem]`}>
                {isPlaying ? (
                    <iframe 
                        src={previewLink} 
                        allowFullScreen
                        allow='autoplay'
                        className='w-full h-full rounded-lg shadow-lg' 
                        title="Movie Preview"
                    ></iframe>
                ) : (
                    <div className={`flex items-center justify-center w-full h-full bg-[url(https://res.cloudinary.com/dwh3ee46e/image/upload/v1743015824/${detail?.banner_poster}.jpg)] rounded-lg shadow-lg`}>
                        <img src={`https://res.cloudinary.com/dwh3ee46e/image/upload/v1743015824/${detail?.banner_poster}.jpg`} className='w-full object-top object-cover h-full max-h-[30rem]' alt={detail?.title} />
                        <div className='absolute bg-gradient-to-t from-black/90 to-black/20 w-full h-full transform text-center'>
                            <div className='absolute bottom-3 flex flex-col gap-2 items-center justify-center w-full'>
                                <h1 className='text-white font-semibold text-3xl'>{detail?.title}</h1>
                                <p className='text-gray-300'>{detail?.description}</p>
                                <Button 
                                    onClick={() => setIsPlaying(true)} 
                                    className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'
                                >
                                    <Play />
                                    Play Now
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row w-full mt-5 mb-20">
                <div className='w-full sm:w-5/6 flex gap-2 flex-col'>
                    <div className="bg-gray-900 p-5 rounded-lg">
                        <h2 className="text-white text-lg pb-3">Description</h2>
                        <p className="text-gray-300 text-sm">{detail?.description}</p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg">
                        <div className='flex items-center justify-between'>
                        <h2 className="text-white text-xl font-semibold">Reviews</h2>
                        <Button 
                            
                            className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition' onClick={()=>setAuthModal(true)}><Plus/> Add Review</Button>

                        </div>
                        <div className="space-y-4 mt-2 flex gap-2 flex-wrap">
                        {/* <Marquee reverse pauseOnHover className="[--duration:20s]"> */}
                        {detail?.reviews?.length > 0 && detail.reviews.map((review, index) => (
                                <div key={index} className="bg-gray-900 px-3 py-2 rounded-lg border w-fit h-fit border-gray-700">
                                    <h3 className="text-white font-semibold">{review.user}</h3>
                                    <p className="text-gray-300">{review.review}</p>
                                </div>
                            )) }
       
                            {/* </Marquee> */}

                            {detail?.reviews?.length == 0 &&(
                                <h1 className='text-white'>No Reviews Yet</h1>
                            )}
                            
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/6 flex flex-col justify-between bg-gray-900 p-5 rounded-lg sm:ml-5">
                    <p className="text-gray-300"><span className='flex gap-2'><Calendar /> Released Year</span>{detail?.release}</p>
                    <p className="text-gray-300 mt-2"><span>Genres</span><br />
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {detail?.genres?.map((gen, index) => (
                                <Badge key={index} variant="outline">{gen}</Badge>
                            ))}
                        </div>
                    </p>
                    <p className="text-gray-300 mt-2"><strong>Director</strong><br /> {detail?.director}</p>
                </div>

                <Modal
                    title={'Add Review'}
                    content={
                        <form onSubmit={handleReviewSubmit} className='flex flex-col items-center gap-2 justify-center'>
                            <textarea onChange={(e)=>setReview(e.target.value)} className='w-full h-32 bg-gray-900 text-white p-2 rounded-lg' placeholder='Write your review here...'></textarea>
                            <Button type={'submit'} className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'>Submit</Button>
                        </form>
                    }
                    open={authModal}
                    isOpen={setAuthModal}
                />
            </div>
            <Toaster position='bottom-right'/>
        </div>
    );
};

export default MovieDetails;

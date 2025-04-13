import Modal from '@/components/Modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchMoviesByID } from '@/features/movie/movieSlice';
import { Calendar, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const MovieDetails = () => {
    const params = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [authModal, setAuthModal]=useState(false)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, data: detail , hasFetched, error} = useSelector((state) => state.movies);

    useEffect(() => {
        if (Array.isArray(detail)) {
            dispatch(fetchMoviesByID(params.id));
        }
        if (!userData) {
            setAuthModal(true);
        }
    }, [dispatch, params, detail, userData, navigate, hasFetched]);

    const originalLink = detail?.movie_link;
    const previewLink = originalLink?.replace(/\/view.*$/, '/preview');
    // console.log(isLoading, detail);
    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center relative'>
                <img src='/assets/loader2.gif' className='w-48 sm:w-52' alt="Loading..." />
            </div>
        );
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-start bg-black px-5 pb-20'>
            <div className={`relative w-full h-[35rem]`}>
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
                        <img src={`https://res.cloudinary.com/dwh3ee46e/image/upload/v1743015824/${detail?.banner_poster}.jpg`} className='w-full object-top object-cover h-full' alt={detail?.title} />
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
            <div className="flex w-full mt-5 mb-20">
                <div className='w-5/6 flex gap-2 flex-col'>
                    <div className="bg-gray-900 p-5 rounded-lg">
                        <h2 className="text-white text-lg pb-3">Description</h2>
                        <p className="text-gray-300 text-sm">{detail?.description}</p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg">
                        <h2 className="text-white text-xl font-semibold">Reviews</h2>
                        <div className="space-y-4 mt-2">
                            {detail?.reviews?.length > 0 ? detail.reviews.map((review, index) => (
                                <div key={index} className="bg-gray-900 p-3 rounded-lg">
                                    <h3 className="text-white font-semibold">{review.reviewer}</h3>
                                    <p className="text-gray-300">{review.comment}</p>
                                </div>
                            )) : (
                                <h1 className='text-white'>No Reviews Yet</h1>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/6 flex flex-col justify-between bg-gray-900 p-5 rounded-lg ml-5">
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
                title={'Warning'}
                content={
                <div className='flex flex-col items-center gap-2 justify-center'>
                <h1>Please Login to view</h1>
                <div>

                    <Button className={'bg-red-500 text-white'}>Login</Button>
                </div>

                </div>
                }
                open={authModal}
                isOpen={setAuthModal}
                onClose={()=>{
                    navigate('/auth')
                }}
                
                
                />
            </div>
        </div>
    );
};

export default MovieDetails;
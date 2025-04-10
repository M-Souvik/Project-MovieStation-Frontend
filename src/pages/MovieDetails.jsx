import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const MovieDetails = () => {
    const params = useParams();
    const [detail, setDetail] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    const fetchMovieDetail = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie/${params.id}`);
            setDetail(response.data.movie);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovieDetail();
    }, []);

    const originalLink = detail?.movie_link;
    const previewLink = originalLink?.replace(/\/view.*$/, '/preview');

    return (
        <div className='h-screen w-full flex flex-col items-center justify-start bg-black px-5'>
            <div className={`relative w-full h-[35rem] `}>
                {isPlaying ? (
                    <iframe 
                        src={previewLink} 
                        // allowFullScreen 
                        allowFullScreen
                        allow='autoplay'
                        
                        className='w-full h-full rounded-lg shadow-lg' 
                        title="Movie Preview"
                    ></iframe>
                ) : (
                    <>
                    <div className={`flex items-center justify-center w-full h-full bg-[url(https://res.cloudinary.com/dwh3ee46e/image/upload/v1743015824/${detail?.banner_poster}.jpg)] rounded-lg shadow-lg`}>
                        <img src={`https://res.cloudinary.com/dwh3ee46e/image/upload/v1743015824/${detail?.banner_poster}.jpg` } className='w-full object-top object-cover h-full'/>
                <div className='absolute bg-gradient-to-t from-black/90 to-black/20 w-full h-full transform text-center'>
                <div className='absolute bottom-3 flex flex-col gap-2 items-center justify-center w-full'>

                    <h1 className='text-white font-semibold text-3xl'>{detail?.title}</h1>
                    <p className='text-gray-300'>{detail?.description}</p>
                        <Button 
                            onClick={() => setIsPlaying(true)} 
                            className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'
                        >
                            <Play/>
                            Play Now
                        </Button>
                </div>
                </div>
                    </div>
                    </>
                    
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
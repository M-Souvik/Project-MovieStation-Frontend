import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoviesCard from '@/components/MoviesCard';

const GenresPage = () => {
    const params = useParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const genre = params.genre ? [params.genre] : []; // Pass genre as an array

    // console.log(params);
    
    const fetchMoviesByGenre = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recommend/genres`, { genres: genre });
            setMovies(response.data.movies);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        // if (genre.length > 0) {
            fetchMoviesByGenre();
        // }
    }, []);

    if (isLoading) {
        return <div className='h-screen w-full flex items-center justify-center relative'>
        <img src='/assets/loader2.gif' className='w-48  sm:w-52 relative -top-20'/>
      </div>
    }

    if (error) {
        return <div className='h-screen w-full flex items-center justify-center'><p className='text-red-500'>Error: {error}</p></div>;
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-start bg-black px-5 pb-20'>
            <h1 className='text-white text-3xl mb-5'>Movies in {genre.join(', ')}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {movies && movies.map((movie) => (
                    <MoviesCard genre={movie} key={movie.movie_id}/>
                ))}
            </div>
        </div>
    );
};

export default GenresPage;

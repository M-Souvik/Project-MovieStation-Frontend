import Modal from '@/components/Modal'
import MoviesCard from '@/components/MoviesCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { genresChoices } from '@/data/getData'
import { fetchMovies, fetchMoviesByGenres, fetchMoviesBySearch } from '@/features/movie/movieSlice'
import { Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const SearchMovies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]); // Changed to an array for multiple selections
    const dispatch = useDispatch();
    const state = useSelector((state) => state.movies);
    const navigate = useNavigate();
    console.log('state', state);

    const handleSearch = (e) => {
        navigate(`?searchQuery=${searchQuery}`);
        if (searchQuery) {
            dispatch(fetchMoviesBySearch(searchQuery));
        }
    }

    const handleApplyFilters = () => {
        if (selectedGenreIds.length > 0) {
            // Logic to apply the selected genre filters
            console.log("Selected Genre IDs:", selectedGenreIds);
            dispatch(fetchMoviesByGenres(selectedGenreIds))
            // You can dispatch an action or perform any other logic here
        }
        setOpen(false); // Close the modal after applying filters
    }

    const toggleGenreSelection = (genreId) => {
        setSelectedGenreIds((prev) => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    useEffect(() => {
        dispatch(fetchMovies())

    }, [dispatch])

    return (
        <div className='min-h-screen px-10'>
            <div className='flex gap-2'>
                <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className={'dark:border-gray-400 max-w-[60%] dark:text-white dark:placeholder:text-gray-500'} 
                    placeholder="Search For movies...."
                />
                <Button onClick={handleSearch} className={'bg-red-800 text-white'}>
                    <Search />Search
                </Button>
                <Button size={'icon'} onClick={() => { setOpen(true) }} className={'bg-gray-800 rounded-full text-white'}>
                    <Filter />
                </Button>
                <Modal open={open} isOpen={setOpen} 
                    title={'Filters'}
                    content={
                        <>
                            <Card className={'border-1 flex flex-col gap-2.5 border-gray-700 px-2 py-3'}>
                                <CardTitle className={'font-normal px-3 pb-0'}>Genres</CardTitle>
                                <CardContent className={'flex px-2 py-0 gap-2 flex-wrap'}>
                                    {genresChoices.map((genre) => (
                                        <div key={genre.id} onClick={() => toggleGenreSelection(genre.id)} className={`flex items-center w-fit p-2 rounded-full border ${selectedGenreIds.includes(genre.id)&&'bg-white text-black'}`}>
                                            <label htmlFor={`genre-${genre.id}`} className="">{genre.name}</label>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Button onClick={handleApplyFilters} className={'bg-red-500 text-white mt-2'}>
                                Apply
                            </Button>
                        </>
                    }
                />
            </div>

            <div className='grid grid-cols-5 gap-5 pt-10'>
                {!state.isLoading && state.data && state.data.map((movie) => {
                    return (
                        <MoviesCard key={movie.movie_id} genre={movie} />
                    )
                })}

                {state.isLoading && (
                    <>
                        <h1 className='text-white'>Loading...</h1>
                    </>
                )}

            </div>
        </div>
    )
}

export default SearchMovies